'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
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
