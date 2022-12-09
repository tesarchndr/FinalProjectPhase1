'use strict';
const {sequelize} = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Masseus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Masseus.hasMany(models.Testimony,{ onDelete: 'cascade', onUpdate: 'cascade'})
      Masseus.belongsTo(models.Order)

    }
    formatPrice(){
      return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(this.price);
    }
  }
  Masseus.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : 'name is required'
        },
        notEmpty: {
          msg : 'name is required'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : 'gender is required'
        },
        notEmpty: {
          msg : 'gender is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : 'category is required'
        },
        notEmpty: {
          msg : 'category is required'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : 'location is required'
        },
        notEmpty: {
          msg : 'location is required'
        }
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg : 'name is required'
        },
        notEmpty: {
          msg : 'name is required'
        },
        max: 5,
        min: 0
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg : 'price is required'
        },
        notEmpty: {
          msg : 'price is required'
        }
      }
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : 'img is required'
        },
        notEmpty: {
          msg : 'img is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Masseus',
  });
  return Masseus;
};