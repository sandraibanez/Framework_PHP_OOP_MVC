-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2023 a las 20:08:44
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cohes`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `cart_cantidad` (IN `prod` CHAR(50), IN `users` CHAR(20), IN `id` INT, IN `qtys` INT, OUT `hist_carts3` INT)   BEGIN 
    IF prod= 'update_qty' THEN
    	UPDATE cart SET qty = qtys WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= users ) AND codigo_producto=id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cart_checkout` (IN `prod` CHAR(50), IN `users` CHAR(20), IN `cod_prods` INT, IN `cantidads` INT, IN `total_precios` INT, IN `fechas` DATE, OUT `hist_carts4` INT)   BEGIN 
    IF prod= 'checkout' THEN 
    	INSERT INTO `producto2`( `user`, `cod_prod`, `cantidad`, `precio`, `total_precio`, `fecha`) 
        VALUES ((SELECT  u.id_user FROM users u WHERE u.username= users ), cod_prods, cantidads,(SELECT  c.price FROM car c WHERE 			c.id_car= cod_prods), total_precios, fechas);
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cart_product` (IN `prod` CHAR(50), IN `users` CHAR(20), IN `id` INT, OUT `hist_carts` INT)   BEGIN 
	IF prod = 'select_product'then 
    	SELECT * 
        FROM cart 
        WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= users ) AND codigo_producto= id;
    END IF;
    IF prod = 'insert_product'then 
    	INSERT INTO cart (user, codigo_producto, qty) VALUES ((SELECT  u.id_user FROM users u WHERE u.username= users ),id, '1');
    END IF;
    IF prod= 'update_product' THEN 
    	UPDATE cart SET qty = qty+1 WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= users ) AND codigo_producto= id;
    END IF;
   IF prod='delete_cart' THEN
    	DELETE  FROM cart_hist WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= users ) AND codigo_producto= id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `likes3` (IN `prod` CHAR(20), IN `usuario` CHAR(100), IN `id` INT, OUT `car1` INT)   BEGIN 
if prod = 'select_likes' THEN
	SELECT id_car FROM likes l
	WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = usuario)
	AND l.id_car = id;
END IF;
IF prod = 'like' THEN
	INSERT INTO likes (id_user, id_car) VALUES ((SELECT  u.id_user FROM users u WHERE u.username= usuario ),id);
END IF ;
IF prod= 'dislike' THEN
	DELETE FROM likes WHERE id_car= id AND id_user=(SELECT  u.id_user FROM users u WHERE u.username= usuario);
END IF ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `todos_coches` (OUT `coches` VARCHAR(2550000))   BEGIN 

    SELECT DISTINCT *
    FROM car c, model m
    WHERE c.model = m.id_model  
    ORDER BY c.countcar DESC
    LIMIT 0 OFFSET 3;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `un_coche` (IN `id` INT, OUT `coche` CHAR(255))   BEGIN 

   SELECT *
		FROM car c, model m, type_motor t, category ca
		WHERE c.id_car = id
		AND  c.model = m.id_model 
		AND c.category = ca.id_cat
		AND c.motor = t.cod_tmotor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `un_coche_1` (IN `id` INT, OUT `coche` VARCHAR(255))   BEGIN 

   SELECT *
		FROM car c, model m, type_motor t, category ca
		WHERE c.id_car = id
		AND  c.model = m.id_model 
		AND c.category = ca.id_cat
		AND c.motor = t.cod_tmotor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_cart` (IN `prod` CHAR(50), IN `users` CHAR(20), OUT `hist_carts2` INT)   BEGIN 
	IF prod= 'select_user_cart' then 
    	SELECT c1.user, c1.codigo_producto, c1.qty, c2.img_car, m.name_model, c2.price, b.name_brand,c2.gear_shift
        FROM cart c INNER JOIN cart_hist c1 INNER JOIN car c2 INNER JOIN model m INNER JOIN brand b
        ON c.cod_cart=c1.cod_cart  and c.codigo_producto= c2.id_car and c2.model=m.id_model and m.id_brand=b.name_brand
        WHERE c.codigo_producto AND c.user=(SELECT u.id_user FROM users u WHERE u.username= users );
    END IF;  
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brand`
--

CREATE TABLE `brand` (
  `name_brand` varchar(25) NOT NULL,
  `img_brand` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `brand`
--

INSERT INTO `brand` (`name_brand`, `img_brand`) VALUES
('Audi', 'view/img/brand/audi.png'),
('BMW', 'view/img/brand/bmw.png'),
('Chevrolet', 'view/img/brand/chevrolet.png'),
('Citroen', 'view/img/brand/citroen.png'),
('Dacia', 'view/img/brand/dacia.png'),
('Ferrari', 'view/img/brand/ferrari.png'),
('Fiat', 'view/img/brand/fiat.png'),
('Ford', 'view/img/brand/ford.png'),
('Honda', 'view/img/brand/honda.png'),
('Hyundai', 'view/img/brand/hyundai.png'),
('Infiniti', 'view/img/brand/infiniti.png'),
('Jaguar', 'view/img/brand/jaguar.png'),
('Lamborghini', 'view/img/brand/lamborghini.png'),
('Land Rover', 'view/img/brand/land_rover.png'),
('Lexus', 'view/img/brand/lexus.png'),
('Mazda', 'view/img/brand/mazda.png'),
('Mercedes', 'view/img/brand/mercedes.png'),
('Mini', 'view/img/brand/mini.png'),
('Nissan', 'view/img/brand/nissan.png'),
('Opel', 'view/img/brand/opel.png'),
('Peugot', 'view/img/brand/peugot.png'),
('Porsche', 'view/img/brand/porche.png'),
('Renault', 'view/img/brand/renault.png'),
('Seat', 'view/img/brand/seat.png'),
('Suabru', 'view/img/brand/subaru.png'),
('Suzuki', 'view/img/brand/suzuki.png'),
('Tesla', 'view/img/brand/tesla.png'),
('Volkswagen', 'view/img/brand/volkswage.png'),
('Volvo', 'view/img/brand/volvo.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `car`
--

CREATE TABLE `car` (
  `id_car` int(11) NOT NULL,
  `vin_num` varchar(18) DEFAULT NULL,
  `num_plate` varchar(8) DEFAULT NULL,
  `model` int(25) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `Km` int(8) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `num_doors` varchar(20) DEFAULT NULL,
  `motor` varchar(20) DEFAULT NULL,
  `gear_shift` varchar(20) DEFAULT NULL,
  `matricualtion_date` varchar(10) DEFAULT NULL,
  `price` int(8) DEFAULT NULL,
  `img_car` varchar(300) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `lon` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `countcar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `car`
