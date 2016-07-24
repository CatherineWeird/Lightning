

var Parser = require("stream-json/Parser");
var parser = new Parser();
var Streamer = require("stream-json/Streamer");
var streamer = new Streamer();

var Packer = require("stream-json/Packer");
var packer = new Packer({packKeys: true, packStrings: true, packNumbers: true});

var fs = require("fs");


var result = [];


var currentChunk;

var lat;
var long;
var unixTime;


exports.parseJson = function(callback){





	function LightningStrike(unixTime,lat,long){
		
		this.unixTime = unixTime;
		this.lat = lat;
		this.long = long;
		
	}






	var pipeline = fs.createReadStream("data/current.json").pipe(parser).pipe(streamer).pipe(packer);


	pipeline.on("data", function(chunk){




		 if(chunk.name === 'keyValue'){

	    	if(chunk.value === 'unixTime'){

	    		//unixTime = true;
	    		currentChunk = 'unixTime';

	    		
	    	}

	    }


	    if(chunk.name === 'numberValue'){
	    	if (currentChunk === 'unixTime'){
	    		console.log('unixTime = '+ chunk.value);
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
	    		console.log('lat = '+ chunk.value);
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
	    		console.log('long = '+ chunk.value);
	    		currentChunk === false;

	    		long = chunk.value;
	    		result.push(new LightningStrike(unixTime,lat,long));
	    		console.log(result.length);

	    	}
	    }



	});


}



