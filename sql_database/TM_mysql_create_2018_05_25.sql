CREATE TABLE `Products` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`model_id` INT(11) NOT NULL,
	`extra_ids` BINARY NOT NULL,
	`type_id` INT(11) NOT NULL,
	`qty` INT(11) NOT NULL DEFAULT '1',
	`image` varchar(255) NOT NULL,
	`price` INT(11) NOT NULL,
	`discount` INT(3) DEFAULT '0',
	`description` TEXT,
	`review` FLOAT(2) NOT NULL DEFAULT '0',
	`updated_at` DATE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL UNIQUE,
	`remember_token` varchar(100),
	`role` INT(11) NOT NULL,
	`gender` INT(11) NOT NULL,
	`phone_number` INT(50) NOT NULL UNIQUE,
	`country` VARCHAR(50) NOT NULL,
	`city` VARCHAR(50) NOT NULL,
	`address` TEXT NOT NULL,
	`updated_at` DATE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Categories` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Orders` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_id` INT(11) NOT NULL,
	`product_ids` INT(11) NOT NULL,
	`product_qty` INT(11) NOT NULL,
	`status` INT(11) NOT NULL,
	`subtotal` FLOAT(11) NOT NULL,
	`tax` FLOAT(11) NOT NULL DEFAULT '0',
	`shipping` FLOAT(11) NOT NULL DEFAULT '0',
	`updated_at` DATE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Product_types` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL UNIQUE,
	`category_id` INT(11) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Design_models` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`text` TEXT,
	`images` TEXT,
	`color` VARCHAR(11) NOT NULL DEFAULT '#fff',
	`size` VARCHAR(11),
	`updated_at` DATE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Extras` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	`price` INT(11) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Products` ADD CONSTRAINT `Products_fk0` FOREIGN KEY (`model_id`) REFERENCES `Design_models`(`id`);

ALTER TABLE `Products` ADD CONSTRAINT `Products_fk1` FOREIGN KEY (`extra_ids`) REFERENCES `Extras`(`id`);

ALTER TABLE `Products` ADD CONSTRAINT `Products_fk2` FOREIGN KEY (`type_id`) REFERENCES `Product_types`(`id`);

ALTER TABLE `Orders` ADD CONSTRAINT `Orders_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);

ALTER TABLE `Orders` ADD CONSTRAINT `Orders_fk1` FOREIGN KEY (`product_ids`) REFERENCES `Products`(`id`);

ALTER TABLE `Product_types` ADD CONSTRAINT `Product_types_fk0` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`);
