import { ContextType, PostProps, UserProps,PostPayloadType } from "types";


interface UpdatePostProps extends PostProps{
    postId:string;
}


export const Mutation={
    createPost:async(_:any,{data}:PostProps,{prisma}:ContextType):Promise<PostPayloadType> =>{
        const {title,content}=data;
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
    updatePost:async(_:any,{postId,data}:UpdatePostProps,{prisma}:ContextType):Promise<PostPayloadType> =>{
        const isExist=await prisma.post.findUnique({where:{id:Number(postId)}});
        if(!isExist){
            return {
                userErrors:[
                    {
                        message:"The post you are trying to delete is not exist."
                    }
                ],
                post:null
            }
        }
        const post=await prisma.post.update({
            where:{
                id:Number(postId)
            },
            data:data
        })
        return {
            userErrors:[
                {message:""}
            ],
            post
        }
    },
    //delete user mutation
    deletePost:async(_:any,{postId}:{postId:string},{prisma}:ContextType):Promise<PostPayloadType> =>{
        const isExist=await prisma.post.findUnique({where:{id:Number(postId)}});
        if(!isExist){
            return {
                userErrors:[
                    {
                        message:"The post you are trying to delete is not exist."
                    }
                ],
                post:null,
                success:false
            }
        }
        const post=await prisma.post.delete({
            where:{
                id:parseInt(postId)
            }
        })
        return{
            userErrors:[{message:""}],
            post,
            message:"Post deleted successfully.",
            success:true
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
    },
    //update user
   
}