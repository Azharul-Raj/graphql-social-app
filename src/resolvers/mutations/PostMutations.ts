import { ContextType, PostProps, PostPayloadType } from "types";


interface UpdatePostProps extends PostProps{
    postId:string;
}

export const postMutation={
    // CREATE POST MUTATION
    createPostMutation:async(_:any,{data}:PostProps,{prisma,headerInfo}:ContextType):Promise<PostPayloadType> =>{
        console.log(headerInfo)
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
                authorId:Number(headerInfo.userId)
            }
        })
            return{
                userErrors:[],
                post
            }        
    },
    //UPDATE POST MUTATION
    updatePostMutation:async(_:any,{postId,data}:UpdatePostProps,{prisma}:ContextType):Promise<PostPayloadType> =>{
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
    //DELETE POST MUTATION
    deletePostMutation:async(_:any,{postId}:{postId:string},{prisma}:ContextType):Promise<PostPayloadType> =>{
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
}