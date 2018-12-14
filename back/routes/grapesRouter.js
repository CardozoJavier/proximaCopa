const express= require('express');
const router= express();

var { Grape, Product }= require('../db/models/index');


router.get('/:productId', (req,res) => {
	Product.findAll({
		where: { id:req.params.productId },
		include: [Grape]
	})
	.then(data => res.send(data[0]))
});

router.get('/', (req,res) => {
	Grape.findAll({})
		.then(data => res.send(data))
});

router.post('/agregarUva', (req,res) =>{
	//Debe recibir el nombre de la grape
	console.log(req.body)
	res.send("ENTRO ACA")
})

module.exports= router;


