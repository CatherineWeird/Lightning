var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = 64;  //number of LEDS 

var pixelData = new Uint32Array(NUM_LEDS);

var brightness = 128;



function doLEDs(){

	
    console.log("doLEDs");
    

    ws281x.reset();

    for(var i = 0; i < NUM_LEDS; i++){
	    pixelData[i] = (getRandomInt(0,255), getRandomInt(0,255), getRandomInt(0,255));

	    do_init();

   

    }

}


function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;

}

function do_init(callback){

	console.log("do_init");

	ws281x.init(NUM_LEDS);

	do_brightness();


}

function do_brightness(callback){

	console.log("do_brightness");

	ws281x.init(brightness);


}



function do_render(data){

	console.log("do_render");

	ws281x.render(data);

	next();
}



doLEDs();


