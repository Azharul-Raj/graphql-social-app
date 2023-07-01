import validator from "validator";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { ContextType, UserPayloadType,  UserProps} from "types";

export const userMutations={
    // SIGNUP MUTATION
    singUp:async(_:any,{name,email,password,bio}:UserProps,{prisma}:ContextType):Promise<UserPayloadType> =>{
        const isValidEmail=validator.isEmail(email);
        // const isValidPassword=validator.isStrongPassword(password,{minLength:5});
        const isValidPassword=validator.isLength(password,{min:5});
        if(!isValidEmail){
            return {
                userErrors:[
                 {
                     message:"Please provide a valid email."
                 }
                ],
                token:null
             }
        }
        //
        if(!isValidPassword){
            return {
                userErrors:[
                 {
                     message:"Password length must be at least 5 character."
                 }
                ],
                token:null
             }
        }
        //
        if(!name || !bio){
            return {
                userErrors:[
                 {
                     message:"Name and bio can't be empty."
                 }
                ],
                token:null
             }
        }
        const hashedPassword=bcrypt.hashSync(password,10)
        console.log(hashedPassword )
        const user=await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        })
        const token=Jwt.sign({userId:user.id,email},process.env.SECRET,{expiresIn:"1h"})
        // PROFILE CREATING PART
        await prisma.profile.create({
            data:{
                bio,
                userId:user.id
            }
        })
            return {
                userErrors:[{message:""}],
                token
             }
        },
    //LOGIN MUTATION
    singIn:async(_:any,{email,password}:UserProps,{prisma, headerInfo}:ContextType):Promise<UserPayloadType> =>{
        console.log(headerInfo)
        const user=await prisma.user.findUnique({where:{email}});
        if(!user){
            return{
                userErrors:[{message:"No Account found with this credential. Please provide right credential to login."}],
                token:null
            }
        }
        const isValidPassword=bcrypt.compareSync(password,user.password);
        if(!isValidPassword){
            return{
                userErrors:[{message:"Email or password is invalid."}],
                token:null
            }
        }
        const token=Jwt.sign({userId:user.id},process.env.SECRET,{expiresIn:"1d"})
        return{
            userErrors:[],
            token,
            message:"SignIn successful."
        }
    }
    }
    