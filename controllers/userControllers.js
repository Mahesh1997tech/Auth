import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res, next) => {
    try{
    let { username, email, password, confirmPassword } = req.body;
        //verify user is in db already
        let existingUser=await User.findOne({email})
        if(existingUser){
           throw new Error("User already exists,Please Login")
        }
        //creating a new user
        let newUser = await User.create({
            username,
            email,
            password,
            confirmPassword
        })
        //generate token
        let token=await generateToken(newUser._id);

        // let newUser=new User({
        //     username,
        //     email,
        //     password,
        //     confirmPassword
        // })
        // await newUser.save()
        //sending response
        res.status(201).json({newUser,token});
    }catch(err){
        next(err)
    }
}

export const login = async (req, res, next) => {
    let {  email, password} = req.body;
    try{
        //verify user is in db already
        let existingUser=await User.findOne({email})
        if(!existingUser){
            throw new Error("User doesnt exist,Please Register")
        }
        // verify password
        let result=await existingUser.verifyPassword(password,existingUser.password)
        if(!result){
            throw new Error("Password is not correct")
        }
        
        //sending response
        res.status(201).json({existingUser,token});
    }catch(err){
        next(err)
    }
}