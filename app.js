const { Sequelize } = require('sequelize');
const config = require('./config/config.json');
const User = require('./models/user');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Kết nối MySQL thành công');
  })
  .catch(err => {
    console.error('❌ Kết nối MySQL thất bại:', err);
  });

sequelize.sync({ force: false }).then(() => {
    console.log("✅ Database và các model đã được đồng bộ hóa!");
}).catch((error) => {
    console.error("❌ Lỗi đồng bộ hóa Database:", error);
});
