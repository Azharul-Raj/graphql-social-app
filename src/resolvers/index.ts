import { Mutation } from "./mutations/Mutation";
import { Query } from "./query/Query";
import { Profile } from "./query/Profile";
import { Post } from "./query/Post";

const resolvers={
    Query,
    Mutation,
    Profile,
    Post
}
export default resolvers;