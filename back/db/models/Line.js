var db = require('../index');
const Sequelize = require('sequelize');

const Line = db.define('line', {
    lineName: {
        type: Sequelize.STRING,
				allowNull: false
    },
});

module.exports = Line;
