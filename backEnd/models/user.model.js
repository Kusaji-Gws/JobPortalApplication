import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","recuiter"],
        required:true
    },
    profile:{
        bio:{
            type:String,
        },
        skills:[{type:String}],
        resume:{type:String},//urrl to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,
            ref:"Company"},
        profilePhoto:{
            type:String,
            default:""
        }

    }
},{timestamps:true});
export const User=mongoose.model("User",userSchema);