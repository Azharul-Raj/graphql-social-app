import {UserPayloadType} from '../src/types'

type GetResponseDataType=(
    errorMessage:string,
    token:string|null,
    successMessage?:string,
)=>UserPayloadType
 

 const getUserResponseData : GetResponseDataType = (
    errorMessage,
    token,
    successMessage
    )=>{
    return{
        userErrors:[{message:errorMessage}],
        token,
        message:`${successMessage?successMessage:""}`
    }
}
export default getUserResponseData;