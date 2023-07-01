import { ContextType, PostPayloadType, PostQueryPayload, UserDetails } from "types";


export const Query={
    posts:async(_:any,__:any,{prisma}:ContextType)=>{
       const posts= await prisma.post.findMany();
       return posts;
    },
    // post of current user
    postsOfUser:async(_:any,__:any,{prisma,headerInfo}:ContextType):Promise<PostQueryPayload> =>{
        console.log(headerInfo)
        if(!headerInfo){
            return{
                userErrors:[{message:"Invalid credentials."}],
                posts:null
            }
        }
        console.log('under neth')
        const posts= await prisma.post.findMany({where:{
            authorId:Number(headerInfo.userId)
        }});
        return {
            userErrors:[],
            posts
        }
     }
}