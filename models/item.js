'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name tidak boleh kosong"
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Stock tidak boleh kosong"
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Harga tidak boleh kosong"
        }
      }
    },
    keterangan: DataTypes.STRING
  });

  Item.associate = models => {
    Item.belongsToMany(models.Transaction,{
      through:models.ItemTransaction,
      foreignKey: 'idItems'
    })
  }

  return Item;
};
