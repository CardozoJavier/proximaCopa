const express= require('express');
const router= express();

const { Order }= require('../db/models/index');

router.post('/new', (req,res) => {
    // res.send({hola: 'jaja'})
    Order.create(req.body)
    .then(order => res.send(order.data))
});


router.get('/', (req,res) => {
	Order.findAll({})
		.then(data => res.send(data))
});

module.exports= router;
