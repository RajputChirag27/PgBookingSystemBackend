import { NextFunction, Request, Response } from 'express'
import { inject } from 'inversify'
import { UserService } from '../services'
import {
  controller,
  httpPost,
  httpGet,
  httpDelete,
  httpPut,
  next
} from 'inversify-express-utils'
import { TYPES } from '../constants'
import { ApiHandler, CustomError } from '../handlers'


@controller('/user')
export class UserController {

  constructor(
    @inject(TYPES.UserService) private readonly _userService: UserService,
  ) {

  }

  @httpGet('')
  async test(req: Request, res: Response){
    try{
        throw new CustomError('Error', 404 , 'This is Error');
        // res.status(200).json(new ApiHandler("Hello", "Chirag"))
    }catch(err){
        throw err;
    }
  }

}