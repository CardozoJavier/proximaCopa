const express= require('express');
const router= express();

const { Cellar }= require('../db/models/index');

router.get('/:cellarId', (req,res) => {
	Cellar.findById(req.params.cellarId)
		.then(data => res.send(data))
});

router.get('/', (req,res) => {
	Cellar.findAll({})
		.then(data => res.send(data))
});

module.exports= router;