const Razorpay = require('razorpay')
const rzp = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export function createOrder(amount,customer,items){
    let Order= null
    rzp.paymentLink.create({
        amount: amount,
        currency: 'INR',
        accept_partial: false,
        customer:{
            contact: customer
        },
        notify:{
            sms: true
        },
        notes:{
            description:`${items}`,
            id: customer
        },
        remainder_enable: true,
        callback_url:`${process.env.BASE_URL}/manage`,
        callback_method:'post'
    },(err,order)=>{
        Order =JSON.parse(order);
    })
    return Order
}

export function cancel(paylink){
    rzp.paymentLink.cancel(paylink)
}