const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/test"
const connectToMongo=()=>{
   mongoose.connect(mongoURI).then(()=>{
    console.log("connection succesful")
   })
        
}

module.exports=connectToMongo