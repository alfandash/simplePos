'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    noTransaction: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    moneyPay: DataTypes.INTEGER
  });

  Transaction.associate = models => {
    Transaction.belongsToMany(models.Item,{
      through:models.ItemTransaction,
      foreignKey: 'idTransactions'
    })
  }

  return Transaction;
};
