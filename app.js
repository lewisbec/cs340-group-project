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

// songs route
app.get('/songs', function(req, res)
    {
        let query1 = ("SELECT Songs.songID, Songs.title, Songs.duration, Songs.numberOfStreams, Albums.title as album, Artists.name as artist, Genres.genreID as genre FROM Songs Inner Join Albums ON Albums.albumID = Songs.albumID INNER JOIN Artists ON Artists.artistID = Songs.artistID INNER JOIN Genres ON Genres.genreID = Songs.genreID;")
        db.pool.query(query1, function(error, rows, fields){
            console.log(rows)
            res.render('songs', {data: rows});
        })
    });
/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
