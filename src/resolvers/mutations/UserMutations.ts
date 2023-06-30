import { ContextType,  UserProps} from "types";

export const userMutations={
    // SIGNUP MUTATION
    singUp:async(_:any,{name,email,password,bio}:UserProps,{prisma}:ContextType)=>{
            prisma.user.create({
                data:{
                    name,
                    email,
                    password
                }
            })
        },
    }