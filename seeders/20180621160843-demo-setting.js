'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

	  var settings = [
	    {
        	key: 'tax',
			value: 5
		},
		{
			key: 'frontDesignPrice',
			value: 4.99
		},
		{
			key: 'backDesignPrice',
			value: 4.99
		}

	  ]
      return queryInterface.bulkInsert('Settings', settings , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Settings', null, {});
  }
};
