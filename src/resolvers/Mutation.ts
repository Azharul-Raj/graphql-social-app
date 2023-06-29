import { ContextType, PostProps, UserProps,PostPayloadType } from "types";





export const Mutation={
    createPost:async(_:any,{title,content}:PostProps,{prisma}:ContextType):Promise<PostPayloadType> =>{
        if(!title || !content){
            return {
               userErrors:[
                {
                    message:"You must provide a title and content to create a post."
                }
               ],
               post:null
            }
        }
       const post=await prisma.post.create({
            data:{
                title,
                content,
                authorId:1
            }
        })
            return{
                userErrors:[],
                post
            }        
    },
    // user creation mutation
    createUser:async(_:any,{name,email,password}:UserProps,{prisma}:ContextType)=>{
        prisma.user.create({
            data:{
                name,
                email,
                password
            }
        })
    }
}