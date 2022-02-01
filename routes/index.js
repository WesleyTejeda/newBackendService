var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;
const md5 = require('md5');

var crypto = require('crypto');

var userSchema = new Schema ({
  username: String,
  password: String,
  sessionID: String
});

var userModel = mongoose.model('userModel', userSchema);

db.on('error', console.error.bind(console, 'MongoDB error'));


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send('');
});

router.post('/signup', (req, res, next) => {
  userModel.findOne({username: req.body.username}, "username", (err, acc) =>{
    if(err)
      return res.send(err)
    if(!acc){
      userModel.create({username: req.body.username, 
        password: md5(req.body.password), 
        sessionID: crypto.randomBytes(32).toString('base64')}, (err, msg) => {
        res.send(err ? err : {
          sessionID: msg.sessionID, 
          username: msg.username
        });
      });
    }else{
      res.send({err: "account already exists"})
    }
  })
});


router.post('/login', (req, res, next) => {
  userModel.findOne({username: req.body.username}, '_id username password sessionID', (err, acc) => {
    if (!err && acc) {
      if (md5(req.body.password) == acc.password) return res.send({
        sessionID: acc.sessionID,
        customerID: acc._id
      });
    }

    return res.send({err: 'invalid credentials'});
  });
});

router.post('/auth', (req, res, next) => {
  userModel.findOne({sessionID: req.body.sessionID}, '_id username sessionID', (err, acc) => {
    if (!err && acc) {
      if (req.body.username == acc.username) return res.send({
        customerID: acc._id
      });
    }

    return res.send({err: 'invalid sessionID'});
  })
});



module.exports = router;
