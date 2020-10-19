const sequelize = require("sequelize");
const db = require("../database/connection.js");


const posts = db.define('posts', {
  id:{
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey:true
  },
  content: {
    type: sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: sequelize.STRING,
    defaultValue: false,
  },
  userId: {
    type: sequelize.INTEGER,
  },
});

posts.associate = (models) => {
    posts.belongsTo(models.users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
};

module.exports = posts;