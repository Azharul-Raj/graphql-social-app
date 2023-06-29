import { ContextType } from "types";

export const Query={
    posts:async(_:any,__:any,{prisma}:ContextType)=>{
       const posts= await prisma.post.findMany();
       return posts;
    }
}