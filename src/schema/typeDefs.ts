import { gql } from "apollo-server";


const typeDefs=gql`
type Query{
    posts:[Post!]   
    postsOfUser:PostQueryPayload!
    profile(userId:ID!):Profile!
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
    posts:[Post!]
}

type Post{
    id:Int!
    title:String!
    authorId:Int!
    content:String!
    updatedAt:String!
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

type PostQueryPayload{
    userErrors:[UserError!]!
    posts:[Post!],
    message:String
    success:Boolean
}

type UserPayload{
    userErrors:[UserError!]!
    token:String,
    message:String
    success:Boolean
}
# input type
input PostInput{
    title:String
    content:String
    published:Boolean
}
# Mutation Schema here
type Mutation{
    createPost(data:PostInput!):PostPayload!
    updatePost(postId:ID!,data:PostInput!):PostPayload!
    deletePost(postId:ID!):PostPayload!
    singUpUser(name:String!,email:String!,password:String!,bio:String!):UserPayload!
    singInUser(email:String!,password:String!):UserPayload!,

}
`
export default typeDefs;