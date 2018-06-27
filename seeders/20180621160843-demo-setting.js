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
		},
		{
        	key: 'companyName',
			value: 'AdminTM, Inc.'
		},
		{
        	key: 'companyAddress',
			value: '795 Folsom Ave, Suite 600'
		},
		{
        	key: 'companyCity',
			value: 'San Francisco'
		},
		{
        	key: 'companyCountry',
			value: 'American'
		},
		{
        	key: 'companyPhone',
			value: '(804) 123-5432'
		},
		{
        	key: 'companyEmail',
			value: 'admintm@mailinator.com'
		}

	  ]
      return queryInterface.bulkInsert('Settings', settings , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Settings', null, {});
  }
};
