var ws2812x = require('rpi-ws281x-native');
var fs = require('fs');


var NUM_LEDS = 256;


var pixelData = new Uint32Array(NUM_LEDS);

var brightness = 128;


var LED_strip;

var LED_data = [];

ws2812x.init(NUM_LEDS);
ws2812x.reset();


// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws2812x.reset();
  process.nextTick(function () { process.exit(0); });
});


function processData(callback,lightningStrikeData){
	
	
	
	console.log('ProcessData');
	//console.log(lightningStrikeData);
	
	for (lightningStrike of lightningStrikeData){
		

	    
    
        //Sets which of the 4 Neopixel strips the lightning strike will be sent to.
        
        

			

			if (lightningStrike.long > 0 && lightningStrike.lat > 0){
		           
		           LED_strip = 0;
		           
		           
		         }
		         else if (lightningStrike.long < 0 && lightningStrike.lat > 0){
		           
		           LED_strip = 1;
		           
		         }
		         else if (lightningStrike.long < 0 && lightningStrike.lat < 0){
		           
		           LED_strip = 2;
		           
		         }
		         //else if (parsedData[objId].long > 0 && parsedData[objId].lat < 0)
		         else {
		           
		           LED_strip = 3;
		           
		         }

		         //Calculate distance from the Equator and Greenwhich meridian intersection
		         distance =  Math.sqrt((lightningStrike.long* lightningStrike.long) +(lightningStrike.lat * lightningStrike.lat));
		         
		         //Map the distance value to represent a individual LED on the selected strip.
		         distance = Math.floor(distance.map(0,125.86,0,NUM_LEDS - 1));


		         LED_data.push({LED_strip,distance});
		        

		}
		
		callback(LED_data);
	

	

}

exports.runLEDs = function(data){
	
	//console.log(data);
	


	processData( function(data){
		console.log('doing processData');

			ws2812x.init(NUM_LEDS);
			//pixelData[pixel] = rgb2Int(0,0,255);
			
            //ws2812x.render(pixelData);
            
            
         for (var l in data){
				//console.log(l, data[l].distance);
				
				var pixel = (data[l].LED_strip * 64) + data[l].distance
				//console.log('pixel = ' + pixel);
				
				
				for (var i = 0; i <= NUM_LEDS ; i++){
					
				    var pixel = (data[l].distance);
				    pixel = Math.floor(pixel.map(0,125.86,0,63));
				    //
				    
					
					if (i === pixel ){
				
  
				        pixelData[i] = rgb2Int(0,0,255);
					
					}
					
					else {
						
						pixelData[i] = rgb2Int(0,0,0);
						
						
						
					}
					
					
					
					
				}

					
				ws2812x.render(pixelData);
				




			}


	},data);
	

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

exports.initLEDs = function(data){
	
	processData(data);
	
	ws2812x.init(NUM_LEDS);
	ws2812x.setBrightness(brightness);
	
	ws2812x.reset();
	
	
	
	
}





