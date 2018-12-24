const express= require('express');
const router= express();

const { Cellar }= require('../db/models/index');

router.post('/create', (req,res) => {
	Cellar.findOrCreate({
		where : {
			cellarName : req.body.value
		}
	})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

router.get('/:cellarId', (req,res) => {
	Cellar.findById(req.params.cellarId)
		.then(data => res.send(data))
});

router.get('/', (req,res) => {
	Cellar.findAll({})
		.then(data => res.send(data))
});

module.exports= router;