const express= require('express');
const router= express();
var passport = require('passport');

var {User} = require('../db/models/index');

router.get('/test', (req, res) => {
    res.send({
        message: 'test',
        user: req.user
    })
})
router.post('/logout',(req,res)=>{
    req.logout();
    res.send('Usuario deslogeado');
})
router.post('/register', (req, res, )=>{
     User.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
       
    })
    .then(user => {
        res.send(user)
    })
    .catch(e => console.log(e));

  
})
router.post('/registerAdmin', (req, res, )=>{
    User.create({
       email: req.body.email,
       password: req.body.password,
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       admin : 2 
      
   })
   .then(user => {
       res.send(user)
   })
   .catch(e => console.log(e));

 
})

router.post('/login', passport.authenticate('local'), (req, res)=>{
    const authenticated = req.isAuthenticated();
 if(authenticated){
    res.send({
        id:req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
     })
 }
 else console.log('NO ESTAS AUTENTICADO')
 res.sendStatus(401)
})
module.exports = router