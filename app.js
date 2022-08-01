/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
PORT = 8679;

// Database
var db = require('./database/db-connector');

// Handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs.engine({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public')); // this is needed to allow for the form to use the ccs style sheet

/*
    ROUTES
*/
app.get('/', function (req, res) {
    res.render('index')
});

app.get('/genres', function (req, res) {
    let query1 = ("SELECT Genres.genreID FROM Genres;");

    db.pool.query(query1, function (error, rows, fields) {
        res.render('genres', { data: rows });
    })
});

app.get('/artists', function (req, res) {
    let query1 = ("SELECT * from Artists;");

    db.pool.query(query1, function (error, rows, fields) {
        res.render('artists', { data: rows });
    })
})

app.get('/playlists', function (req, res) {
    let query1 = ("SELECT Playlists.playlistID, Playlists.numberOfStreams, Playlists.name, Playlists.description, Songs.title, Songs.songID FROM Playlists INNER JOIN Playlists_Songs on Playlists_Songs.playlistID = Playlists.playlistID INNER JOIN Songs on Playlists_Songs.songID = Songs.songID;");

    db.pool.query(query1, function (error, rows, fields) {
        res.render('playlists', { data: rows });
    })
});

app.get('/songs', function (req, res) {
    let query1 = ("SELECT Songs.songID, Songs.title, Songs.duration, Songs.numberOfStreams, Albums.title as album, Artists.name as artist, Genres.genreID as genre FROM Songs Inner Join Albums ON Albums.albumID = Songs.albumID INNER JOIN Artists ON Artists.artistID = Songs.artistID INNER JOIN Genres ON Genres.genreID = Songs.genreID ORDER BY Songs.songID;")
    let query2 = "SELECT * FROM Albums;"
    let query3 = "SELECT * FROM Artists;"
    let query4 = "SELECT * FROM Genres"

    db.pool.query(query1, function (error, rows, fields) {
        let songs = rows;
        db.pool.query(query2, (error, rows, fields) => {
            let albums = rows;
            db.pool.query(query3, (error, rows, fields) => {
                let artists = rows;
                db.pool.query(query4, (error, rows, fields) => {
                    let genres = rows;
                    return res.render('songs', { data: songs, albums: albums, genres: genres, artists: artists });
                })
            })

        })
    })
});

app.get('/customers', function (req, res) {
    let query1 = ("SELECT Customers.customerID, Customers.username, Customers.password, Customers.email, IFNULL(Customers.isPremium, 0) AS 'isPremium' FROM Customers;");

    db.pool.query(query1, function (error, rows, fields) {
        res.render('customers', { data: rows });
    })
});

app.get('/albums', function (req, res) {
    let query1 = ("SELECT Albums.albumID, Albums.title, Albums.description, Artists.name AS artist FROM Albums Inner JOIN Artists ON Albums.artistID = Artists.artistID;");
    let query2 = "SELECT * FROM Artists;"

    db.pool.query(query1, function (error, rows, fields) {
        let albums = rows;
        db.pool.query(query2, (error, rows, fields) => {
            return res.render('albums', { data: albums, artists: rows });
        })
    })
})




/* 
    POST ROUTES
*/
app.post('/add-genre-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Genres (genreID) VALUES ('${data['input-genreID']}' );`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there is an error
        if (error) {

            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically repopulates the table with our SELECT * FROM Genres and presents it to the screen.
        else {
            res.redirect('/genres');
        }
    })
})

app.post('/add-artist-form', function (req, res) {

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Artists (name, bio) VALUES ('${data['input-artist-name']}', '${data['input-artist-bio']}');`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there is an error
        if (error) {

            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route (/artists), which automatically repopulates the table with out SELECT * FROM Artists and presents it to the screen.
        else {
            res.redirect('/artists');
        }
    })
})

app.post('/add-song-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture  NULL values
    let genre = String(data['input-genre']);

    // Create the query and run it on the database
    query1 = `INSERT INTO Songs (title, duration, albumID, artistID, genreID) VALUES ('${data['input-title']}', ${data['input-duration']}, ${data['input-album']}, ${data['input-artist']}, '${genre}');`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Genres and
        // presents it on the screen
        else {
            res.redirect('/songs');
        }
    })
})

app.post('/add-customer-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    // Create the query and run it on the database
    let query1 = `INSERT INTO Customers (username, password, email, isPremium) VALUES ('${data.username}', '${data.password}', '${data.email}', ${data.isPremium})`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-album-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Albums (title, description, artistID) VALUES ('${data['input-album-title']}', '${data['input-album-description']}', '${data['input-album-artist']}');`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route (/albums), which automatically runs the SELECT * FROM Albums and presents it on the screen.
        else {
            res.redirect('/albums');
        }
    })
})





/*
DELETE ROUTES
*/
app.delete('/delete-song-ajax/', function (req, res, next) {
    console.log('test')
    let data = req.body;
    let songID = parseInt(data.songID);
    let deleteBsg_Cert_People = `DELETE FROM Songs WHERE songID = ?`;
    console.log('test')
    // Run the 1st query
    db.pool.query(deleteBsg_Cert_People, [songID], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.redirect('/');
        }
    })
});

app.delete('/delete-song-from-playlist-ajax/', function (req, res, next) {
    let data = req.body;
    let playlistID = parseInt(data.playlistID);
    let songID = parseInt(data.songID);
    let deletePlaylists_Songs = `DELETE FROM Playlists_Songs WHERE playlistID = ? AND songID = ?`;

    // Run the 1st query
    db.pool.query(deletePlaylists_Songs, [playlistID, songID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }

    })
});

/*
PUT ROUTES
*/
app.put('/put-person-ajax', function (req, res, next) {
    let data = req.body;
    console.log(data)

    let customerID = parseInt(data.cutomerID)
    console.log(customerID)
    let isPremium = parseInt(data.isPremium)

    let queryUpdateWorld = `UPDATE Customers
    SET username = ?, password = ?, email = ?, isPremium = ?
    WHERE customerID = ?;`;
    let selectWorld = `SELECT * FROM Customers WHERE customerID = ?`

    // Run the 1st query
    db.pool.query(queryUpdateWorld, [data.username, data.password, data.email, isPremium, customerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectWorld, [customerID], function (error, rows, fields) {
                console.log(rows)
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


/*
    LISTENER
*/
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
