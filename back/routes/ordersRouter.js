const express= require('express');
const router= express();
const Sequelize = require('sequelize');

const { Order, OrderProduct, Product, Cellar, Line }=require('../db/models/index')

var { apiKey, domain }= require('../config/mailing.js')
var Mailgun= require('mailgun-js');
var mailgun= new Mailgun({ apiKey, domain });


router.post('/email', (req,res) => {
	var total= 0;
	var data= req.body.order.products.map(product => {
			total += product.product.price * product.cantidad;
			 return Cellar.findById(product.product.cellarId)
			.then(data => {
				var cellar= data.dataValues.cellarName;
				return Line.findById(product.product.lineId)
					.then(data => {
						var line= data.dataValues.lineName;
						return {
							id: product.product.id,
							name: product.product.productName,
							cellar: cellar,
							line: line,
							year: product.product.year,
							price: product.product.price,
							quantity: product.cantidad,
							subtotal: product.cantidad * product.product.price
						}
					})
			})
	})
	Promise.all(data).then(data =>	{
		// Esto va a ser el contentido del mail con los datos de la venta:
		var productInfo= data.map(e => {
			return [
				'ID de producto: ' + e.id,
				'\n Nombre de producto: ' + e.name,
				'\n Nombre de bodega: ' + e.cellar,
				'\n Nombre de línea: ' + e.line,
				'\n Año de elaboración: ' + e.year,
				'\n Precio unitario: $' + e.price,
				'\n Cantidad de unidades: ' + e.quantity,
				'\n Subtotal: $' + e.subtotal,
				'\n_____________________________\n'
			]
		})		
		// Formato del mail, con los campos requeridos por mailGun.
		var content = {
			from: 'proxima_copa@pogo.com',
			to: 'cardozojavier.c@gmail.com',
			subject: 'Datos de venta',
			text: ['Nueva venta realizada: '
			+ '\n ID de usuario: ' + req.body.user.id
			+ '\n Nombre de usuario: '+ req.body.user.firstName + ' ' + req.body.user.lastName
			+ '\n Email: ' + req.body.user.email 
			+ '\n Productos: \n_____________________________\n' + productInfo.join('')
			+ '\n Total: $' + total].join('')

		};
		mailgun.messages().send(content, function (error, body) {
			error && console.log(error)
		  console.log('Datos enviados al administrador');
		});
	});
})


// router.post('/createOrder', function(req, res){
 
   
//     res.send(console.log("orden creada"))    
// })
router.get('/allOrders', function(req, res){
        order.findAll({
            where:{
                status: {[Op.notILike]:"guardado"}
            }
        })
 })  
// router.get('/cartOfUser/:userId', function(req, res){
//     Order.findAll({
//         where:{
//             userId: req.params.userId,
//             status :"guardado"
//         }
//     })
//     // .then(data=>console.log(data, " entre"))
//     .then(data=>data[0])
//     .then(arr=> arr.id)
//     .then( orderId=>
//         OrderProduct.findAll({
//             where:{orderId: orderId}
//         })
//     )
//     .then(data=>{
        
//         let arr=[], aux
//         for (var i = 0; i< data.length; i++){ 
//             console.log(data[i].dataValues.productId, ' <==== ID '),
            
//             Product.findById(data[i].dataValues.productId)
//             .then( prod=>{
               
//                     arr[i]={
//                     cantidad: data[i].dataValues.cantidad,
//                     product: prod
//                     }
//                     return aux
                
//                 }

//                 )
//         }
//         return arr
//     }
//     )
//     .then(prod=> res.send(prod))
// })  


router.post('/addProductToOrder', function(req, res){
    // Necesita ID PRODUCTO, ID ORDEN
    // Se fija si existe el producto en la orden
    // Si no existe lo crea con deafult 1
    // Si existe agrega cantidad++
    // ProductID y OrderID se usan 2 veces con los mismos valores
  
    Order.findOrCreate({
        where:{
            status: "guardado",
            userId: req.body.userId
        }
    })
    .then(res=> res[0].dataValues)
    .then(order=> OrderProduct.findOrCreate({
        where:{
              orderId: order.id, 
              productId:req.body.productId
            },
            defaults:{cantidad: 1}
    })
    
    .then(data=>{
        if(!data[1]){
            data[0].cantidad ++
            OrderProduct.update(
                {cantidad: data[0].cantidad++ },
                {where:{     
                    orderId: order.id, 
                    productId: req.body.productId  
                }}
            ) 
        } 

    })
    )
    .then(data=> res.send(data))
    
})

router.post('/removeProductFromOrder', function(req, res){
    //elimina una unidad de un producto de una orden
    
    Order.findAll({
        where:{
            status: "guardado",
            userId: req.body.userId
        }
    })
    .then(data=> data[0].dataValues)
    .then(order=>

    
    OrderProduct.findOne({
        where:{orderId: order.id, 
              productId:req.body.productId
            },
            
    })
    .then(data=>{
       if(data.cantidad){
           OrderProduct.update(
              {cantidad: data.cantidad-1 },
              {where:{     
                  orderId: order.id, 
                  productId:req.body.productId  
              }
            })
       }
       else{OrderProduct.destroy({
            where:{
                orderId: order.id, 
                productId:req.body.productId
            }
       }
       )}
    })
    )
    .then(data=> res.send(data))
})

router.post('/deleteProductFromOrder', function(req, res){
    //elimina todas las unidades de un producto de la orden
 
    Order.findAll({
        where:{
            status: "guardado",
            userId: req.body.userId,
        }
    })
    .then(data=> data[0].dataValues) 
    .then(order=>
        OrderProduct.findAll({
            where:{orderId: order.id, 
                  productId:req.body.productId
                },
        })
        .then(order=>{
               OrderProduct.destroy(
                  {where:{     
                      orderId:order.id,
                      productId:req.body.productId,
                  }
                })  
                  
        })
        .then(data=> res.send(data))
    )
})

router.post('/deleteAllProducts', function(req, res){
    //elimina todos los productos de la orden
    Order.findAll({
        where:{
            status: "guardado",
            userId: req.body.userId
        }
    })
    .then(data=> data[0].dataValues) 
    .then(order=>
   
        OrderProduct.findOne({
            where:{
                orderId: order.id    
                },
                
        })
        .then(data=>{
            OrderProduct.destroy(
                {where:{     
                    orderId: order.id ,  
                }
                })
        
        })
    )   
    .then(data=> res.send(data))
})

module.exports= router;