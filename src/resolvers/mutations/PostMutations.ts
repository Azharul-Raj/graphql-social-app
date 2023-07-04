import { ContextType, PostProps, PostPayloadType } from "types";
import getResponseData from '../../../utils/getResponseData';


interface UpdatePostProps extends PostProps{
    postId:string;
}

export const postMutation={
    // CREATE POST MUTATION
    createPostMutation:async(_:any,{data}:PostProps,{prisma,headerInfo}:ContextType):Promise<PostPayloadType> =>{
        const {title,content}=data;
        // HEADER CHECKING
        if(!headerInfo){
            return (getResponseData("You are not authenticated to do any mutation.",null));
        }
        //PROVIDED CONTENT CHECK 
        if(!title || !content){
            return (getResponseData("You must provide post title && content",null))
        }
        //CREATE THE POST
        
       const post=await prisma.post.create({
            data:{
                title,
                content,
                authorId:Number(headerInfo.userId)
            }
        })
            return (getResponseData("",post))  
    },
    //UPDATE POST MUTATION
    updatePostMutation:async(_:any,{postId,data}:UpdatePostProps,{prisma,headerInfo}:ContextType):Promise<PostPayloadType> =>{
        // HEADER CHECKING
        if(!headerInfo){
            return (getResponseData("You are not authenticated to do any mutation.",null,null));
        }
        //CHECK IF THE POST BELONGS TO USER.
        const requestedPost=await prisma.post.findUnique({where:{id:Number(postId)}});
        if(Number(headerInfo.userId)!==requestedPost.authorId){
            return (getResponseData("The post you are trying to update is not belongs to you.",null))
        }
        const post=await prisma.post.update({
            where:{
                id:Number(postId)
            },
            data:{
                ...data,
                updatedAt:new Date(),
            }
        })
        return (getResponseData("",post))
    },
    //DELETE POST MUTATION
    deletePostMutation:async(_:any,{postId}:{postId:string},{prisma,headerInfo}:ContextType):Promise<PostPayloadType> =>{
        // HEADER CHECKING
        if(!headerInfo){
            return (getResponseData("You are not authenticated to do any mutation.",null));
        }
        const requestedPost=await prisma.post.findUnique({where:{id:Number(postId)}});
        if(Number(headerInfo.userId)!==requestedPost.authorId){
            return (getResponseData("The post you are trying to delete is not belongs to you.",null))
        }
        const post=await prisma.post.delete({
            where:{
                id:parseInt(postId)
            }
        })
        return (getResponseData(`Post deleted successfully with id ${post.id}`,post))
    },
}