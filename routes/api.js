let mongoose = require('mongoose');
let config = require('../config/database');
let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();
let User = require("../models/user");
let Book = require("../models/book");

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
          res.json({success: true, token: 'JWT ' + token});
          console.log(req.cookies);
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});
router.get('/signout', function(req, res) {
  req.clearCookie;
  res.json({success: true, msg: 'signout'});
});

router.post('/book', function(req, res) {
  let token = req.cookies;
  if (token) {
    let newBook = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher
    });

    newBook.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save book failed.'});
      }
      res.json({success: true, msg: 'Successful created new book.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/book', function(req, res) {
  let token = req.cookies;
  if (token) {
    Book.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;
