'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Order)
    }
  }
  User.init({
    username: DataTypes.STRING, // by register
    password: DataTypes.STRING, // by register
    name: DataTypes.STRING, // by register
    address: DataTypes.STRING, // by register
    phone: DataTypes.STRING, // by register
    email: DataTypes.STRING, // by register
    isAdmin: DataTypes.BOOLEAN // by hook
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, option)=>{
    const salt = bcrypt.genSaltSync(10)
    instance.password = bcrypt.hashSync(instance.password, salt)
    instance.isAdmin = false
  })
  return User;
};