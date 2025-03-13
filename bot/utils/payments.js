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
            name: customer.name,
            email: customer.email,
            contact: customer.phone
        },
        notify:{
            sms: true
        },
        notes:{
            description:`${items}`
        },
        remainder_enable: true,
        callback_url:'',
        callback_method:''
    },(err,order)=>{
        Order =JSON.parse(order);
    })
    return Order
}
