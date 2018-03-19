import {Request, Response} from 'express';
import * as HTTPStatus from 'http-status';

class UserController{
  constructor(){}

  getAll(req: Request, res: Response){
    res.status(HTTPStatus.OK).json({
      message: 'Ok'
    })
  }

  createUser(req: Request, res: Response){
    res.status(HTTPStatus.OK).json({
      message: 'Ok'
    })
  }

  getById(req: Request, res: Response){
    res.status(HTTPStatus.OK).json({
      message: 'Ok'
    })
  }

  updateUser(req: Request, res: Response){
    res.status(HTTPStatus.OK).json({
      message: 'Ok'
    })
  }

  deleteUser(req: Request, res: Response){
    res.status(HTTPStatus.OK).json({
      message: 'Ok'
    })
  }
}

export default UserController;
