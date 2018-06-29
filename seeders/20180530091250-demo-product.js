'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    var products = [
        {
			id: 1,
          name: "Gildan Ultra Cotton T-shirt",
          typeId: 1,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template1.jpg",
          price: 20,
          discount: 20,
          description: "This is a nice T-shirt. Your group will love this fashionable tank."
        },
		{
          name: "Gildan Ultra Cotton T-shirt",
          typeId: 2,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template6.jpg",
          price: 20,
          discount: 20,
          description: "This is a nice T-shirt. Your group will love this fashionable tank."

        },
		{
          name: "Gildan Ultra Cotton T-shirt",
          typeId: 6,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template11.jpg",
          price: 20,
          discount: 20,
          description: "This is a nice T-shirt. Your group will love this fashionable tank."

        },
		{
          name: "Gildan Ultra Cotton T-shirt",
          typeId: 3,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template3.jpg",
          price: 20,
          discount: 20,
          description: "This is a nice T-shirt. Your group will love this fashionable tank."

        },
        {
          name: "Anvil Jersey T-shirt",
          typeId: 2,
          minSize: 2,
          maxSize: 5,
          imagePath1: "/img/products/template2.jpg",
          price: 15,
          discount: 20,
          description: "This ultra lightweight tank hits all the right trends: tri‑blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank."
	    },
		{
          name: "Sport‑Tek Ladies Performance Half Zip Pullover",
          typeId: 1,
          minSize: 4,
          maxSize: 6,
          imagePath1: "/img/products/template1.jpg",
          price: 19,
          discount: 13,
          description: "A true performance piece, ideal for year‑round layering. Try this stretchy pullover for your next event, it's sure to be a favorite! Coordinates with the Sport‑Tek Performance Half‑Zip Pullover."

        },
		{
          name: "Anvil Jersey Tank",
          typeId: 5,
          minSize: 4,
          maxSize: 6,
          imagePath1: "/img/products/template16.jpg",
          price: 19,
          discount: 13,
          description: "This tank top offers either a trendy contrast ringer or a traditional solid option. Super soft fabrication will keep your group on‑trend and comfortable all season long!"

        },
		{
          name: "Hanes X‑Temp Tank",
          typeId: 5,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template17.jpg",
          price: 30,
          discount: 15,
          description: "This tank top offers sun protection, extra softness, and a trendy color selection for a great price. What's not to love about this tank?"

        },
		{
          name: "Hanes Ultimate Heavyweight Pullover Hoodie",
          typeId: 7,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template18.jpg",
          price: 30,
          discount: 15,
          description: "Classic, practical, fun and good‑looking too. Perfect for winter months for extra warmth and durability. It's also available for any size order."

	    },

		{
          name: "Hanes EcoSmart® 50/50 Pullover Hoodie",
          typeId: 7,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template19.jpg",
          price: 30,
          discount: 15,
          description: "This mid‑weight hoodie is a customer favorite, with popular color options and a comfortable fit ‑ it's not a shock that it's our best selling hoodie!"

	    },
		{
          name: "Fruit of the Loom Sofspun Pullover Hoodie",
          typeId: 7,
          minSize: 1,
          maxSize: 6,
          imagePath1: "/img/products/template20.jpg",
          price: 30,
          discount: 15,
          description: "Designed to be warm, lightweight and super soft, this hoodie is sure to please. Contrasting drawcords make this style unique and add a sporty edge."
	    }

    ];

    return queryInterface.bulkInsert('Products', products, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Products', null, {});
  }
};
