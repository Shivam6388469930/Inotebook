const { type } = require('@testing-library/user-event/dist/type')
const  mongoose=require('mongoose')
const { StrictMode } = require('react')
const {Schema}=mongoose
const NotesSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const cer=mongoose.model('notes',NotesSchema)
module.exports=cer