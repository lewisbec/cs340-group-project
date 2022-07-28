/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
PORT = 9022;

// Database
var db = require('./database/db-connector');

// Handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs.engine({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

/*
    ROUTES
*/
app.get('/', function (req, res) {
    res.render('index')
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

/* 
    POST ROUTES
*/
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
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/songs');
        }
    })
})


/*
    LISTENER
*/
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
