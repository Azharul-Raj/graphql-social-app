import Jwt from 'jsonwebtoken';


const getUserByToken=(token:string)=>{
   try {
    return Jwt.verify(token,process.env.SECRET) as {userId:string}
   } catch (error) {
    return null
   }
}
export default getUserByToken;