import { ApolloServer } from "apollo-server";

import typeDefs from './schema/typeDefs';
import resolvers from "./resolvers";



const server=new ApolloServer({typeDefs,resolvers})

server.listen().then(({url})=>{
    console.log(`Server is up and running at ${url}`)
})