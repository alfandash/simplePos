'use strict';
module.exports = function(sequelize, DataTypes) {
  var ItemTransaction = sequelize.define('ItemTransaction', {
    noTransaction: DataTypes.INTEGER,
    idItems: DataTypes.INTEGER,
    idTransactions: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ItemTransaction;
};