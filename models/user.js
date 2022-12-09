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
      User.hasOne(models.Order, { onDelete: 'cascade', onUpdate: 'cascade'})
    }
  }
  User.init({
    username: {type:DataTypes.STRING, validate: {notEmpty:{msg:'Username is required'}}}, // by register
    password: {type:DataTypes.STRING, validate: {notEmpty:{msg:'Password is required'}}}, // by register
    email: {type:DataTypes.STRING, validate: {notEmpty:{msg:'Email is required'}}}, // by register
    name: {type:DataTypes.STRING, validate: {notEmpty:{msg:'Name is required'}}}, // by register
    address: {type:DataTypes.STRING, validate: {notEmpty:{msg:'Address is required'}}}, // by register
    phone: {type:DataTypes.STRING, validate: {notEmpty:{msg:'Phone is required'}}}, // by register
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