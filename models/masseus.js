'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masseus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  masseus.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    category: DataTypes.STRING,
    location: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masseus',
  });
  return masseus;
};