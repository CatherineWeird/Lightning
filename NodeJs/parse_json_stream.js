var Combo = require("stream-json/Combo");
var combo = new Combo({packKeys: true, packStrings: true, packNumbers: true});

var fs = require("fs");

var currentChunk;

var lat;
var long;
var unixTime;


exports.parseJson = function(callback){
	
	var result = [];
	
	console.log('Parse JSON data');


	function LightningStrike(unixTime,lat,long){
		
		this.unixTime = unixTime;
		this.lat = lat;
		this.long = long;
		
	}






	//var pipeline = fs.createReadStream("data/current.json").pipe(parser).pipe(streamer).pipe(packer);
	var pipeline = fs.createReadStream("data/current.json").pipe(combo);
	
    pipeline.on("error",function(Error){
		
		console.log(Error);
		
	});
	
	


	pipeline.on("data", function(chunk){




		 if(chunk.name === 'keyValue'){

	    	if(chunk.value === 'unixTime'){

	    		
	    		currentChunk = 'unixTime';

	    		
	    	}

	    }


	    if(chunk.name === 'numberValue'){
	    	if (currentChunk === 'unixTime'){
	    		//console.log('unixTime = '+ chunk.value);
	    		currentChunk = false;

	    		unixTime = chunk.value;
	    	}
	    }


	    if(chunk.name === 'keyValue'){

	    	if(chunk.value === 'lat'){

	    		currentChunk = 'lat';

	    		
	    	}

	    }


	    if(chunk.name === 'numberValue'){
	    	if (currentChunk === 'lat'){
	    		//console.log('lat = '+ chunk.value);
	    		currentChunk = false;

	    		lat = chunk.value;
	    	}
	    }



	    if(chunk.name === 'keyValue'){

	    	if(chunk.value === 'long'){

	    		currentChunk = 'long';

	    		
	    	}



	    }


	    if(chunk.name === 'numberValue'){
	    	if (currentChunk === 'long'){
	    		//console.log('long = '+ chunk.value);
	    		currentChunk === false;

	    		long = chunk.value;

	    		result.push(new LightningStrike(unixTime,lat,long));
	    		

	    	}
	    }


	});
	
	pipeline.on("end", function(){
		
		console.log("end event called");
		pipeline.unpipe(combo);
	
		
	});
	
		pipeline.on("finish", function(){
		
		console.log("finished parsing");
		
		
		
		
		
		
		
		callback(result);
		
	});
	
	
	
	
	
	
	

	



}



