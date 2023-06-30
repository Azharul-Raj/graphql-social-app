import { ContextType, PostProps, UserProps,PostPayloadType } from "types";
import { postMutation } from "./PostMutations";
import { userMutations } from "./UserMutations";




export const Mutation={
    createPost:postMutation.createPostMutation,
   
    updatePost:postMutation.updatePostMutation,
    //delete user mutation
    deletePost:postMutation.deletePostMutation,
    // user creation mutation
    singUpUser:userMutations.singUp,
    //userLogin
    singInUser:userMutations.singIn
   
}