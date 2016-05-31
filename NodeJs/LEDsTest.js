var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = 64;  //number of LEDS 

var pixelData = new Uint32Array(NUM_LEDS);

var brightness = 128;

ws281x.init(NUM_LEDS);

ws281x.setBrightness(brightness);

for(var i = 0; i < NUM_LEDS; i++){
	pixelData[i] = color(getRandomInt(0,255), getRandomInt(0,255), getRandomInt(0,255));
}



function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;

}

