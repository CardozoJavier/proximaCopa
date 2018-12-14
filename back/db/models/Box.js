/*
Modelo para la ubicación de las cajas
La unidad es la caja numerada (id alfanumérico)
'Este vino, en este lugar con X stock'
-Hacer vista materializada: el producto en un query
*/

const Sequelize= require('sequelize');
const db= require('../index');

const Box= db.define('box', {
	box: {
		type:	Sequelize.STRING
	},
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		validate: {
			max : 6
		}
	}
});


// Box.beforeUpdate(box => {
//   if (box.quantity > 6){
//     throw new Error("Caja llena. Elige otra ubicacion.")
//   }
// })

module.exports= Box;