/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
PORT = 9424;

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
app.get('/', function(req, res)
    {
        res.render('index')
    });

// // songs route
// app.get('/songs', function(req, res)
//     {
//         let query1 = ("SELECT Songs.songID, Songs.title, Songs.duration, Songs.numberOfStreams, Albums.title as album, Artists.name as artist, Genres.genreID as genre FROM Songs Inner Join Albums ON Albums.albumID = Songs.albumID INNER JOIN Artists ON Artists.artistID = Songs.artistID INNER JOIN Genres ON Genres.genreID = Songs.genreID;")
//         db.pool.query(query1, function(error, rows, fields){
//             res.render('songs', {data: rows});
//         })
//     });

app.get('/songs', function(req, res)
    {
        // Declare Query 1
        let query1 = ("SELECT Songs.songID, Songs.title, Songs.duration, Songs.numberOfStreams, Albums.title as album, Artists.name as artist, Genres.genreID as genre FROM Songs Inner Join Albums ON Albums.albumID = Songs.albumID INNER JOIN Artists ON Artists.artistID = Songs.artistID INNER JOIN Genres ON Genres.genreID = Songs.genreID;")
        
        let query2 = "SELECT * FROM Albums;"
    
        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){
            
            // Save the people
            let songs = rows;
            // Run the second query
            db.pool.query(query2, (error, rows, fields) => {
                
                // Save the albums
                let albums = rows;
                console.log(albums)
                return res.render('songs', {data: songs, albums: albums});
            })
        })
    });

/* 
    POST ROUTES
*/
app.post('/add-song-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let homeworld = parseInt(data['input-homeworld']);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }

    let age = parseInt(data['input-age']);
    if (isNaN(age))
    {
        age = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data['input-fname']}', '${data['input-lname']}', ${homeworld}, ${age})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
