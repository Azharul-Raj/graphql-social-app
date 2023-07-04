import { ContextType } from "types";

interface ParentType{
    userId:number;
}

export const Profile={
    user:({userId}:ParentType,_:any,{prisma}:ContextType)=>{
        return prisma.user.findUnique({where:{id:Number(userId)}})
    },
    posts:({userId}:ParentType,_:any,{prisma}:ContextType)=>{
        return prisma.post.findMany({where:{authorId:Number(userId)}})
    },
}