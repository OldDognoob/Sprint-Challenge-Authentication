//Imports
const router = require('express').Router();
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

//model
const Users = require("./users-model");

function makeToken(user){
  const payload = {
    sub: user.id,
    username: user.username
  };
  const options = {
   expriresIn: "2d"
  };
  const token = jwt.sign (
    payload,
    process.env.JWT_SECRET || "secret",
    options
  );
  return token;
}

router.post('/register', (req, res) => {
  // implement registration
  let user=req.body;
  const hash = bcrypt.hashSync(user.password,10);
  user.password =hash;

  Users.add(user)
  .then(user =>{
    res.status(201).json(saved);
  })
  .catch(error =>{
    res.status(500).json({message:"An error occur register this user"});
  });
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password}=req.body;

  Users.findBy({username})
  .first()
  .then(user =>{
    if(user && bcrypt.compareSync(password, user.password)){
      const Token = makeToken(user);
      res.status(200).json({message:`Hello ${user.username}`, Token});
    }else{
      res.status(401).json({message:"Your credentials are wrong"});
    }
  })
  .catch(error =>{
    res.status(500).json({message:"An error occur in log in"});
  });
});

module.exports = router;
