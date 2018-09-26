var awsIot = require('aws-iot-device-sdk');

var thingShadows = awsIot.thingShadow({
	keyPath:"397e72249c-private.pem.key",
	certPath:"397e72249c-certificate.pem.key",
	caPath:"AmazonRootCA1.pem",
	clientId:"first",
	host:"a2zzcbsmssfhbu.iot.ap-south-1.amazonaws.com"
});

let status;

thingShadows.on('connect', function() {

  console.log('connected');

  thingShadows.register("first",{},function(){console.log("registered");});
  let value = {"state":{"desired":{"value":"output"}}};
  status = thingShadows.update("first", value);
  if(value === null){console.log("update not done");}

});

thingShadows.on('status',function(thingName, stat, clientToken, stateObject){
  console.log("received"+stat+"on"+ JSON.stringify(stateObject));

});



//thingShadows.unregister("first");
