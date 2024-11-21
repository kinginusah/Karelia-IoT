// axios for http communication

const axios = require('axios')

const token = 'Bearer NGMyMWVmNDItMTMyMC00ZWQ1LThjZDgtYTEyY2NiMTg0YjRlYzIxNDI4OTgtYzdj_P0A1_e6de59f2-68ae-475c-8547-5f2af1b6159b'

const roomsUrl = 'https://webexapis.com/v1/rooms'
const messagesUrl = 'https://webexapis.com/v1/messages'
const myRoomTitle = 'Karelia API Programming'

let config = {
    headers:{
        'Authorization': token
    }
}

const postMessage = async(message) => {
    try {
        let rooms = await axios(roomsUrl, config)
        let ourroom = rooms.data.items.filter(items => items.title = myRoomTitle)
        let roomId = ourroom[0].id 
       
        message.roomId = roomId
        let result = await axios.post( messagesUrl, message, config)
        //console.log ("Room id: " + roomId)
        console.log ("Result: " + JSON.stringify(result.data))
        //console.log ("Result: " + result.data)

        //TODO: to be continued
    } catch (err) {
        console.log(err)
    }
}

let testMessage = {
    "text": "This is coming from a script."
}

postMessage(testMessage)