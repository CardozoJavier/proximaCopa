const express= require('express');
const router= express();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


var { Product, Grape, Cellar, Line, Elaboracion, Precio, Box } = require('../db/models/index');


router.get('/busqueda', (req, res) => {
	Product.findAll({
		where: {
			productName: {
				[Op.like]: '%' + req.query.nombre + '%',
			},
		},
	}).then(productos => {
		if (productos.length < 1) {
			res.send({result: false})
		} else {
			res.send(productos)
		}
	});
});

router.get('/getGrape/:id', (req,res) =>{
	//#Buscar Grapes de el productID
	var uvasProducto = []
	var productId = req.params.id;
	Product.findById(productId)
	.then(
		producto => {
			producto.getGrapes()
			.then(
				data => {res.send(data)}
				)
			}
		)
	}
)

router.get('/getProductsByGrape/:productId', (req,res) => {
	//#Selecciona todos los productos con el mismo grape que el productID
	var productId = req.params.productId;
	Grape.findAll({
		include : [{
			model : Product,
			where : { id: parseInt(productId)}
		}]
	})
	.then(grape => {
		Product.findAll({
			include : [{
				model : Grape,
				where : { id:grape[0].id }
			}]
		})
		.then(data => res.send(data))
	})
	.catch(error => console.error(error))
})


// Crea nuevo producto.
router.post('/newproduct', (req,res) => {
	// console.log(req.body, ' REQ BODY')
	// Creo un nuevo producto en la DB con la informacion que me llega en el objeto req.body.
	Product.create(req.body)
	.then(product => {
		// Busco la bodega que coincida con el nombre definido en el req.body y le seteo el producto creado.
		Cellar.findAll({
			where : { cellarName : req.body.cellarName }
		}).then(cellar => cellar[0].addProduct(product))
		.catch(e => console.log(e))
		
		// Busco la linea y le seteo el producto creado.
		Line.findAll({
			where : { lineName : req.body.lineName }
		}).then(line => line[0].addProduct(product))
		.catch(e => console.log(e))
		
		// Busco el año y si no existe en la base de datos, lo creo y lo relaciono al producto.
		Elaboracion.findOrCreate({
			where : { fecha:req.body.year }
		}).then(year => year[0].addProduct(product))
		.catch(e => console.log(e))

		// Busco el precio y si no existe en la base de datos, lo creo y lo relaciono al producto.
		Precio.findOrCreate({
			where : { precio:req.body.price }
		}).then(price => price[0].addProduct(product))
		.catch(e => console.log(e))

		// Mapeo sobre el array de uvas y se las asigno al producto.
		req.body.grapes && req.body.grapes.map(grapeId => {
			Grape.findById(grapeId)
			.then(grape => {
				product.addGrape(grape)
			})
			.catch(e => console.log(e))
			return product;
		})
	})
	.then(data => res.send(data))
	.catch(e => {
		console.log(e)
		res.status(500).send(e)
	})
});

// Middleware para armar la query.
function filterBuilder (req, res, next) {
	const filters = {
		grape: {},
		cellar: {},
		line: {},
		year: {},
		price: {}
	}
	
	Object.keys(filters).forEach(cat => {
		if(req.query[cat] && req.query[cat].length > 1){
			filters[cat].id = {
				[Op.or] : req.query[cat]
			} || {}
		}
		if(req.query[cat]){
 			filters[cat].id = req.query[cat] || {}
		}
	})
	
	req.filters = filters;
	next()
}

// FILTROS FUNCIONANDO 28/11/2018 19:00HS
router.get('/filter', filterBuilder, (req, res) => {
	Product.findAll({
		where: {
			productName: {
				[Op.iLike]: `%${req.query.search || '' }%`,
			},
		},
		include: [{
			model: Grape,
			where: req.filters.grape
		},{
			model: Cellar,
			where: req.filters.cellar
		},{
			model: Line,
			where: req.filters.line	
		},{
			model: Elaboracion,
			where: req.filters.year
		},{
			model: Precio,
			where: req.filters.price	
		}]
	}).then((prods) => {
		if (prods.length < 1) {
			res.send({result: false})
		} else {
			res.send(prods)
		}
	})
	.catch(e => console.log(e))
})

router.put('/update', (req,res) => {
	Product.findById(req.body.productId)
		.then(product => product.update(req.body))
		.then(product => product.setGrapes(req.body.grapes))
	Elaboracion.findAll({ where: { fecha:req.body.year } })
		.then(year => year[0].update({ fecha:req.body.year }))
		.then(data => res.send(data))
});

router.get('/:id', (req,res) => {
	Product.findById(req.params.id)
	.then (data => res.send(data));
});

// Ruta --> /api/products 
router.get('/', (req,res) => {
	Product.findAll({})
	.then (data => res.send(data));
});


module.exports= router;

