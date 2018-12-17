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
       res.send({
				 id : user.id,
				 firstName : user.firstName,
				 lastName : user.lastName,
				 email : user.email,
				 admin : user.admin,
				 
			 })
   })
   .catch(e => console.log(e));

 
})

router.post('/login', passport.authenticate('local'), (req, res)=>{
  const authenticated = req.isAuthenticated();
 	User.findById(req.user.id)
		.then(data => data.dataValues)
		.then(user => {
			if(authenticated){
				res.send({
						id:user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						telefono: user.telefono,
						domicilio: user.domicilio,
						ciudad: user.ciudad,
						provincia: user.provincia
				})
			}else{
				console.log('NO ESTAS AUTENTICADO')
				res.sendStatus(401)
			}
		})
})

router.put('/:id/update', (req,res) => {
	User.findById(req.params.id)
		.then(user => user.update(req.body))
		.then(user => res.send(201))
		.catch(e => console.log(e))
});

router.get('/:id', (req,res) => {
	User.findById(req.params.id)
		.then(data => res.send(data))
		.catch(e => console.log(e))
});


module.exports = router