import { PrismaClient, Prisma, Post, Profile } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime";

export interface ContextType {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation,
    DefaultArgs
  >;
  headerInfo:{
    userId:string;
  }
}

export interface PostProps {
  data: {
    title: string;
    content: string;
  };
}

export interface UserProps {
  name: string;
  email: string;
  bio:string;
  password: string;
}
// post payload type

export interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | null;
  message?:string
  success?:boolean
}
//post query payload

interface PostQueryPayload extends Omit<PostPayloadType,"post">{
  posts:Post[]    
}

export interface UserPayloadType {
  userErrors: {
    message: string;
  }[];
  token: string | null;
  message?:string
  success?:boolean
}

export type headerInfo={
  userId:string;
  email:string;
}

//
export interface UserDetails{
  id:string;
name:string
email:string
posts:Post[]
profile?:Profile
}
/**
 * NORMAL TYPES THAT ARE NOT EXPORTED
 */
