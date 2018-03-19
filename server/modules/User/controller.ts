import {Request, Response} from 'express';
import {onSuccess} from '../../api/responses/sucessHandler';
import {onError} from '../../api/responses/errorHandler';
import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';
import User from './service';

class UserController{

  private UserService: User;
  constructor(){
    this.UserService = new User();
  }

  getAll(req: Request, res: Response){
    this.UserService
      .getAll()
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Erro ao buscar todos usuários'));
  }

  createUser(req: Request, res: Response){
    this.UserService
      .create(req.body)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Erro ao criar usuário'));
  }

  getById(req: Request, res: Response){
    const userId = parseInt(req.params.id);
    this.UserService
      .getById(userId)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Erro ao buscar usuário por ID'));
  }

  updateUser(req: Request, res: Response){
    const userId = parseInt(req.params.id);
    const props = req.body;
    this.UserService
      .update(userId, props)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Erro ao atualizar usuário'));
  }

  deleteUser(req: Request, res: Response){
    const userId = parseInt(req.params.id);
    this.UserService
      .delete(userId)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Erro ao deletar usuário'));
  }
}

export default UserController;
