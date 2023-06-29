import { ApolloServer } from "apollo-server";
import { PrismaClient,Prisma } from "@prisma/client";


import typeDefs from './schema/typeDefs';
import resolvers from "./resolvers";


const prisma=new PrismaClient()

const server=new ApolloServer(
    {
        typeDefs,
        resolvers,
        context:{prisma}
    })

server.listen().then(({url})=>{
    console.log(`Server is up and running at ${url}`)
})