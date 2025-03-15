const axios = require('axios')

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

async function sendTemplate(to,template){
    await axios({
        
    })
}