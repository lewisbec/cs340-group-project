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
        // let query1 = "SELECT * FROM Songs;";
        // db.pool.query(query1, function(error, rows, fields){
        //     res.render('index', {data: rows});
        // })
    });

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
