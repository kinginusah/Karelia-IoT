// Gateway module gateway.js subscribing events from various
// MQTT channels and making actions accordingly

const url = 'tls:f0ae3f10c7934f22af58baf1325a7a00.s2.eu.hivemq.cloud:8883'
const username = 'IoT-GUEST'
const password = 'Gj@ci85TjdJvzMZ'
const clientid = 'gateway-controller-INU'
const topic = '/karelia/wartsila/026a/status/'
const room026ALightsTopic = '/karelia/wartsila/026a/lights/'

const mqtt = require('mqtt')

const options = {
    clientId: clientid,
    username: username,
    password: password,
    clean: true
}

var client = mqtt.connect( url, options )

client.on( 'connect', function () {
    console.log("Subscribing topic " + topic )
    client.subscribe(topic)
    console.log('done.')
})

client.on( 'message', function ( topic, message ) {
    console.log("Received a message from topic " + topic )
    const frame = message.toString()
    var obj = JSON.parse( frame )
    console.log( "Temperature: " + obj.temperature )
    console.log( "Illumination: " + obj.illumination )
    console.log( "Occupied: " + obj.occupied )
    console.log( "Humidity: " + obj.humidity )
    if ( obj.occupied && obj.illumination < 50){
        const frame = JSON.stringify({"value" : true}) //lights on
        client.publish(room026ALightsTopic, frame)
        console.log("Lights switched on. ")
    }
})

client.on('error', (err) => {
    console.log("Error + " + JSON.stringify(err))
    process.exit(1)
})