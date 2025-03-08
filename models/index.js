// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

// Tự động load các models trong thư mục models
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
