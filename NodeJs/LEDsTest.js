var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = 64;  //number of LEDS 

var pixelData = new Uint32Array(NUM_LEDS);

var brightness = 128;



function doLEDs(){

	

    ws281x.setBrightness(brightness);

    ws281x.reset();

    for(var i = 0; i < NUM_LEDS; i++){
	    pixelData[i] = (getRandomInt(0,255), getRandomInt(0,255), getRandomInt(0,255));
	    ws281x.render(pixelData);
	    ws281x.init(NUM_LEDS);

    }

}


function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;

}

function do_init(callback){

	ws281x.init(NUM_LEDS);

	callback


}

do_init(doLEDs);