--

INSERT INTO `car` (`id_car`, `vin_num`, `num_plate`, `model`, `category`, `Km`, `color`, `num_doors`, `motor`, `gear_shift`, `matricualtion_date`, `price`, `img_car`, `lat`, `lon`, `city`, `count`, `countcar`) VALUES
(1, 'ALOEGLSEO34782341', '1393ABC', 1, 3, 1500, 'White', '5', 'A', 'Automatic', '10/01/2015', 15000, 'view/img/cars/car1_1.jpg', '39.4697065', '-0.3763353', 'Valencia', 36, 11),
(2, 'BOOEGLSEO34122342', '2393HJC', 2, 2, 35000, 'Blue', '5', 'G', 'Automatic', '12/05/2017', 40000, 'view/img/cars/car2_1.jpg', '38.8220593', '-0.6063927', 'Ontinyent', 0, 169),
(3, 'CEOEGLSEO34742343', '3393NRO', 3, 5, 42000, 'Red', '3', 'E', 'Automatic', '23/07/2016', 22678, 'view/img/cars/car3_1.jpg', '40.2518568', '-0.0615051', 'Castellón', 0, 5),
(4, 'SUSEGLSEO12782344', '4393LOL', 4, 6, 1, 'White', '5', 'A', 'Automatic', '09/08/2019', 11230, 'view/img/cars/car4_1.jpg', '40.4167047', '-3.7035825', 'Madrid', 2, 7),
(5, 'ZLOEGLSEO34782345', '5393ARA', 5, 1, 5500, 'Grey', '5', 'H', 'Automatic', '21/11/2020', 55000, 'view/img/cars/car5_1.jpg', '37.9923795', '-1.1305431', 'Murcia', 1, 5),
(6, 'NLOEGLSEO54782347', '7393YAC', 7, 3, 3100, 'White', '5', 'G', 'Automatic', '14/12/2015', 32000, 'view/img/cars/car6_1.jpg', '41.1172364', '1.2546057', 'Tarragona', 0, 43),
(7, 'SOOEGLSEO34712348', '8393JBL', 8, 2, 27879, 'Black', '5', 'H', 'Automatic', '19/10/2016', 80000, 'view/img/cars/car7_1.jpg', '38.9950921', '-1.8559154', 'Albacete', 1, 8),
(8, 'HTOEGLSEO34782349', '9393SOS', 9, 1, 32765, 'Grey', '3', 'G', 'Automatic', '05/07/2020', 21000, 'view/img/cars/car8_1.jpg', '41.6521342', '-0.8809428', 'Zaragoza', 0, 493),
(9, 'RMAEGLSEO34782340', '0393CAR', 10, 6, 1, 'White', '5', 'H', 'Automatic', '30/09/2019', 35000, 'view/img/cars/car9_1.jpg', '42.343926', '-3.696977', 'Burgos', 1, 2),
(10, 'JKLEGLSEO34782341', '1093ABC', 6, 3, 1500, 'Blue', '5', 'A', 'Manual', '10/01/2015', 17000, 'view/img/cars/car10_1.jpg', '43.1595664', '-4.0878382', 'Cantabria', 0, 2),
(11, 'POLEGLSEO34122342', '1193HJC', 11, 2, 35000, 'Orange', '5', 'G', 'Manual', '12/05/2017', 40000, 'view/img/cars/car11_1.jpg', '42.8804219', '-8.5458608', 'Santiago', 0, 18),
(12, 'RTYEGLSEO34742343', '1293NRO', 12, 5, 42000, 'Grey', '3', 'E', 'Manual', '23/07/2016', 7678, 'view/img/cars/car12_1.jpg', '37.6019353', '-0.9841152', 'Cartagena', 0, 2),
(13, 'ILWEGLSEO12782344', '1393LOL', 13, 6, 1, 'Red', '5', 'A', 'Automatic', '09/08/2019', 11230, 'view/img/cars/car13_1.jpg', '37.8845813', '-4.7760138', 'Cordoba', 3, 9),
(14, 'PLNEGLSEO34782345', '1493ARA', 14, 1, 5500, 'White', '5', 'H', 'Automatic', '21/11/2020', 55000, 'view/img/cars/car14_1.jpg', '39.1748426', '-6.1529891', 'Extremadura', 0, 3),
(15, 'RTVEGLSEO54782347', '1593YAC', 15, 3, 3000, 'Brown', '5', 'E', 'Automatic', '14/12/2015', 32000, 'view/img/cars/car15_1.jpg', '42.2814642', '-2.482805', 'La Rioja', 0, 2),
(16, 'VEFEGLSEO34712348', '1693JBL', 16, 2, 27879, 'White', '5', 'H', 'Manual', '19/10/2016', 34000, 'view/img/cars/car16_1.jpg', '41.6521328', '-4.728562', 'Valladolid', 0, 3),
(17, 'COCEGLSEO34782349', '1793SOS', 17, 1, 32765, 'Orange', '3', 'G', 'Manual', '05/07/2020', 21000, 'view/img/cars/car17_1.jpg', '43.2630018', '-2.9350039', 'Bilbao', 0, 9),
(18, 'BVCEGLSEO34782340', '1893CAR', 18, 6, 1, 'Blue', '5', 'H', 'Automatic', '30/09/2019', 13040, 'view/img/cars/car18_1.jpg', '40.9651572', '-5.6640182', 'Salamanca', 5, 63),
(19, 'NTCEGLSEO34782349', '1993SOS', 19, 1, 32765, 'Brown', '3', 'G', 'Manual', '05/07/2020', 17500, 'view/img/cars/car19_1.jpg', '38.7669181', '-0.610892', 'Bocairent', 2, 9),
(20, 'KOPEGLSEO34782349', '2093SOS', 20, 1, 32765, 'Black', '3', 'G', 'Automatic', '05/07/2020', 16000, 'view/img/cars/car20_1.jpg', '39.4639546', '-0.4293866', 'Xirivella', 0, 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `car2`
--

CREATE TABLE `car2` (
  `id_car` int(11) NOT NULL,
  `vin_num` varchar(18) DEFAULT NULL,
  `num_plate` varchar(8) DEFAULT NULL,
  `model` int(25) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `Km` int(8) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `num_doors` varchar(20) DEFAULT NULL,
  `motor` varchar(20) DEFAULT NULL,
  `gear_shift` varchar(20) DEFAULT NULL,
  `matricualtion_date` varchar(10) DEFAULT NULL,
  `price` int(8) DEFAULT NULL,
  `img_car` varchar(300) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `lon` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `countcar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `car2`
--

INSERT INTO `car2` (`id_car`, `vin_num`, `num_plate`, `model`, `category`, `Km`, `color`, `num_doors`, `motor`, `gear_shift`, `matricualtion_date`, `price`, `img_car`, `lat`, `lon`, `city`, `count`, `countcar`) VALUES
(1, 'ALOEGLSEO34782341', '1393ABC', 1, 3, 1500, 'White', '5', 'A', 'Automatic', '10/01/2015', 15000, 'views/img/cars/car1_1.jpg', '39.4697065', '-0.3763353', 'Valencia', 36, 1),
(2, 'BOOEGLSEO34122342', '2393HJC', 2, 2, 35000, 'Blue', '5', 'G', 'Automatic', '12/05/2017', 40000, 'views/img/cars/car2_1.jpg', '38.8220593', '-0.6063927', 'Ontinyent', 0, 0),
(3, 'CEOEGLSEO34742343', '3393NRO', 3, 5, 42000, 'Red', '3', 'E', 'Automatic', '23/07/2016', 22678, 'views/img/cars/car3_1.jpg', '40.2518568', '-0.0615051', 'Castellón', 0, 0),
(4, 'SUSEGLSEO12782344', '4393LOL', 4, 6, 1, 'White', '5', 'A', 'Automatic', '09/08/2019', 11230, 'views/img/cars/car4_1.jpg', '40.4167047', '-3.7035825', 'Madrid', 2, 0),
(5, 'ZLOEGLSEO34782345', '5393ARA', 5, 1, 5500, 'Grey', '5', 'H', 'Automatic', '21/11/2020', 55000, 'views/img/cars/car5_1.jpg', '37.9923795', '-1.1305431', 'Murcia', 1, 0),
(6, 'NLOEGLSEO54782347', '7393YAC', 7, 3, 3100, 'White', '5', 'G', 'Automatic', '14/12/2015', 32000, 'views/img/cars/car6_1.jpg', '41.1172364', '1.2546057', 'Tarragona', 0, 0),
(7, 'SOOEGLSEO34712348', '8393JBL', 8, 2, 27879, 'Black', '5', 'H', 'Automatic', '19/10/2016', 80000, 'views/img/cars/car7_1.jpg', '38.9950921', '-1.8559154', 'Albacete', 1, 0),
(8, 'HTOEGLSEO34782349', '9393SOS', 9, 1, 32765, 'Grey', '3', 'G', 'Automatic', '05/07/2020', 21000, 'views/img/cars/car8_1.jpg', '41.6521342', '-0.8809428', 'Zaragoza', 0, 0),
(9, 'RMAEGLSEO34782340', '0393CAR', 10, 6, 1, 'White', '5', 'H', 'Automatic', '30/09/2019', 35000, 'views/img/cars/car9_1.jpg', '42.343926', '-3.696977', 'Burgos', 1, 0),
(10, 'JKLEGLSEO34782341', '1093ABC', 6, 3, 1500, 'Blue', '5', 'A', 'Manual', '10/01/2015', 17000, 'views/img/cars/car10_1.jpg', '43.1595664', '-4.0878382', 'Cantabria', 0, 0),
(11, 'POLEGLSEO34122342', '1193HJC', 11, 2, 35000, 'Orange', '5', 'G', 'Manual', '12/05/2017', 40000, 'views/img/cars/car11_1.jpg', '42.8804219', '-8.5458608', 'Santiago', 0, NULL),
(12, 'RTYEGLSEO34742343', '1293NRO', 12, 5, 42000, 'Grey', '3', 'E', 'Manual', '23/07/2016', 7678, 'views/img/cars/car12_1.jpg', '37.6019353', '-0.9841152', 'Cartagena', 0, NULL),
(13, 'ILWEGLSEO12782344', '1393LOL', 13, 6, 1, 'Red', '5', 'A', 'Automatic', '09/08/2019', 11230, 'views/img/cars/car13_1.jpg', '37.8845813', '-4.7760138', 'Cordoba', 3, NULL),
(14, 'PLNEGLSEO34782345', '1493ARA', 14, 1, 5500, 'White', '5', 'H', 'Automatic', '21/11/2020', 55000, 'views/img/cars/car14_1.jpg', '39.1748426', '-6.1529891', 'Extremadura', 0, NULL),
(15, 'RTVEGLSEO54782347', '1593YAC', 15, 3, 3000, 'Brown', '5', 'E', 'Automatic', '14/12/2015', 32000, 'views/img/cars/car15_1.jpg', '42.2814642', '-2.482805', 'La Rioja', 0, NULL),
(16, 'VEFEGLSEO34712348', '1693JBL', 16, 2, 27879, 'White', '5', 'H', 'Manual', '19/10/2016', 34000, 'views/img/cars/car16_1.jpg', '41.6521328', '-4.728562', 'Valladolid', 0, NULL),
(17, 'COCEGLSEO34782349', '1793SOS', 17, 1, 32765, 'Orange', '3', 'G', 'Manual', '05/07/2020', 21000, 'views/img/cars/car17_1.jpg', '43.2630018', '-2.9350039', 'Bilbao', 0, NULL),
(18, 'BVCEGLSEO34782340', '1893CAR', 18, 6, 1, 'Blue', '5', 'H', 'Automatic', '30/09/2019', 13040, 'views/img/cars/car18_1.jpg', '40.9651572', '-5.6640182', 'Salamanca', 5, NULL),
(19, 'NTCEGLSEO34782349', '1993SOS', 19, 1, 32765, 'Brown', '3', 'G', 'Manual', '05/07/2020', 17500, 'views/img/cars/car19_1.jpg', '38.7669181', '-0.610892', 'Bocairent', 2, NULL),
(20, 'KOPEGLSEO34782349', '2093SOS', 20, 1, 32765, 'Black', '3', 'G', 'Automatic', '05/07/2020', 16000, 'views/img/cars/car20_1.jpg', '39.4639546', '-0.4293866', 'Xirivella', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `user` int(11) NOT NULL,
  `codigo_producto` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `cod_cart` int(11) NOT NULL,
  `qty_max` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cart`
--

INSERT INTO `cart` (`user`, `codigo_producto`, `qty`, `cod_cart`, `qty_max`) VALUES
(46, 8, 2, 112, 1);

--
-- Disparadores `cart`
--
DELIMITER $$
CREATE TRIGGER `hist_AI` AFTER INSERT ON `cart` FOR EACH ROW INSERT INTO cart_hist (user,	codigo_producto,	qty,	cod_cart, qty_max)
VALUE (new.user, new.codigo_producto, new.qty, new.cod_cart, new.qty_max)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hist_AU` AFTER UPDATE ON `cart` FOR EACH ROW UPDATE cart_hist
SET qty = new.qty
WHERE cod_cart=old.cod_cart
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `qty_max_BI` BEFORE INSERT ON `cart` FOR EACH ROW BEGIN
IF new.qty_max ='' or  new.qty_max IS null THEN
SET new.qty_max = (SELECT COUNT(*)
                FROM car c2 INNER JOIN car c3 on c2.id_car = c3.id_car
                WHERE c2.id_car = new.codigo_producto and c3.vin_num = c2.vin_num);
END IF ;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart2`
--

CREATE TABLE `cart2` (
  `user` int(11) NOT NULL,
  `codigo_producto` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `cod_cart` int(11) NOT NULL DEFAULT 0,
  `qty_max` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cart2`
--

INSERT INTO `cart2` (`user`, `codigo_producto`, `qty`, `cod_cart`, `qty_max`) VALUES
(46, 8, 3, 99, 1),
(46, 2, 8, 100, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_hist`
--

CREATE TABLE `cart_hist` (
  `user` int(11) DEFAULT NULL,
  `codigo_producto` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `cod_cart` int(11) DEFAULT NULL,
  `qty_max` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cart_hist`
--

INSERT INTO `cart_hist` (`user`, `codigo_producto`, `qty`, `cod_cart`, `qty_max`) VALUES
(46, 8, 2, 112, 1);

--
-- Disparadores `cart_hist`
--
DELIMITER $$
CREATE TRIGGER `hist_AD` AFTER DELETE ON `cart_hist` FOR EACH ROW DELETE 
FROM cart 
WHERE user= old.user AND codigo_producto= old.codigo_producto
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id_cat` int(11) NOT NULL,
  `name_cat` varchar(25) NOT NULL,
  `img_cat` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id_cat`, `name_cat`, `img_cat`) VALUES
(1, 'Km0', 'view/img/categories/km0.jpg'),
(2, 'Second Hand', 'view/img/categories/second_hand.jpg'),
(3, 'Renting', 'view/img/categories/renting.jpg'),
(4, 'Pre-Owned', 'view/img/categories/pre_ownded.jpeg'),
(5, 'Offer', 'view/img/categories/offer.jpg'),
(6, 'New', 'view/img/categories/new.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img_cars`
--

CREATE TABLE `img_cars` (
  `id_img` int(11) NOT NULL,
  `id_car` int(11) DEFAULT NULL,
  `img_cars` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `img_cars`
--

INSERT INTO `img_cars` (`id_img`, `id_car`, `img_cars`) VALUES
(1, 1, 'view/img/cars/car1_1.jpg'),
(2, 1, 'view/img/cars/car1_2.jpg'),
(3, 1, 'view/img/cars/car1_3.jpg'),
(4, 1, 'view/img/cars/car1_4.jpg'),
(5, 2, 'view/img/cars/car2_1.jpg'),
(6, 2, 'view/img/cars/car2_2.jpg'),
(7, 2, 'view/img/cars/car2_3.jpg'),
(8, 2, 'view/img/cars/car2_4.jpg'),
(9, 3, 'view/img/cars/car3_1.jpg'),
(10, 3, 'views/img/cars/car3_2.jpg'),
(11, 3, 'view/img/cars/car3_3.jpg'),
(12, 3, 'view/img/cars/car3_4.jpg'),
(13, 4, 'view/img/cars/car4_1.jpg'),
(14, 4, 'view/img/cars/car4_2.jpg'),
(15, 4, 'view/img/cars/car4_3.jpg'),
(16, 4, 'view/img/cars/car4_4.jpg'),
(17, 5, 'view/img/cars/car5_1.jpg'),
(18, 5, 'view/img/cars/car5_2.jpg'),
(19, 5, 'view/img/cars/car5_3.jpg'),
(20, 5, 'view/img/cars/car5_4.jpg'),
(21, 6, 'view/img/cars/car6_1.jpg'),
(22, 6, 'view/img/cars/car6_2.jpg'),
(23, 6, 'view/img/cars/car6_3.jpg'),
(24, 6, 'view/img/cars/car6_4.jpg'),
(25, 7, 'view/img/cars/car7_1.jpg'),
(26, 7, 'view/img/cars/car7_2.jpg'),
(27, 7, 'view/img/cars/car7_3.jpg'),
(28, 7, 'view/img/cars/car7_4.jpg'),
(29, 8, 'view/img/cars/car8_1.jpg'),
(30, 8, 'view/img/cars/car8_2.jpg'),
(31, 8, 'view/img/cars/car8_3.jpg'),
(32, 8, 'view/img/cars/car8_4.jpg'),
(33, 9, 'view/img/cars/car9_1.jpg'),
(34, 9, 'view/img/cars/car9_2.jpg'),
(35, 9, 'view/img/cars/car9_3.jpg'),
(36, 9, 'view/img/cars/car9_4.jpg'),
(37, 10, 'view/img/cars/car10_1.jpg'),
(38, 10, 'view/img/cars/car10_2.jpg'),
(39, 10, 'view/img/cars/car10_3.jpg'),
(40, 10, 'view/img/cars/car10_4.jpg'),
(41, 11, 'view/img/cars/car11_1.jpg'),
(42, 11, 'view/img/cars/car11_2.jpg'),
(43, 11, 'view/img/cars/car11_3.jpg'),
(44, 11, 'view/img/cars/car11_4.jpg'),
(45, 12, 'view/img/cars/car12_1.jpg'),
(46, 12, 'view/img/cars/car12_2.jpg'),
(47, 12, 'view/img/cars/car12_3.jpg'),
(48, 12, 'view/img/cars/car12_4.jpg'),
(49, 13, 'view/img/cars/car13_1.jpg'),
(50, 13, 'view/img/cars/car13_2.jpg'),
(51, 13, 'view/img/cars/car13_3.jpg'),
(52, 13, 'view/img/cars/car13_4.jpg'),
(53, 14, 'view/img/cars/car14_1.jpg'),
(54, 14, 'view/img/cars/car14_2.jpg'),
(55, 14, 'view/img/cars/car14_3.jpg'),
(56, 14, 'view/img/cars/car14_4.jpg'),
(57, 15, 'view/img/cars/car15_1.jpg'),
(58, 15, 'view/img/cars/car15_2.jpg'),
(59, 15, 'view/img/cars/car15_3.jpg'),
(60, 15, 'view/img/cars/car15_4.jpg'),
(61, 16, 'view/img/cars/car16_1.jpg'),
(62, 16, 'view/img/cars/car16_2.jpg'),
(63, 16, 'view/img/cars/car16_3.jpg'),
(64, 16, 'view/img/cars/car16_4.jpg'),
(65, 17, 'view/img/cars/car17_1.jpg'),
(66, 17, 'view/img/cars/car17_2.jpg'),
(67, 17, 'view/img/cars/car17_3.jpg'),
(69, 18, 'view/img/cars/car18_1.jpg'),
(70, 18, 'view/img/cars/car18_2.jpg'),
(71, 18, 'view/img/cars/car18_3.jpg'),
(72, 18, 'view/img/cars/car18_4.jpg'),
(73, 19, 'view/img/cars/car19_1.jpg'),
(74, 19, 'view/img/cars/car19_2.jpg'),
(75, 19, 'view/img/cars/car19_3.jpg'),
(76, 19, 'view/img/cars/car19_4.jpg'),
(77, 20, 'view/img/cars/car20_1.jpg'),
(78, 20, 'view/img/cars/car20_2.jpg'),
(79, 20, 'view/img/cars/car20_3.jpg'),
(80, 20, 'view/img/cars/car20_4.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id_like` int(11) NOT NULL,
  `id_user` int(30) NOT NULL,
  `id_car` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id_like`, `id_user`, `id_car`) VALUES
(81, 14, 19),
(84, 14, 18),
(87, 14, 8),
(88, 14, 1),
(200, 46, 15),
(202, 49, 15),
(206, 49, 15),
(233, 56, 20),
(235, 51, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model`
--

CREATE TABLE `model` (
  `id_model` int(20) NOT NULL,
  `name_model` varchar(25) DEFAULT NULL,
  `id_brand` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `model`
--

INSERT INTO `model` (`id_model`, `name_model`, `id_brand`) VALUES
(1, 'A1', 'Audi'),
(2, 'Q5', 'Audi'),
(3, 'TT', 'Audi'),
(4, 'A3', 'Audi'),
(5, 'A7', 'Audi'),
(6, 'Serie3', 'BMW'),
(7, 'x5', 'BMW'),
(8, 'x6', 'BMW'),
(9, 'Clase A', 'Mercedes'),
(10, 'Clase C', 'Mercedes'),
(11, 'Clase G', 'Mercedes'),
(12, 'GLE', 'Mercedes'),
(13, 'Leon', 'Seat'),
(14, 'Ibiza', 'Seat'),
(15, 'Tucson', 'Hyundai'),
(16, 'i30', 'Hyundai'),
(17, 'Ranger', 'Ford'),
(18, 'Focus', 'Ford'),
(19, 'Cooper', 'Mini'),
(20, 'Vitara', 'Suzuki');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto2`
--

CREATE TABLE `producto2` (
  `cod_ped` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `cod_prod` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` int(8) DEFAULT NULL,
  `total_precio` int(8) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto2`
--

INSERT INTO `producto2` (`cod_ped`, `user`, `cod_prod`, `cantidad`, `precio`, `total_precio`, `fecha`) VALUES
(49, 46, 8, 9, 21000, 189000, '2023-04-25 00:00:00'),
(50, 46, 8, 1, 21000, 21000, '2023-04-25 00:00:00'),
(51, 46, 8, 4, 21000, 84000, '2023-04-25 00:00:00'),
(52, 46, 2, 1, 40000, 40000, '2023-04-26 00:00:00'),
(53, 49, 8, 2, 21000, 42000, '2023-04-26 00:00:00'),
(54, 49, 8, 1, 21000, 21000, '2023-04-26 00:00:00'),
(55, 49, 2, 1, 40000, 40000, '2023-04-26 00:00:00'),
(56, 49, 18, 1, 13040, 13040, '2023-04-26 00:00:00'),
(57, 56, 2, 3, 40000, 120000, '2023-04-26 00:00:00'),
(58, 56, 8, 1, 21000, 21000, '2023-04-26 00:00:00'),
(59, 46, 2, 1, 40000, 40000, '2023-04-26 00:00:00'),
(60, 46, 8, 2, 21000, 42000, '2023-04-26 00:00:00'),
(61, 46, 2, 2, 40000, 80000, '2023-04-26 00:00:00');

--
-- Disparadores `producto2`
--
DELIMITER $$
CREATE TRIGGER `hist_prod_AI` AFTER INSERT ON `producto2` FOR EACH ROW INSERT INTO producto_hist (user, cod_prod, cantidad, precio, total_precio, fecha, cod_ped) VALUE (new.user, new.cod_prod, new.cantidad, new.precio, new.total_precio, now(), new.cod_ped)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hist_prod_BI` BEFORE INSERT ON `producto2` FOR EACH ROW BEGIN
	DECLARE total FLOAT;
	IF new.total_precio = 0 THEN
		SET total = new.precio * new.cantidad;
	ELSE
		SET total = new.total_precio;
	END IF;

	SET new.total_precio = total;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_hist`
--

CREATE TABLE `producto_hist` (
  `cod_ped` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `cod_prod` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `total_precio` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_hist`
--

INSERT INTO `producto_hist` (`cod_ped`, `user`, `cod_prod`, `cantidad`, `precio`, `total_precio`, `fecha`) VALUES
(49, 46, 8, 9, 21000, 189000, '2023-04-25 13:23:33'),
(50, 46, 8, 1, 21000, 21000, '2023-04-25 18:26:40'),
(51, 46, 8, 4, 21000, 84000, '2023-04-25 18:28:25'),
(52, 46, 2, 1, 40000, 40000, '2023-04-26 10:34:21'),
(53, 49, 8, 2, 21000, 42000, '2023-04-26 10:47:47'),
(54, 49, 8, 1, 21000, 21000, '2023-04-26 10:59:36'),
(55, 49, 2, 1, 40000, 40000, '2023-04-26 10:59:36'),
(56, 49, 18, 1, 13040, 13040, '2023-04-26 10:59:36'),
(57, 56, 2, 3, 40000, 120000, '2023-04-26 11:33:15'),
(58, 56, 8, 1, 21000, 21000, '2023-04-26 11:34:20'),
(59, 46, 2, 1, 40000, 40000, '2023-04-26 17:46:23'),
(60, 46, 8, 2, 21000, 42000, '2023-04-26 18:33:27'),
(61, 46, 2, 2, 40000, 80000, '2023-04-26 19:13:17');

--
-- Disparadores `producto_hist`
--
DELIMITER $$
CREATE TRIGGER `delete_cart_hist` BEFORE INSERT ON `producto_hist` FOR EACH ROW BEGIN
    DELETE 
    FROM cart_hist
    WHERE user = NEW.user AND codigo_producto = NEW.cod_prod AND qty = NEW.cantidad;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hist_prod_BU` BEFORE UPDATE ON `producto_hist` FOR EACH ROW UPDATE producto_hist
SET total_precio = old.precio * old.cantidad
WHERE cod_ped=old.cod_ped
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_motor`
--

CREATE TABLE `type_motor` (
  `cod_tmotor` varchar(10) NOT NULL,
  `name_tmotor` varchar(25) NOT NULL,
  `img_tmotor` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type_motor`
--

INSERT INTO `type_motor` (`cod_tmotor`, `name_tmotor`, `img_tmotor`) VALUES
('A', 'Adapted', 'view/img/type_cars/adapted.jpg'),
('E', 'Electric', 'view/img/type_cars/electric.jpg'),
('G', 'Gasoline', 'view/img/type_cars/gasoline.jpg'),
('H', 'Hybrid', 'view/img/type_cars/hibrid.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(30) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `email`, `type_user`, `avatar`) VALUES
(14, 'Vicent29', '$2y$12$qjen7QF.pQ4S6CLAR/WzuuuI1uvhSTpnK.lpNnaq0VUsX0EKKRXQi', 'vicentesteve2002@gmail.com', 'admin', 'https://robohash.org/bcad65cbb7e72b2c3eb99b8f4a4d41ee'),
(31, 'Carlos29', '$2y$12$DUmul1bagMdxtsqur.jNK.u01rZ.sKC3nBfs58PmUwgBZm.pxV.Wi', 'carlos@gmail.com', 'client', 'https://robohash.org/db1e0a3750e0399df3eeee808187d9b4'),
(38, 'Carla29 ', '$2y$12$ArMAmb7UPHEbzxo9so1BWOSjCzgBhqL0TtgzZJgmmy42q7UuJi4LO', 'carla@gmail.com', 'client', 'https://i.pravatar.cc/400?u=62779a64d5b24b7fd3d5026977b7a87a'),
(39, 'Juan29', '$2y$12$dbwGopIYSRfpSu5qRkF.3uLq1kQUxSMmVbjUBSdJqGjJOr.hhaxfi', 'juan@gmail.com', 'client', 'https://i.pravatar.cc/500?u=7038663cc684aa330956752c7e6fe7d4'),
(45, 'usuario32', '$2y$12$zrV0V5tM0Qejf41t9r4LOu7oNnYY5ULEfdrUqKg5.mAIGkDoANd7e', 'usuario2912@gmail.com', 'client', ' https://i.pravatar.cc/500?u=08ebc0ebfc11fb0d0f16bf1994e4c515'),
(46, 'usuario3', '$2y$12$MZE0RHSYgHxaVnEyPr9t8uH8vQu4dW1ydx6HYdM7sF.G5aP3lvMWm', 'usuario3@gmail.com', 'client', ' https://i.pravatar.cc/500?u=ebd4046c0fa2a2ebdb6773311bce5ef1'),
(48, 'usuario4', '$2y$12$lcu4dPFLsLlGLvh2P38JS.fSBHlakmIwD3lVB.ZSeOxrxiFkmErSa', 'soler@gmail.com', 'client', ' https://i.pravatar.cc/500?u=af30880fee36a1c5e0e601bb77e53f50'),
(49, 'usuario', '$2y$12$XripbVS42xGa.3z2qLDN6.sybt.2TRa21lkdli.8V.k5561gyBVAW', 'usuario@gmail.com', 'client', ' https://i.pravatar.cc/500?u=926e57bdcca18a1cffcf9d80651893dc'),
(51, 'usuario21', '$2y$12$BBUeoEc7qt4NscSYUYsNDe6ynNCdCP/dNXAi//CutcLbrosOZjKGO', 'usuario21@gmail.com', 'client', ' https://i.pravatar.cc/500?u=c852a667df6e3f4d6d293e136d0f0d1e'),
(53, 'usuario2', '$2y$12$JE6VbimRwl3ussgLofOv/uVVYWX/lWYqeHDrVU.TD2YRrro.Gm1IO', 'usuario90@gmail.com', 'client', ' https://i.pravatar.cc/500?u=50391de22d31cc76e8174a264eb9a16c'),
(54, 'usuario212', '$2y$12$1P7mXlt8avzcaFIgRDmXXejLtURIHArAKGi6lxcDLPHrDFdcIz9AC', 'usuario22@gmail.com', 'client', ' https://i.pravatar.cc/500?u=1b3bd32ec027b752160fc4e26ebf7dc5'),
(55, 'Rooot', '$2y$12$q9hCUtOgeL.S1ERTDqXa8OxBEuhduBCUbVjNWgMpT9IJwTGz55.0m', 'root@gmail.com', 'client', ' https://i.pravatar.cc/500?u=c2525a7f58ae3776070e44c106c48e15'),
(56, 'usuario2121', '$2y$12$EuLnxNDee/wTIWBnx.iyaeCrMwo2FZ2iDN/LX07zqw3oB26USAdHu', 'usuario91@gmail.com', 'client', ' https://i.pravatar.cc/500?u=ee675c195ca1afb10c82e03d65c9bbe4');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`name_brand`);

--
-- Indices de la tabla `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id_car`),
  ADD UNIQUE KEY `vin_num` (`vin_num`),
  ADD UNIQUE KEY `num_plate` (`num_plate`),
  ADD KEY `model` (`model`),
  ADD KEY `category` (`category`),
  ADD KEY `car_ibfk_3` (`motor`);

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cod_cart`);

--
-- Indices de la tabla `cart_hist`
--
ALTER TABLE `cart_hist`
  ADD KEY `cod_cart` (`cod_cart`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_cat`) USING BTREE;

--
-- Indices de la tabla `img_cars`
--
ALTER TABLE `img_cars`
  ADD PRIMARY KEY (`id_img`),
  ADD KEY `id_car` (`id_car`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_like`),
  ADD KEY `id_car` (`id_car`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id_model`);

--
-- Indices de la tabla `producto2`
--
ALTER TABLE `producto2`
  ADD PRIMARY KEY (`cod_ped`);

--
-- Indices de la tabla `type_motor`
--
ALTER TABLE `type_motor`
  ADD PRIMARY KEY (`cod_tmotor`) USING BTREE;

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `cod_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=275;

--
-- AUTO_INCREMENT de la tabla `producto2`
--
ALTER TABLE `producto2`
  MODIFY `cod_ped` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `car_ibfk_3` FOREIGN KEY (`motor`) REFERENCES `type_motor` (`cod_tmotor`);

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cochessss` FOREIGN KEY (`codigo_producto`) REFERENCES `car` (`id_car`);

--
-- Filtros para la tabla `cart_hist`
--
ALTER TABLE `cart_hist`
  ADD CONSTRAINT `cart_hist_ibfk_1` FOREIGN KEY (`cod_cart`) REFERENCES `cart` (`cod_cart`);

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_car`) REFERENCES `car` (`id_car`),
  ADD CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- =====================================================================================================
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cart_cantidad`(in prod char(50),IN users char(20), IN id int, in qtys int, out hist_carts3 int)
BEGIN 
    IF prod= 'update_qty' THEN
    	UPDATE cart SET qty = qtys WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= users ) AND codigo_producto=id;
    END IF;
END$$
DELIMITER ;

-- ====================================================================
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cart_checkout`(in prod char(50),IN users char(20),in cod_prods int, in cantidads int,in total_precios int, in fechas date, out hist_carts4 int)
BEGIN 
    IF prod= 'checkout' THEN 
    	INSERT INTO `producto2`( `user`, `cod_prod`, `cantidad`, `precio`, `total_precio`, `fecha`) 
        VALUES ((SELECT  u.id_user FROM users u WHERE u.username= users ), cod_prods, cantidads,(SELECT  c.price FROM car c WHERE 			c.id_car= cod_prods), total_precios, fechas);
    END IF;
END$$
DELIMITER ;
-- ===================================================================
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cart_product`(in prod char(50),IN users char(20), IN id int, out hist_carts int)
BEGIN 
	IF prod = 'select_product'then 
    	SELECT * 
        FROM cart 
        WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= users ) AND codigo_producto= id;
    END IF;
    IF prod = 'insert_product'then 
    	INSERT INTO cart (user, codigo_producto, qty) VALUES ((SELECT  u.id_user FROM users u WHERE u.username= users ),id, '1');
    END IF;
    IF prod= 'update_product' THEN 
    	UPDATE cart SET qty = qty+1 WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= users ) AND codigo_producto= id;
    END IF;
   IF prod='delete_cart' THEN
    	DELETE  FROM cart_hist WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= users ) AND codigo_producto= id;
    END IF;
END$$
DELIMITER ;
-- ==================================================================
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `likes3`(IN prod char(20),  in usuario char(100),in id int, OUT car1 int)
BEGIN 
if prod = 'select_likes' THEN
	SELECT id_car FROM likes l
	WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = usuario)
	AND l.id_car = id;
END IF;
IF prod = 'like' THEN
	INSERT INTO likes (id_user, id_car) VALUES ((SELECT  u.id_user FROM users u WHERE u.username= usuario ),id);
END IF ;
IF prod= 'dislike' THEN
	DELETE FROM likes WHERE id_car= id AND id_user=(SELECT  u.id_user FROM users u WHERE u.username= usuario);
END IF ;
END$$
DELIMITER ;
-- =============================================================================================================
-- =============================================================================================================
-- =============================================================================================================

tabla de cart:

CREATE TRIGGER `hist_AI` AFTER INSERT ON `cart`
 FOR EACH ROW INSERT INTO cart_hist (user,	codigo_producto,	qty,	cod_cart)
VALUE (new.user, new.codigo_producto, new.qty, new.cod_cart)

-- ====================================================================
CREATE TRIGGER `hist_AU` AFTER UPDATE ON `cart`
 FOR EACH ROW UPDATE cart_hist
SET qty = new.qty
WHERE cod_cart=old.cod_cart
-- ===================================================================
CREATE TRIGGER `qty_max_BI` BEFORE INSERT ON `cart`
 FOR EACH ROW BEGIN
IF new.qty_max ='' or  new.qty_max IS null THEN
SET new.qty_max = (SELECT COUNT(*)
                FROM car c2 INNER JOIN car c3 on c2.id_car = c3.id_car
                WHERE c2.id_car = new.codigo_producto and c3.vin_num = c2.vin_num);
END IF ;
END

-- ====================================================================
-- ====================================================================
tabla cart_hist:

CREATE TRIGGER `hist_AD` AFTER DELETE ON `cart_hist`
 FOR EACH ROW DELETE 
FROM cart 
WHERE user= old.user AND codigo_producto= old.codigo_producto

-- ====================================================================
-- ====================================================================
tabla producto2:

CREATE TRIGGER `hist_prod_AI` AFTER INSERT ON `producto2`
 FOR EACH ROW INSERT INTO producto_hist (user, cod_prod, cantidad, precio, total_precio, fecha, cod_ped) VALUE (new.user, new.cod_prod, new.cantidad, new.precio, new.total_precio, now(), new.cod_ped)

-- =====================================================================
CREATE TRIGGER `hist_prod_BI` BEFORE INSERT ON `producto2`
 FOR EACH ROW BEGIN
	DECLARE total FLOAT;
	IF new.total_precio = 0 THEN
		SET total = new.precio * new.cantidad;
	ELSE
		SET total = new.total_precio;
	END IF;

	SET new.total_precio = total;
END

-- ====================================================================
-- ====================================================================




tabla producto_hist:

CREATE TRIGGER `delete_cart_hist` BEFORE INSERT ON `producto_hist`
 FOR EACH ROW BEGIN
    DELETE 
    FROM cart_hist
    WHERE user = NEW.user AND codigo_producto = NEW.cod_prod AND qty = NEW.cantidad;
END
-- =====================================================================
CREATE TRIGGER `hist_prod_BU` BEFORE UPDATE ON `producto_hist`
 FOR EACH ROW UPDATE producto_hist
SET total_precio = old.precio * old.cantidad
WHERE cod_ped=old.cod_ped
-- =====================================================================
-- =====================================================================
