-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2018 at 05:55 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tm_db1`
--

-- --------------------------------------------------------

--
-- Table structure for table `design_models`
--

CREATE TABLE `design_models` (
  `id` int(11) NOT NULL,
  `texts` varchar(255) DEFAULT NULL,
  `imagesPath` varchar(255) DEFAULT NULL,
  `color` varchar(11) DEFAULT '0',
  `size` varchar(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `extras`
--

CREATE TABLE `extras` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float(11,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `extras`
--

INSERT INTO `extras` (`id`, `name`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 'Fast Shipping', 5.00, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Cotton Cover', 3.00, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Souvenir Cover', 10.00, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_qty` int(11) NOT NULL,
  `product_size` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `subtotal` float(11,2) NOT NULL,
  `tax` float(2,1) NOT NULL,
  `shipping` float(11,2) DEFAULT '0.00',
  `extras_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `product_id`, `product_qty`, `product_size`, `status`, `subtotal`, `tax`, `shipping`, `extras_id`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 1, 2, 2, 1, 40.00, 5.0, 0.00, '[2,3]', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(2, 2, 1, 2, 1, 30.00, 5.0, 0.00, '[1,3]', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(3, 4, 3, 2, 1, 45.00, 5.0, 0.00, '[1,2]', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(4, 5, 5, 6, 1, 100.00, 5.0, 0.00, '[1,2,3]', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(5, 3, 3, 2, 1, 20.00, 5.0, 0.00, '[2,3]', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_statuses`
--

CREATE TABLE `order_statuses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_statuses`
--

INSERT INTO `order_statuses` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Pendding', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Processing', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Deliverd', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `types_id` varchar(255) DEFAULT NULL,
  `qty` bigint(11) NOT NULL DEFAULT '1',
  `minSize` int(11) DEFAULT NULL,
  `maxSize` int(11) DEFAULT NULL,
  `imagePath1` varchar(255) NOT NULL,
  `imagePath2` varchar(255) DEFAULT NULL,
  `imagePath3` varchar(255) DEFAULT NULL,
  `imagePath4` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT '#ffffff',
  `brand` varchar(255) DEFAULT NULL,
  `price` float(11,2) NOT NULL,
  `discount` float(3,0) DEFAULT '0',
  `description` varchar(512) NOT NULL,
  `review` float(3,1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `types_id`, `qty`, `minSize`, `maxSize`, `imagePath1`, `imagePath2`, `imagePath3`, `imagePath4`, `color`, `brand`, `price`, `discount`, `description`, `review`, `createdAt`, `updatedAt`) VALUES
(1, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Anvil Jersey T-shirt', '[2, 3]', 2, 2, 5, '/img/templates/template2.jpg', NULL, NULL, NULL, '#ffffff', NULL, 15.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Gildan Ultra Cotton Long Sleeve T-shirt', '[2, 3]', 2, 2, 3, '/img/templates/template3.jpg', NULL, NULL, NULL, '#ffffff', NULL, 12.00, 5, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Dyenomite 100% Cotton Rainbow Tie-Dye T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template4.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template9.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'Anvil Jersey Tank', '[1]', 2, 1, 6, '/img/templates/template10.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This tank offers either a trendy contrast ringer or a traditional solid option. Super soft fabrication will keep your group on?trend and comfortable all season long!', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'Bella Ladies Flowy Racerback Tankk', '[2, 3]', 2, 2, 5, '/img/templates/template11.jpg', '/img/templates/template12.jpg', '/img/templates/template13.jpg', NULL, '#ffffff', NULL, 20.00, 20, 'Bring on the luxurious flowy fabric and a fashion?forward silhouette in this trendy tank! Perfect for yoga studios, college groups or just a girls night out!', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'Next Level Tri?Blend Baseball Raglan', '[1, 2, 3]', 2, 2, 5, '/img/templates/template14.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This premium raglan was made for comfort and style. With seventeen trendy color combinations, there is a perfect match for every group!', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 1, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 19.99, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(28, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(30, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(31, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(32, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(33, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(34, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(35, 'Gildan Ultra Cotton T-shirt', '[1, 2, 3]', 2, 1, 6, '/img/templates/template1.jpg', NULL, NULL, NULL, '#ffffff', NULL, 20.00, 20, 'This is a nice T-shirt', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, 'Next Level Ladies Tri?Blend Racerback Tank', '[2, 3]', 2, 2, 5, '/img/templates/template7.jpg', '/img/templates/template8.jpg', NULL, NULL, '#ffffff', NULL, 19.99, 20, 'This ultra lightweight tank hits all the right trends: tri?blend, racerback, and a flattering flowy fit. Your group will love this fashionable tank.', 4.5, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `product_types`
--

CREATE TABLE `product_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_types`
--

INSERT INTO `product_types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Trending', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Sport', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Uniform', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `role` int(11) NOT NULL,
  `gender` int(11) NOT NULL,
  `phone_number` bigint(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(512) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `remember_token`, `role`, `gender`, `phone_number`, `country`, `city`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'Huynh', 'An', 'anhuynh@gmail.com', '$2a$08$bLLXt8Qm/h95Tq0u4uOLDujO8Z9333Nht.2eWC65IdKyNhM426Nm2', NULL, 1, 1, 123456789, 'vietnam', 'hcm', '3/2 hcm', '2018-06-03 15:24:16', '2018-06-03 15:24:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `design_models`
--
ALTER TABLE `design_models`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `extras`
--
ALTER TABLE `extras`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `order_statuses`
--
ALTER TABLE `order_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_types`
--
ALTER TABLE `product_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password` (`password`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `design_models`
--
ALTER TABLE `design_models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `extras`
--
ALTER TABLE `extras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order_statuses`
--
ALTER TABLE `order_statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `product_types`
--
ALTER TABLE `product_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `design_models`
--
ALTER TABLE `design_models`
  ADD CONSTRAINT `design_models_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
