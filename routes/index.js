var express = require('express');
var router = express.Router();
var connection = require("../config/connection");

/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM users',function (err,rows) {

    if (err) throw err;
    res.render('index', {users:rows,title:'Wellcome'});
  });
});

//create user data object
router.post('/addUser',function (req,res) {
  const userdata = {
    name:req.body.name,
    email:req.body.email,
    city:req.body.city
  };

  // insert user data object

  connection.query("INSERT INTO users SET ?",userdata,function (err,result){
    if (err) throw err;
    res.redirect('/');
  });
});
//delete users
  router.get('/deleteUser/:id',function (req,res) {
    var userid = req.params.id;

    connection.query("DELETE FROM users WHERE id = ?",[userid],function (err,result) {
      if (err) throw err;
      res.redirect('/');
    });
  });

  //edit users
  router.get('/edit/:id',function (req,res) {

    var userid = req.params.id;
    connection.query("SELECT * FROM users WHERE id = ?",[userid],function (err,rows) {
      if (err) throw err;
      res.render('edit',{userdata:rows});
    });
  });

  //update users
  router.post('/updateUser/:id',function (req,res) {
    var name = req.body.name;
    var email = req.body.email;
    var city = req.body.city;

    var userid = req.params.id;

    connection.query("UPDATE users SET name=?,email=?,city=? WHERE id=?",[name,email,city,userid],function (err,respond) {
      if (err) throw err;
      res.redirect('../../');
    });
  });

module.exports = router;
