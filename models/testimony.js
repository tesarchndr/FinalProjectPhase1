'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimony extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Testimony.belongsTo(models.Masseus)
    }
  }
  Testimony.init({
    MasseuId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    likeStatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Testimony',
  });
  return Testimony;
};