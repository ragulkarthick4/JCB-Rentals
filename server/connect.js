const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://ragul:ragulk@cluster0.honxiwa.mongodb.net/users?retryWrites=true&w=majority")
.then(()=>{
    console.log("Db connected successfully")
})
.catch((e)=>{
    console.log("Db connection failed")
    console.log(e.message)
})