const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const Grape = require('./Grape');
const Cellar = require('./Cellar');
const Line = require('./Line');
const Precio= require('./Precio');
const Elaboracion= require('./Elaboracion');
const OrderProduct= require('./OrderProduct')

// Relaciones entre las diferentes tablas, por ejemplo:
// tenemos Order como source, y User como target,
// esto nos crea una tabla intermedia llamada 'user_order' que va contener los userId y 
// los orderId de los elementos relacionados.

//	 CELLAR							LINE							PRODUCT							GRAPE
//				|_ product 				|_ product					 |_ grape					 |_ product
//				|_ line 					|_ grape
//				|_ grape


Cellar.hasMany(Product, { as:'Product' });
Product.belongsTo(Cellar);

Cellar.hasMany(Line, { as:'Line' });
Line.belongsTo(Cellar);

User.hasMany(Order, { as:'Order' });
Order.belongsTo(User);

Order.belongsToMany(Product, {through:OrderProduct})
Product.belongsToMany(Order, {through:OrderProduct})


Line.hasMany(Product, { as:'Product' });
Product.belongsTo(Line);

Elaboracion.hasMany(Product, { as:'Product' });
Product.belongsTo(Elaboracion);

Precio.hasMany(Product, { as:'Product' });
Product.belongsTo(Precio);

Product.belongsToMany(Grape, { through:'product_grape' });
Grape.belongsToMany(Product, { through:'product_grape' });

Cellar.belongsToMany(Grape, { through:'cellar_grape' });
Cellar.belongsToMany(Elaboracion, { through:'cellar_elab' });


module.exports = {
  User,
	Order,
	Product,
	Line,
	Grape,
	Cellar,
	Elaboracion,
	Precio,
	OrderProduct
};

