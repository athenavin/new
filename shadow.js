var awsIot = require('aws-iot-device-sdk');

var thingShadows = awsIot.thingShadow({
	keyPath:"/home/pi/deviceSDK/certs/397e72249c-private.pem.key",
	certPath:"/home/pi/deviceSDK/certs/397e72249c-certificate.pem.crt",
	caPath:"/home/pi/deviceSDK/certs/AmazonRootCA1.pem",
	clientId:"first",
	host:"a2zzcbsmssfhbu.iot.ap-south-1.amazonaws.com"
});

let status;

thingShadows.on('connect', function() {

  console.log('connected');

  thingShadows.register("first",{},function(){console.log("registered");
  let value = {"state":{"desired":{"value":"output"}}};
  status = thingShadows.update("first", value);
  if(status === null){console.log("update not done");}

});
});

thingShadows.on('status',function(thingName, stat, clientToken, stateObject){
  console.log("received"+stat+"on"+ JSON.stringify(stateObject));

});

thingShadows.on('delta', function(thingName, stateObject){
	console.log("delta_is:"+JSON.stringify(stateObject));

thingShadows.unregister("first");
});
