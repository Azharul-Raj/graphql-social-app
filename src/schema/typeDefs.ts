import { gql } from "apollo-server";
const typeDefs=gql`
type Query{
    hello:String
}

type User{
    id:ID!
    name:String!
    email:String!
    posts:[Post!]
    profile:Profile
}

type Profile{
    id:ID!
    bio:String!
    user:User!
}

type Post{
    id:ID!
    title:String!
    content:String!
    createdAt:String!
    published:Boolean
    user:User
}
`
export default typeDefs;