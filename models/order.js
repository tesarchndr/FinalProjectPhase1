'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
      Order.hasMany(models.Masseus, { onDelete: 'cascade', onUpdate: 'cascade'})
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER,
    MasseuId: DataTypes.INTEGER,
    orderDate: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  Order.beforeCreate((instance, option)=>{
    instance.status = 'ordered'
  })
  return Order;
};