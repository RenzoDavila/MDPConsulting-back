CREATE DATABASE  IF NOT EXISTS mdpconsulting;
USE mdpconsulting;

DROP TABLE IF EXISTS clientes;
CREATE TABLE clientes (
  cli_id int NOT NULL AUTO_INCREMENT,
  cli_nom varchar(255) NOT NULL,
  cli_ape varchar(255) DEFAULT NULL,
  cli_fec_nac date DEFAULT NULL,
  PRIMARY KEY (cli_id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

LOCK TABLES clientes WRITE;
INSERT INTO clientes VALUES (1,'Albert','Tyson','1902-02-09');
UNLOCK TABLES;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
