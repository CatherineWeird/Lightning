var ws2812x = require('rpi-ws281x-native');
var fs = require('fs');


var NUM_LEDS = 64;


var pixelData = new Uint32Array(NUM_LEDS);

var brightness = 128;


var LED_strip;

var LED_data = {};

ws2812x.init(NUM_LEDS);
ws2812x.reset();


// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws2812x.reset();
  process.nextTick(function () { process.exit(0); });
});


function processData(callback){
	console.log('Process Data');

	fs.readFile('data/current.json',  function(err, myJson) {

	if (err){
		console.log('ERROR');
		//console.log(err);
	};
    var parsedData = JSON.parse(myJson);
        console.log('parsedData ');
	    //console.log(parsedData);
    
        //Sets which of the 4 Neopixel strips the lightning strike will be sent to.
		for(var i = 0; i < Object.keys(parsedData).length; i++){

			var objId = Object.getOwnPropertyNames(parsedData)[i];
			

			         if (parsedData[objId].long > 0 && parsedData[objId].lat > 0){
		           
		           LED_strip = 0;
		           
		           
		         }
		         else if (parsedData[objId].long < 0 && parsedData[objId].lat > 0){
		           
		           LED_strip = 1;
		           
		         }
		         else if (parsedData[objId].long < 0 && parsedData[objId].lat < 0){
		           
		           LED_strip = 2;
		           
		         }
		         else if (parsedData[objId].long > 0 && parsedData[objId].lat < 0){
		           
		           LED_strip = 3;
		           
		         }

		         //Calculate distance from the Equator and Greenwhich meridian intersection
		         distance =  Math.sqrt((parsedData[objId].long* parsedData[objId].long) +(parsedData[objId].lat * parsedData[objId].lat));
		         
		         //Map the distance value to represent a individual LED on the selected strip.
		         //distance = Math.floor(distance.map(0,125.86,0,63));

		         //console.log('LED_strip = '+LED_strip);

		         LED_data[i]= ({LED_strip,distance});
		         //console.log(LED_data[i]);

		}
		
		callback(err,LED_data);
	

	});

}



function runLEDs(){
	


	processData( function(err,data){
		console.log('doing processData');
		

		if (err){
				console.log(err);
			}
		else {

			//console.log(Object.keys(data).length);
			//console.log(data);
			ws2812x.init(NUM_LEDS);
			//pixelData[pixel] = rgb2Int(0,0,255);
			
            //ws2812x.render(pixelData);
            
            
         for (var l in data){
				console.log(l, data[l].distance);
				
				
				for (var i = 0; i <= NUM_LEDS ; i++){
					
				    var pixel = (data[l].distance);
				    pixel = Math.floor(pixel.map(0,125.86,0,63));
				    console.log('pixel = ' + pixel);
				    
					
					if (i === pixel ){
						

				        
				        pixelData[i] = rgb2Int(0,0,255);
				        
				        
						
						
					}
					
					else {
						
						pixelData[i] = rgb2Int(0,0,0);
						
						
						
					}
					
					
					
					
				}
				

				//var pixel = (data[l].LED_strip * 64) + distance;
				
				
				
				ws2812x.render(pixelData);
				




			}


			

		}


	});
	

}




//This must be the 1st function called to initialise the LED Strips
exports.initLEDs = function(NUM_LEDs){

	ws2812x.init(NUM_LEDs);
	pixelData = new Uint32Array(NUM_LEDS);

}

//brightness default is 128
exports.setBrightness = function(value){

	ws2812x.setBrightness(brightness);
}


exports.blinkLED = function(LEDid,LEDColour){


	ws2812x.render(pixelData)

	ws2812x.reset();

}



exports.LEDsOff = function(callback){

	console.log('LEDs off ');
	ws2812x.reset();


}

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function rgb2Int(r, g, b) {
	
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

function doinit(){
	
	ws2812x.init(NUM_LEDS);
	ws2812x.setBrightness(brightness);
	
	ws2812x.reset();
	
	
	runLEDs();
	
}

doinit();
console.log('done an init of LEDs');



