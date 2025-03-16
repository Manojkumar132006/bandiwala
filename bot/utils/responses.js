const axios = require('axios')
const {createOrder} = require('./payments')
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
        url: `https://graph.facebook.com/v22.0/${process.env.ID}/messages`,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to,
            type: 'template',
            template: {
                name: template,
                language: {
                    code: 'en'
                }
            }
        })
    })
}

async function sendList(to, sections) {
    await axios({
        url: `https://graph.facebook.com/v22.0/${process.env.ID}/messages`,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to,
            type: 'interactive',
            interactive: {
                type: 'list',
                header: {
                    type: 'text',
                    text: 'Menu'
                },
                action: {
                    button: 'Continue',
                    sections: sections
                }
            }
        })
    })
}

async function sendPaymentLink(to, paymentLink) {
    await axios({
        url: `https://graph.facebook.com/v22.0/${process.env.ID}/messages`,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to,
            type: 'text',
            text: {
                body: `Here is your payment link: ${paymentLink.short_url}`
            }
        })
    })
}


module.exports = {
    sendText,
    sendTemplate,
    sendList,
    sendPaymentLink
}
