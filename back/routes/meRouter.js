
const express= require ('express');
const router= express();
const { User }= require('../db/models/index.js');


router.get('/', (req,res)=>{
    req.user ? res.send(req.user) : res.send({user: false})
})

module.exports = router;