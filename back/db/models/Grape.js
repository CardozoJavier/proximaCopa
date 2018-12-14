var db = require('../index');
const Sequelize = require('sequelize');

const Grape = db.define('grape', {
    grapeName: {
        type: Sequelize.STRING,
    },
});

module.exports = Grape;
