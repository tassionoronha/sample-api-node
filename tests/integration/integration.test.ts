import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';

describe('Testes de Integração' , () => {

  'use strict';
  const config = require('../../server/config/env/config');
  const model = require('../../server/models');

  let id;
  const userTest = {
    id: 100,
    name: 'Usuário Teste',
    email: 'teste@email.com',
    password: 'teste'
  };

  const userDefault = {
    id: 1,
    name: 'Usuário Default',
    email: 'default@email.com',
    password: 'default'
  };

  beforeEach((done) => {
    model.User.destroy({
      where: {}
    })
    .then(()=>{
      return model.User.create(userDefault);
    })
    .then(user=>{
      model.User.create(userTest)
        .then(()=>{
          done();
        })
    });
  });

  describe('GET /api/users/all', () => {
    it('Deve retornar um Json com todos os Usuários', done => {
      request(app)
        .get("/api/users/all")
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload).to.be.an('array');
          expect(res.body.payload[0].name).to.be.equals(userDefault.name);
          expect(res.body.payload[0].email).to.be.equals(userDefault.email);
          done(error);
        });
    });
  });

  describe('GET /api/users/:id', () => {
    it('Deve retornar um Json com o usuário específico', done => {
      request(app)
        .get(`/api/users/${userDefault.id}`)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload.id).to.be.eql(userDefault.id);
          expect(res.body.payload.name).to.be.eql(userDefault.name);
          expect(res.body.payload.email).to.be.eql(userDefault.email);
          done(error);
        });
    });
  });

  describe('POST /api/users/create', () => {
    it('Deve cadastrar um Usuário', done => {
      const user = {
        id: 2,
        name: 'Usuário Teste',
        email: 'usuario@teste.com',
        password: 'teste'
      };

      request(app)
        .post("/api/users/create")
        .send(user)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload.id).to.be.eql(user.id);
          expect(res.body.payload.name).to.be.eql(user.name);
          expect(res.body.payload.email).to.be.eql(user.email);
          done(error);
        });
    });
  });

  describe('PUT /api/users/:id/update', () => {
    it('Deve atualizar um Usuário', done => {
      const user = {
        name: 'TestUpdate',
        email: 'update@email.com'
      };
      request(app)
        .put(`/api/users/${userTest.id}/update`)
        .send(user)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload.name).to.be.eql(user.name);
          expect(res.body.payload.email).to.be.eql(user.email);
          done(error);

        });
    });
  });

  describe('DELETE /api/users/:id/destroy', () => {
    it('Deve excluir um usuário', done => {
      request(app)
        .delete(`/api/users/${1}/destroy`)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          done(error);
        });
    });
  });
});
