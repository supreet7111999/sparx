const express=require('express');
require('./db/conn');
const UserModel=require("./models/user");
const sendmail=require('./mailer');

const app = express();
const port=process.env.PORT || 3000;
app.use(express.static(__dirname+'/dist/'));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
})

app.use(express.json());

app.get('*',async (req,res)=>{
    res.sendFile(__dirname+"/dist/index.html");
})

app.post('/user_details',async (_,res)=>{
    try{
        const users=await UserModel.find();
        console.log(users);
        res.send({"status":"success","users":users});
    }
    catch(err){
        console.log(err);
        res.send({ "status": "failed", "message": "Unable to Fetch"});
     }
})

app.post('/user',async (req,res)=>{
    try{
        console.log(req);
        let name=req.body.name;
        let email=req.body.email;
        let dob=req.body.dob;
        let phone=req.body.phone;
        if(phone.toString().length!=10){
            console.log("jj");
            res.send({
                'status':'failed',
                'message':'invalid phone'
            });
            return;
        }
        const doc=new UserModel({
            email:email,
            name:name,
            phone:phone,
            dob:dob
        });
        const x=await doc.save();
        console.log(x);
        let txt="Congratulations !!! You form is submitted ";
        sendmail(email,txt);
        res.status(201).send({"status":"success","message":"Registration Success"});
        return;
    }
    catch(err){
        console.log(err);
        res.send({ "status": "failed", "message": "Unable to Submit"});
     }
})

app.listen(port,function(){
    console.log("server is running");
})