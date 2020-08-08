const router=require('express').Router()
const request=require('request')
const USER=require('../models/user.models')


router.post('/addresponse',async(req,res)=>{
    console.log('HELLO WORLD')
    const {paymentHandleToken,amount,merchantRefNum,description}=req.body
    let result;
    console.log(paymentHandleToken,amount,merchantRefNum,description);

    const options={
        url:'https://api.test.paysafe.com/paymenthub/v1/payments',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
            'Simulator':'EXTERNAL'
        },
        body:{
            'paymentHandleToken':paymentHandleToken,
            'description':description,
            'merchantRefNum':merchantRefNum,
            'amount':amount,
            'currencyCode':'USD',
        }
    }

    request.post(options,(err,res,body)=>{
        if(err){
            result='INCOMPLETED'
        }
        else{
            result=body;
        }
    })

    res.send(result)
})



router.post('/getCustomerId',async(req,res)=>{
    const email=req.body.email

    USER.findOne({email:email})
    .then((result)=>res.send(result))
    .catch((err)=>res.send(err))

})


router.post('/savecustomerdetails',async(req,res)=>{
    const email=req.body.email
    const customerId=req.body.customerId

    const newuser=new USER({
        email:email,
        customerId:customerId
    })

    newuser.save()
    .then((result)=>res.send(result))
    .catch((err)=>res.send(err))

})


module.exports=router;