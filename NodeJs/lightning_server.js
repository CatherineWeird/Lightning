var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');

var lightning = require('./getData.js');

app.set('port', process.env.PORT  || 3000);


//home page of the site
app.get('/', function(req,res){

    res.type('text/plain');
    res.send('This is the main page');


});


app.get('/lightningdata', function(req,res){
	res.setHeader("Content-Type", "text/plain");
	
	lightning.getLightning(handleLightning);

    function handleLightning(error, data, next){
    	
    	if (error) console.error('Download error', error)
    		else console.log('Download finished', 'data');
    	    res.type('text/plain');
    	    res.status(200);
    	    res.send('This is the lightning data'+data);

    }

    console.log('this is the data');

 });


//custom 404 page
app.use(function(req,res){

    res.type('text/plain');
    res.status(404);
    res.send('404 - not found');
});

//custom 500 page
app.use(function(err,req,res,next){
    
    res.type('text/plain');
    res.status(500);
    res.send('500 - server error');

});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:'+ app.get('port')+ '; press CTRL - C to terminate' );
    

});




