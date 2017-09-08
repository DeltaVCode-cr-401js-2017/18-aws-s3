'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const multer = require('multer');
const debug = require('debug')('app:route/pic');
const Gallery = require('../model/gallery');
const bearerAuth = require('../lib/bearer-auth-middleware');

const dataDir = `${__dirname}/../temp`;
const upload = require('multer')({ dest: 'dataDir' });
const router = module.exports = new Router();

router.post('/api/gallery/:id/pic',upload.single('image'),(req,res,next) => {
  
});

//router.get('/api/gallery/pic')
