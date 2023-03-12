const mongoose=require("mongoose");
const url="mongodb+srv://root:root@cluster0.tutd8vb.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url).then(()=>{
    console.log("datbase connected");
}).catch((err)=>{
    console.log("error");
})