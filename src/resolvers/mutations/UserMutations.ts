import validator from "validator";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { ContextType, UserPayloadType,  UserProps} from "types";
import getUserResponseData from '../../../utils/getUserResponseData';

export const userMutations={
    // SIGNUP MUTATION
    singUp:async(_:any,{name,email,password,bio}:UserProps,{prisma}:ContextType):Promise<UserPayloadType> =>{
        const isValidEmail=validator.isEmail(email);
        // const isValidPassword=validator.isStrongPassword(password,{minLength:5});
        const isValidPassword=validator.isLength(password,{min:5});
        if(!isValidEmail){
            return (getUserResponseData("Please provide a valid email.",null))
        }
        //
        if(!isValidPassword){
            return (getUserResponseData("Password length must be at least 5 character.",null))
        }
        //
        if(!name || !bio){
            return (getUserResponseData("Name and bio can't be empty.",null))
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
        const token=Jwt.sign({userId:user.id},process.env.SECRET,{expiresIn:"1h"})
        // PROFILE CREATING PART
        await prisma.profile.create({
            data:{
                bio,
                userId:user.id
            }
        })
            return (getUserResponseData("",token))
        },
    //LOGIN MUTATION
    singIn:async(_:any,{email,password}:UserProps,{prisma}:ContextType):Promise<UserPayloadType> =>{
        const user=await prisma.user.findUnique({where:{email}});
        if(!user){
            return (getUserResponseData("No Account found with this credential. Please provide right credential to login.",null))
        }
        const isValidPassword=bcrypt.compareSync(password,user.password);
        if(!isValidPassword){
            return (getUserResponseData("Email or password is invalid.",null))
        }
        const token=Jwt.sign({userId:user.id},process.env.SECRET,{expiresIn:"1d"})
        return (getUserResponseData("",token,"login successful."))
    }
    }
    