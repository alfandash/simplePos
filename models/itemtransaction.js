'use strict';
module.exports = function(sequelize, DataTypes) {
  var ItemTransaction = sequelize.define('ItemTransaction', {
    noTransaction: DataTypes.INTEGER,
    idItems: DataTypes.INTEGER,
    idTransactions: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER
  });

  ItemTransaction.associate = models => {
    ItemTransaction.belongsTo(models.Item,{
        foreignKey:"idItems"
      })

    ItemTransaction.belongsTo(models.Transaction,{
        foreignKey:"idTransactions"
      })
  }

  return ItemTransaction;
};
