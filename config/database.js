// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ten_database', 'ten_user', 'mat_khau', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('✅ Kết nối MySQL thành công!'))
    .catch((error) => console.error('❌ Kết nối MySQL thất bại:', error));

module.exports = sequelize;
