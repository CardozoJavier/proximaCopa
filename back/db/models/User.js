var db = require('../index');
const Sequelize = require('sequelize');
var crypto = require('crypto'); // NECESARIA PARA LA SEGURIDAD DE LA PW

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        validate:{
            isEmail:true
        },
        unique: true
    },
    salt: {
        type: Sequelize.TEXT,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
            // len: {
            //     args: [6, 20]
            // }
        }
    },   
    access: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
		telefono: {
			type: Sequelize.STRING,
			defaultValue: ''
		},
		domicilio: {
			type: Sequelize.STRING,
			defaultValue: ''
		},
		ciudad: {
			type: Sequelize.STRING,
			defaultValue: ''
		},
		provincia: {
			type: Sequelize.STRING,
			defaultValue: ''
		}
});

User.passwordSalt = function () {
    return crypto.randomBytes(20).toString('hex');
}

User.prototype.passHash = function (password, salt) {
    var pass = crypto.createHmac('sha1', salt).update(password).digest('hex')
    return pass;
}

User.hook('beforeCreate', (user, options) => {
    user.salt = User.passwordSalt();
    user.password = user.passHash(user.password, user.salt)
});


//VALIDADOR DE PASSWORD
//VALIDADOR DE PASSWORD
//VALIDADOR DE PASSWORD
//VALIDADOR DE PASSWORD
// User.prototype.checkPassword = function (password) {
//     var pass = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
//     if (pass == this.password) return true
//     return false
// }

module.exports = User
