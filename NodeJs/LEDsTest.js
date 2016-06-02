var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = 64;  //number of LEDS 

var pixelData = new Uint32Array(NUM_LEDS);

var brightness = 6;


// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

function doLEDs(){
    
    for(var i = 0; i < NUM_LEDS; i++){
		
		var red = getRandomInt(0,255);
		var green = getRandomInt(0,255);
		var blue = getRandomInt(0,255);

	    pixelData[i] = (rgb2Int(red,green,blue));

    }
    ws281x.render(pixelData);
    
    
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;

}


function rgb2Int(r, g, b) {
	
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

function do_init(){

	console.log("do_init");

	ws281x.init(NUM_LEDS);
	ws281x.setBrightness(brightness);
    var i = 0;

		
		setInterval( function(){
			
			doLEDs();
		}, 250);

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


do_init();
