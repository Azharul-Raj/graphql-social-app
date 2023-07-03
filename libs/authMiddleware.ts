import { AuthenticationError } from 'apollo-server';
import { NextFunction, Request } from 'express';
import getUserByToken from '../libs/getUserFromToken';
import { prisma } from 'index';

interface authMiddlewareTypes{
  userErrors:[{message:string}],

}

export const authMiddleware = (userId:any, next?:NextFunction) => {
  if(!userId){
    return{
      userError:[
        {
          message:"You are not authenticated"
        }
      ]
    }
  }
  return next();
};

