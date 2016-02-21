-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2016 at 07:13 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cookedup`
--

-- --------------------------------------------------------

--
-- Table structure for table `ingre_list`
--

CREATE TABLE IF NOT EXISTS `ingre_list` (
  `ingre` varchar(20) NOT NULL,
  PRIMARY KEY (`ingre`),
  KEY `ingre` (`ingre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ingre_list`
--

INSERT INTO `ingre_list` (`ingre`) VALUES
('badam'),
('burger bun'),
('butter'),
('capsicum'),
('cashewnet'),
('cheese'),
('cherries'),
('chicken'),
('choco chips'),
('choco sprinkles'),
('cocoa powder'),
('coriander leaves'),
('curry leaves'),
('dark chocolate'),
('double cream'),
('egg'),
('fig'),
('garlic'),
('green chilli'),
('hazel nut'),
('maida'),
('milk'),
('olives'),
('onion'),
('oregano'),
('parmesan'),
('pepper'),
('pizza base'),
('raisins'),
('red chilli'),
('sugar'),
('tomato'),
('vanilla essence'),
('white chocolate');

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE IF NOT EXISTS `stores` (
  `sto_id` int(5) NOT NULL,
  `ingre` varchar(20) NOT NULL,
  `sto_name` varchar(50) NOT NULL,
  `sto_lat` float(8,6) NOT NULL,
  `sto_long` float(8,6) NOT NULL,
  PRIMARY KEY (`sto_id`,`ingre`),
  KEY `ingre` (`ingre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`sto_id`, `ingre`, `sto_name`, `sto_lat`, `sto_long`) VALUES
(3, 'capsicum', 'Nilgiris', 13.040577, 80.193321),
(3, 'dark chocolate', 'Nilgiris', 13.040577, 80.123322),
(3, 'fig', 'Nilgiris', 13.040577, 80.193321),
(4, 'badam', 'Grace Supermarket', 13.040911, 80.196701),
(4, 'cashewnet', 'Grace Supermarket', 13.040911, 80.196701),
(4, 'hazel nut', 'Grace Supermarket', 13.040911, 80.196701),
(5, 'badam', 'Rouch', 13.040932, 80.199226),
(5, 'fig', 'Rouch', 13.040932, 80.199226),
(6, 'cashewnet', 'Vimala Supermarket', 13.041409, 80.196045),
(6, 'fig', 'Vimala Supermarket', 13.041409, 80.196045),
(11111, 'badam', 'Nuts and Spices', 13.034520, 80.215179),
(11111, 'cashewnet', 'Nuts and Spices', 13.034520, 80.215179),
(11111, 'choco chips', 'Nuts and Spices', 13.034520, 80.215179),
(11111, 'cocoa powder', 'Nuts and Spices', 13.034520, 80.215179),
(11111, 'dark chocolate', 'Nuts and Spices', 13.034520, 80.215179),
(11111, 'hazel nut', 'Nuts and Spices', 13.034520, 80.215179),
(11111, 'oregano', 'Nuts and Spices', 13.034520, 80.215179),
(22222, 'badam', 'Brown Tree', 13.041178, 80.215828),
(22222, 'cashewnet', 'Brown Tree', 13.041178, 80.215828),
(22222, 'choco chips', 'Brown Tree', 13.041178, 80.215828),
(22222, 'dark chocolate', 'Brown Tree', 13.041178, 80.215828),
(22222, 'hazel nut', 'Brown Tree', 13.041178, 80.215828),
(22222, 'raisins', 'Brown Tree', 13.041178, 80.215828);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`ingre`) REFERENCES `ingre_list` (`ingre`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
