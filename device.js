var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({	
	keyPath:"/home/pi/deviceSDK/certs/397e72249c-private.pem.key",
	certPath:"/home/pi/deviceSDK/certs/397e72249c-certificate.pem.crt",
	caPath:"/home/pi/deviceSDK/certs/AmazonRootCA1.pem",
	clientId:"first",
	host:"a2zzcbsmssfhbu.iot.ap-south-1.amazonaws.com"
});

device.on('connect', function() {
	console.log('connected');
	device.subscribe('first');
	//device.publish('topic6', JSON.stringify({LED:"ON"}));
});


device.on('message', function(topic, payload) {
    var load=JSON.parse(payload.toString());
	if (topic == 'first' && parseInt(load.answer) >= 40)	{	
	console.log("high");
	}
	else console.log("ok");
 });
  

device.on('error',function(error){
	//+console.log('Error:',error)
});
