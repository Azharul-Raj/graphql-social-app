import { gql } from "apollo-server";
const typeDefs=gql`
type Query{
    posts:[Post!]    
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
    id:Int!
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
    post:Post,
    message:String
    success:Boolean
}
# input type
input PostInput{
    title:String
    content:String
}
# Mutation Schema here
type Mutation{
    createPost(data:PostInput!):PostPayload!
    updatePost(postId:ID!,data:PostInput!):PostPayload!
    deletePost(postId:ID!):PostPayload!
    createUser(name:String!,email:String!,password:String!,bio:String!):User
}
`
export default typeDefs;