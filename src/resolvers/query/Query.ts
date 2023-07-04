import { ContextType,PostQueryPayload, UserDetails } from "types";


export const Query={
    posts:async(_:any,__:any,{prisma}:ContextType)=>{
       const posts= await prisma.post.findMany();
       return posts;
    },
    profile:async(_:any,{userId}:{userId:string},{prisma}:ContextType)=>{
        const profile=await prisma.profile.findUnique({where:{userId:Number(userId)}});
        return profile;
    },
    // post of current user
    postsOfUser:async(_:any,__:any,{prisma,headerInfo}:ContextType):Promise<PostQueryPayload> =>{
        if(!headerInfo){
            return{
                userErrors:[{message:"Invalid credentials."}],
                posts:null
            }
        }
        //
        const posts= await prisma.post.findMany({where:{
            authorId:Number(headerInfo.userId)
        }});
        return {
            userErrors:[],
            posts
        }
     }
}