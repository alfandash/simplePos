'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Items', [{
      name: 'Beng-beng',
      stock: 100,
      price: 3500,
      keterangan: 'Makanan nikmat dan gurih',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Botol Minum',
      stock: 100,
      price: 27000,
      keterangan: 'Tempat minum',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Mantan portable',
      stock: 150,
      price: 500000,
      keterangan: 'Mantan belum dilupakan',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Items', null, {})
  }
};
