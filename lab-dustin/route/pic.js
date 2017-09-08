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
  debug(`POST /api/gallery/${req.params.id}`);

  debug('file', req.file);
  if (!req.file) return next(createError(400,'No file specified'));

  debug('file path', req.file.path);
  if (!req.file.path) return next(createError(500,'Not saved'));

  next();
});

//router.get('/api/gallery/pic')
