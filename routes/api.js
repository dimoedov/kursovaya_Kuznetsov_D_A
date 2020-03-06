let mongoose = require('mongoose');
let config = require('../config/database');
let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();
let User = require("../models/user");
let CarFix = require("../models/carfix");

router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          let token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 60 // 1 min
          });
          // return the information including token as JSON
          res.cookie('Authorized',token);
          res.cookie('id',user._id);
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});
router.get('/signout', function(req, res) {
  res.cookie('Authorized',null,{
    maxAge: 1
  });
  res.json({success: true, msg: 'signout'});
});

router.post('/CarFix', function(req, res) {
  let token = req.cookies;
  if (token) {
    let newCarFix = new CarFix({
      kind_of_work: req.body.kind_of_work,
      service: req.body.service,
      engineer: req.body.engineer,
      customer: req.get_cookie('id'),
      price: req.body.price
    });

    newCarFix.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save CarFix failed.'});
      }
      res.json({success: true, msg: 'Successful created new CarFix.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/CarFix', function(req, res) {
  let token = req.cookies;
  if (token !== null) {
    CarFix.find(function (err, CarFix) {
      if (err) return next(err);
      res.json(CarFix);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;
