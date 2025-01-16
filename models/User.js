import {Schema,model} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        minLength:[4,"Please enter characters above 4"]
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // confirmPassword:{
    //     type:String,
    //     required:true
    // }
    confirmPassword:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                    return this.password===value;
            },
            message:"Password and Confirm Password do not match"
        }
    }
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,10);
    this.confirmPassword=undefined;
    next()
})

//methods can be used on instance
userSchema.methods.verifyPassword=async function(pwd,pwdDb){
        return await bcrypt.compare(pwd,pwdDb)
}

export default model("User",userSchema);