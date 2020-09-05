/**
 * @author Ryan Fernandes
 */

const express = require('express');
const bodyParser = require('body-parser');
const userRequestRouter = express.Router();
const mongoose = require('mongoose');
const user = require('../models/users');

userRequestRouter.use(bodyParser.json());

userRequestRouter.route('/:status')
  .put((req, res, next) => {
    user.findByIdAndUpdate({_id:req.body.id},{"status":req.params.status},function(err, d) {
        if (err) {
          return res.send(err);        
        } else{
           res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.send({"message":"Success"});
        }      
      });
  });

    userRequestRouter.route('/:usertype')
  .get((req, res, next) => {
    
      user.find({"account_type":req.params.usertype,"status":""},function(err, d) {
        if (err) {
          return res.send(err);        
        } else{
           res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.json(d);
        }      
      });
        
  });

module.exports = userRequestRouter;