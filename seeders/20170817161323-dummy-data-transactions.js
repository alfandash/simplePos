'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Transactions', [{
        noTransaction: 2222221,
        total: 250000,
        createdAt: '2017-08-10 07:51:56.255+07',
        updatedAt: '2017-08-10 07:51:56.255+07'
      },{
        noTransaction: 2222222,
        total: 120000,
        createdAt: '2017-08-11 07:51:56.255+07',
        updatedAt: '2017-08-11 07:51:56.255+07'
      },{
        noTransaction: 2222223,
        total: 212000,
        createdAt: '2017-08-12 07:51:56.255+07',
        updatedAt: '2017-08-12 07:51:56.255+07'
      },{
        noTransaction: 2222224,
        total: 134000,
        createdAt: '2017-08-13 07:51:56.255+07',
        updatedAt: '2017-08-13 07:51:56.255+07'
      },{
        noTransaction: 2222225,
        total: 284000,
        createdAt: '2017-08-14 07:51:56.255+07',
        updatedAt: '2017-08-14 07:51:56.255+07'
      },{
        noTransaction: 2222226,
        total: 168500,
        createdAt: '2017-08-15 07:51:56.255+07',
        updatedAt: '2017-08-15 07:51:56.255+07'
      },{
        noTransaction: 2222227,
        total: 70000,
        createdAt: '2017-08-16 07:51:56.255+07',
        updatedAt: '2017-08-16 07:51:56.255+07'
      }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Transactions', null, {});
  }
};
