const express= require('express');
const router= express();

var { Grape, Product }= require('../db/models/index');

router.post('/delete', (req,res) => {
	Grape.findById(req.body.id)
		.then(data => data.destroy())
		.catch(e => console.log(e))
});

router.post('/create', (req,res) => {
	Grape.findOrCreate({
		where : {
			grapeName : req.body.value
		}
	})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

router.get('/:productId', (req,res) => {
	Product.findAll({
		where: { id:req.params.productId },
		include: [Grape]
	})
	.then(data => res.send(data[0]))
	.catch(e => console.log(e))
});

router.get('/', (req,res) => {
	Grape.findAll({})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

module.exports= router;


