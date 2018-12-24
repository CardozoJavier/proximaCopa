const express= require('express');
const router= express();

const { Line }= require('../db/models/index');

router.post('/create', (req,res) => {
	Line.findOrCreate({
		where : {
			lineName : req.body.value
		}
	})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

router.get('/:lineId', (req,res) => {
	Line.findById(req.params.lineId)
		.then(data => res.send(data))
});

router.get('/', (req,res) => {
	Line.findAll({})
		.then(data => res.send(data))
});

module.exports= router;