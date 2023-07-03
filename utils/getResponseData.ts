import { Post } from "@prisma/client"
import { PostPayloadType } from "types";

type GetResponseDataType=(
    errorMessage:string|null,
    post:Post|null,
    successMessage?:string
)=>PostPayloadType
 

 const getResponseData : GetResponseDataType = (
    errorMessage,
    post,
    successMessage
    )=>{
    return{
        userErrors:[{message:errorMessage}],
        post:post,
        message:`${successMessage?successMessage:""}`
    }
}
export default getResponseData;