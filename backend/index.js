const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")

const app = express();

app.use(cors())

app.use(express.json())


mongoose.connect("mongodb+srv://barath:12345@cluster0.wxmsk.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function(){
    console.log("Connected ")
}).catch(function(){
    console.log("Failed")
})





const passkey = mongoose.model("passkey",{},"bulkMail")











 app.post("/sendemail",function(req,res){


    var  msg = req.body.msg
    var email = req.body.email
    
 
     
     
     
    passkey.find().then(function(data){
    
         
        
        const transporter = nodemailer.createTransport({
            service:"gmail",
           
           auth: {
             user: data[0].toJSON().email,
             pass: data[0].toJSON().pass,
           },
         });
         
         new Promise (async function(resolve,reject){
            try{
                for(var i=0;i<email.length;i++){
                    await transporter.sendMail(
                        {
                            from:"bbarath601@gmail.com",
                            to:email[i],
                            subject:"A message from my first MERN app ",
                            text:msg
                    
                    
                        },
                           )
                             console.log("email send to"+"" + email[i])    
                }
                         resolve("success")
            
              }
               catch{
                reject("failure")
            
               }
        
          }).then(function(){
            res.send(true)
        
          }).catch(function(){
            res.send(false)
        
          })
    
    
    
    
    
    
    }).catch(function(error){
        console.log(error)

    })
   
 })

 app.listen("5000",function(){
    console.log("sever started.....")
})