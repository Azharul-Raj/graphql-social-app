import { ContextType } from "types";

interface ParentType{
    authorId:number;
}
export const Post={
    user:({authorId}:ParentType,_:any,{prisma}:ContextType)=>{
        return prisma.user.findUnique({where:{id:authorId}})
    }
}