///////////////////////////////////////////
//                                       //
//    PROJECT NAME: NSRG                 //
//    WRITTEN BY: CONNOR EDWARDS         //
//    DESCRIPTION: SIMPLE NODEJS APP     //
//                 USED TO CONTROL GPIO  //
//                 ON THE RASPBERRY PI   //
//                                       //
///////////////////////////////////////////

// Requiring Dependencies
var io = require('socket.io').listen(8080).sockets;
var GPIO = require('onoff').Gpio;

var led = new GPIO(14, 'out');

// Variables
var led_state = 0;

led.writeSync(1);

// Listening for a new connection
io.on('connect', function(socket) {	
	// Alerting the users
	console.log(res("nu"));
	
	// Listening for control request
	socket.on('control', function(res) {
		// Checking response
		switch (res.stat) {
			
			case "turn_on":
				led.writeSync(1);
				console.log("Turn on Light");
				break;
			
			case "turn_off":
				led.writeSync(0);
				console.log("Turn off Light");
				break;
			
		}
		
	});
	
	// Listening for disconnect
	socket.on('disconnect', function() {
		// Alerting the console
		led.writeSync(0);
		console.log(res("ul"));
	});
	
});

// Function for generating the response
function res (stat) {
	
	// Variables for potential response
	var user_left = "A user has left.";
	var user_new = "A new user has connected.";
	
	// Returning the response
	switch (stat) {
		case "ul":
			return user_left;
			break;
		case "nu":
			return user_new;
			break;
	}
	
}
