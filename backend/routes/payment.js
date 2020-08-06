const router=require('express').Router()
const request=require('request')



router.post('/addresponse',async(req,res)=>{
    const {token,amount}=req.body
    let result;

    const options={
        url:`https://api.test.paysafe.com/paymenthub/v1/payments/${token}`,
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Authorization':'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4'
        }
    }
    
    request(options,function(err,response,body){
        result=response
    })
    res.send(result)
})



module.exports=router;