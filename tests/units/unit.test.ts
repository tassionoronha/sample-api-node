import { testDouble, expect } from './config/helpers';
import User from '../../server/modules/User/service';

describe('Testes unitários do Controller', () => {
  const config = require('../../server/config/env/config');
  const model = require('../../server/models');

  before((done) => {
    model.User.destroy({
      where: {}
    })
    .then(done());
  });

  describe('Método create', () => {
    it('Deve criar um novo Usuário', () => {
      const novoUsuario = {
        id: 1,
        name: 'teste',
        email: 'teste@gmail.com',
        password: 'teste'
      }
      const user = new User();
      return user.create(novoUsuario)
              .then(data => {
                expect(data.dataValues).to.have.all.keys(
                  ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
                );
              });
    });
  });

  describe('Método GET users', () => {
    it('Deve retornar uma lista com todos usuários', () => {
      const user = new User();
      return user.getAll().then(data => {
        expect(data).to.be.an('array');
        expect(data[0]).to.have.all.keys(
          ['email', 'id', 'name', 'password']
        );
      });
    });
  });

  describe('Método update', () => {
    it('Deve atualizar um Usuário', () => {
      const usuarioAtualizado = {
        name: 'novo nome',
        email: 'novo@email.com'
      };
      const user = new User();
      return user.update(1, usuarioAtualizado)
              .then(data => {
                expect(data[0]).to.be.equal(1);
              });
    });
  });

  describe('Método Delete', () => {
    it('Deve deletar um usuário', () => {
      const user = new User();
      return user.delete(1)
              .then(data => {
                expect(data).to.be.equal(1);
              });
    });
  });
});
