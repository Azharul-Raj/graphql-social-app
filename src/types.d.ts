import { PrismaClient, Prisma, Post } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime";

export interface ContextType {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation,
    DefaultArgs
  >;
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

export interface UserPayloadType {
  userErrors: {
    message: string;
  }[];
  token: string | null;
  message?:string
  success?:boolean
}

/**
 * NORMAL TYPES THAT ARE NOT EXPORTED
 */
