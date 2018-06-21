'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

	  var settings = [
		  {
        	key: 'tax',
			value: 5
  		  }
	  ]
      return queryInterface.bulkInsert('Settings', settings , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Settings', null, {});
  }
};
