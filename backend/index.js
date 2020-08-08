const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const bodyParser=require('body-parser')
const cors=require('cors')

app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>console.log('DATABASE CONNECTION SUCCESFULLY ESTABLISHED'))
.catch((err)=>console.log(err))

const port=process.env.PORT || 8080

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))


const paymentRoute=require('./routes/payment')


app.use('/payment',paymentRoute);


app.listen(port,()=>{console.log('SERVER IS RUNNIG')})