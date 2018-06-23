'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
	  var designModels = [
          {
			  size: "L"
		  }
      ];
      return queryInterface.bulkInsert('Design_models', designModels, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
	return queryInterface.bulkDelete('Design_models', null, {});
  }
};
