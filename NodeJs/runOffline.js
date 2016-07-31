var lightning = require('./getLightningData.js');
var showLEDs = require('./showLEDs.js');
var parseJson = require('./parse_json_stream.js');

function mainLoop(){
	
	
	
	
	parseJson.parseJson(function(data){
		
		console.log(data);
		showLEDs.runLEDs(data);
		
	});
	


	
}

mainLoop();
