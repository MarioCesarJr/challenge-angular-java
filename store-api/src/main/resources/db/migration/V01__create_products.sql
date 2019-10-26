create table product (
  id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  description VARCHAR(200),
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(80)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO product VALUES (1, 'Computador Gamer Completo', 'Intel Core I5 8gb Hd 500gb', 1881, '01.jpg');
INSERT INTO product VALUES (2, 'Pc Gamer', 'Intel Core I5 8gb Hd 1tb', 2609, '02.jpg');
INSERT INTO product VALUES (3, 'Pc Gamer Completo Easypc', 'Intel Core I5 (geforce Gtx 1050 Ti 4gb)', 2781, '03.jpg');
INSERT INTO product VALUES (4, 'Computador Gamer Completo', 'Intel Core i5 (GeForce GTX 1050 Ti 4GB)', 2879, '04.jpg');
INSERT INTO product VALUES (5, 'Pc Gamer Completo 3green Starting', 'Amd Am4 3.2ghz 8gb Ddr4 (radeon Rx Vega 3)', 1709, '05.jpg');
INSERT INTO product VALUES (6, 'Computador Gamer Monitor 25', 'Intel Core I5 8gb (geforce Gtx 1050 2gb)', 3141, '06.jpg');