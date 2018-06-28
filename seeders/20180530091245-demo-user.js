'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      var users = [
		  {
              id: 1,
              firstName: 'TM',
              lastName: 'Admin',
              email: 'tmadmin@gmail.com',
              password: '$2a$08$hguFhdL8y.Me101EzFcFNOVrO73udXEpSCdxjDUYbjO5w8/yICYHi',
			  role: 'admin'
          },
		  {
              firstName: 'Huynh',
              lastName: 'An',
              email: 'huynhan@gmail.com',
              password: '$2a$08$hguFhdL8y.Me101EzFcFNOVrO73udXEpSCdxjDUYbjO5w8/yICYHi',
			  role: 'user',
			  gender: 'male',
			  phoneNumber: '0123456789',
			  country: 'Vietnam',
			  city: 'Ho Chi Minh',
			  address: '123 Nguyen Thi Minh Khai'
          },
		  {
              firstName: 'Quang',
              lastName: 'Hung',
              email: 'quanghung@gmail.com',
              password: '$2a$08$hguFhdL8y.Me101EzFcFNOVrO73udXEpSCdxjDUYbjO5w8/yICYHi',
			  role: 'user',
			  gender: 'male',
			  phoneNumber: '01233332333',
			  country: 'Vietnam',
			  city: 'Ho Chi Minh',
			  address: '33 Dinh Tien Hoang'
          },
		  {
              firstName: 'Huynh',
              lastName: 'Duy',
              email: 'huynhduy@gmail.com',
              password: '$2a$08$hguFhdL8y.Me101EzFcFNOVrO73udXEpSCdxjDUYbjO5w8/yICYHi',
			  role: 'user',
			  gender: 'male',
			  phoneNumber: '01233332333',
			  country: 'Vietnam',
			  city: 'Ho Chi Minh',
			  address: '22 Cao Thang'
          }
      ];
       return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
