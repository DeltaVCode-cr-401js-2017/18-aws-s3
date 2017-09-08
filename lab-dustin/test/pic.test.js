'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');
const debug = require('debug')('app:test/pic');

const Pic = require('../model/pic');
const Gallery = require('../model/gallery');
const User = require('../model/user');
const example = require('./lib/examples');

require('../lib/mongoose-connect');

describe.only('Pic Routes',function(){
//Create a user
  beforeEach(function makeTestUser(){
    return User.createUser(example.user)
      .then(user => this.testUser = user)
      .then(user => user.generateToken())
      .then(user => debug('testUser: ',user))
      .then(token => this.testToken = token);
  });
  //Create a gallery
  beforeEach(function makeTestGallery(){
    return Gallery.createGallery(example.gallery,this.testUser._id)
      .then(gallery => this.testGallery = gallery);
  });
  //Delete User
  afterEach(function resetAll(){
    delete this.testUser;
    delete this.testGallery;
    delete this.testPic;

    return Promise.all([
      User.remove({}),
      Gallery.remove({}),
      Pic.remove({})
    ]);
  });
  describe('POST /api/gallery/:id/pic',function(){
    it('should return 401 without authorization',function(){
      return request.post(`/api/gallery/${this.testGallery.userID}/pic`)
        .send(example.pic)
        .expect(401);
    });
  });
});
