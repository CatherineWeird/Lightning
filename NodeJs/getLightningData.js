 var http = require('http');
 var fs = require('fs');

exports.getLightning = function(callback){

	//The location of the lightning data
	var options = {
		host: 'wwlln.net',
		path: '/new/map/data/current.json'
	};


	http.request(options, function(response){
		var str = '';

		response.on('data', function(chunk){
		str += chunk;
		
	    });


	response.on('end', function(){
		

		fs.writeFile('data/current.json', str, function(err){

			    if(err){
			    	return console.log(err);
			    }
			    //console.log(str);
			    console.log('data saved');
			    callback(err,str);

			    


		    });
		
        });
	
    }).end();

    console.log('Goodbye');
    


}


