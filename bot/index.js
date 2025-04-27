const express = require('express')
const app = express()
const { sendText,sendTemplate, sendPaymentLink } = require('./utils/responses')

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

app.post('/webhook', async(req, res) => {
    const message = req.body['entry'][0]['messages'][0]
    if(message.type === 'text') {
        if(message.text.lower() !== 'restart') {
            await sendTemplate(message.from, 'restart')
        }else{
            await sendTemplate(message.from, 'init')
        }

    }
    else if(message.type === 'interactive'){
        if(message.interactive.type === 'list_reply'){
            await sendTemplate(message.from,`${message.interactive.list_reply.title}`)
        }

    }
    else if(message.type === 'order'){
        amount = 0;
        for(i of message.order.product_items){
            amount += i.product_retail_price;
        }
        await sendPaymentLink(message.from, createOrder(amount, message.from, message.order.product_items))
    }

})

app.post('/manage',(req,res)=>{
    
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT)
})