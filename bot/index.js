const express = require('express')
const app = express()
const axios = require('axios')

app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode']
    const challenge = req.query['hub.challenge']
    const verify_token = req.query['hub.verify_token']

    if (mode && process.env.VERIFY_TOKEN === verify_token) {
        res.status(200).send(challenge)
    }else{
        res.sendStatus(403)
    }
})

app.post('/webhook', (req, res) => {
    const message = req.body['entry'][0]['messages'][0]
    if(message.type === 'text') {
        if(message.text.lower() === 'hello') {
            sendText(message.from, 'hi')
        }else{
            sendText(message.from, 'I don\'t understand')
        }

    }

})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT)
})

async function sendText(to,body){
    await axios({
        url: `https://graph.facebook.com/v22.0/${process.env.ID}/messages`,
        method: 'post',
        headers: {
            'Authorization':`Bearer ${process.env.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data:JSON.stringify({
            messaging_product:'whatsapp',
            to,
            type:'text',
            text:{
                body
            }
        })
    })
}