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

type UserError{
    message:String!
}

type PostPayload{
    userErrors:[UserError!]!
    post:Post
}
# Mutation Schema here
type Mutation{
    createPost(title:String!,content:String!):PostPayload!
    createUser(name:String!,email:String!,password:String!):User
}
`
export default typeDefs;