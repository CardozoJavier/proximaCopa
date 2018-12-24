const express= require('express');
const router= express();

const { Cellar }= require('../db/models/index');

router.post('/delete', (req,res) => {
	Cellar.findById(req.body.id)
		.then(data => data.destroy())
		.catch(e => console.log(e))
});

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
		.catch(e => console.log(e))
});

router.get('/', (req,res) => {
	Cellar.findAll({})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

module.exports= router;