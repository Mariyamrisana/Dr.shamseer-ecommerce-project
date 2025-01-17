const mongoose = require ('mongoose');


const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:[true, 'Name is required']
        },
        lastName:{type:String},
        email:{
            type:String,
            required:[true,'Email is required'],
            unique:true,
            match:[/\S+@\S+\.\S+/, 'please provide a valid email'],
        },
        password:{
            type:String,
            required:[true, 'Password is required']
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:'user'
        },
        createdAt:{
            type:Date,
            default:Date.now
        },
    },
    {
        timestamps:true,
    }
);


module.exports = mongoose,model('User',userSchema)