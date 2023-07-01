import { ApolloServer } from "apollo-server";
import Jwt from 'jsonwebtoken'
import { PrismaClient,Prisma } from "@prisma/client";


import typeDefs from './schema/typeDefs';
import resolvers from "./resolvers";
import getUserByToken from '../libs/getUserFromToken'
import { ContextType } from "types";

// const getUserByToken=(token:string)=>{
//     try {
//      return Jwt.verify(token,process.env.SECRET) as {userId:string}
//     } catch (error) {
//      return null
//     }
//  }

const prisma=new PrismaClient()

const server=new ApolloServer(
    {
        typeDefs,
        resolvers,
        context:async({req}):Promise<ContextType> =>{
            const authorization=getUserByToken(req.headers.authorization);
            return {
                prisma,
                headerInfo:authorization
            }
        }
    })

server.listen().then(({url})=>{
    console.log(`Server is up and running at ${url}`)
})