CREATE DATABASE  IF NOT EXISTS `supplychain` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `supplychain`;
-- MySQL dump 10.13  Distrib 5.7.29, for Win64 (x86_64)
--
-- Host: localhost    Database: supplychain
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `entradas`
--

DROP TABLE IF EXISTS `entradas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entradas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mercadoria` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `local` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_hora` datetime NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `criado_por` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_atualizacao` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `atualizado_por` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mercadoria` (`mercadoria`),
  CONSTRAINT `entradas_ibfk_1` FOREIGN KEY (`mercadoria`) REFERENCES `mercadorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entradas`
--

LOCK TABLES `entradas` WRITE;
/*!40000 ALTER TABLE `entradas` DISABLE KEYS */;
INSERT INTO `entradas` VALUES (1,7,5,'Campos','2022-10-08 16:21:00','2022-11-22 16:21:41','1','2022-11-22 16:21:41','1'),(2,6,10,'Rio','2022-11-22 10:29:00','2022-11-22 16:29:49','1','2022-11-22 16:29:49','1'),(3,3,12,'São Paulo','2022-10-28 12:30:00','2022-11-22 16:30:28','1','2022-11-22 16:30:28','1'),(4,5,3,'Campos','2022-11-22 16:30:00','2022-11-22 16:31:15','1','2022-11-22 16:31:15','1'),(5,2,18,'Manaus','2022-11-02 08:31:00','2022-11-22 16:41:37','1','2022-11-22 16:41:37','1'),(6,1,25,'Fortaleza','2022-11-10 14:32:00','2022-11-22 16:50:33','1','2022-11-22 16:50:33','1'),(7,1,5,'Campos','2022-11-23 10:23:00','2022-11-23 10:23:23','1','2022-11-23 10:23:23','1');
/*!40000 ALTER TABLE `entradas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fabricantes`
--

DROP TABLE IF EXISTS `fabricantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fabricantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `criado_por` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_atualizacao` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `atualizado_por` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fabricantes`
--

LOCK TABLES `fabricantes` WRITE;
/*!40000 ALTER TABLE `fabricantes` DISABLE KEYS */;
INSERT INTO `fabricantes` VALUES (1,'Samsung','2022-11-22 15:45:43','1','2022-11-22 15:45:43','1'),(2,'Apple','2022-11-22 15:45:49','1','2022-11-22 15:45:49','1'),(3,'LG','2022-11-22 15:46:01','1','2022-11-22 15:46:01','1'),(4,'Sony','2022-11-22 15:46:14','1','2022-11-22 15:46:14','1'),(5,'Dell','2022-11-22 15:47:25','1','2022-11-22 15:47:25','1');
/*!40000 ALTER TABLE `fabricantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mercadorias`
--

DROP TABLE IF EXISTS `mercadorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mercadorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registro` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fabricante` int(11) NOT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `criado_por` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_atualizacao` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `atualizado_por` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fabricante` (`fabricante`),
  CONSTRAINT `mercadorias_ibfk_1` FOREIGN KEY (`fabricante`) REFERENCES `fabricantes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mercadorias`
--

LOCK TABLES `mercadorias` WRITE;
/*!40000 ALTER TABLE `mercadorias` DISABLE KEYS */;
INSERT INTO `mercadorias` VALUES (1,'iPhone 13','q6EPTbyVDnAd433S',2,'Smartphone','Apple iPhone 13 (128 GB) - Estelar','2022-11-22 15:48:37','1','2022-11-22 15:51:44','1'),(2,'Apple Watch 8','Vq6EDnAd43PTby3S',2,'Smartwatch','Apple Watch Series 8 -  41mm','2022-11-22 15:50:30','1','2022-11-22 15:50:30','1'),(3,'Galaxy Note 20','kkWxtNtnZEjtgTA8',1,'Smartphone',' Galaxy Note 20 5G SM-N981B 256GB','2022-11-22 15:53:57','1','2022-11-22 16:13:08','1'),(4,'TV 43AU7700','wN3hfhxrqGh9dF5B',1,'TV','Smart TV 43\" UHD 4K Samsung 43AU7700','2022-11-22 15:55:23','1','2022-11-22 15:55:23','1'),(5,'TV OLED C2','Ilh6Qj0rrfCxsVC3',3,'TV','Smart TV 4K OLED55C2','2022-11-22 16:15:40','1','2022-11-22 16:15:40','1'),(6,'Notebook G15','cK1KyVX9IIZhpP65',5,'Notebook','Notebook Dell 15.6\" G15-i1000-d20p','2022-11-22 16:16:53','1','2022-11-22 16:16:53','1'),(7,'PlaySation 5','DynjlsJHsQ1irTx1',4,'Console','Console Playstation 5','2022-11-22 16:17:38','1','2022-11-22 16:17:38','1');
/*!40000 ALTER TABLE `mercadorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saidas`
--

DROP TABLE IF EXISTS `saidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `saidas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mercadoria` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `local` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_hora` datetime NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `criado_por` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_atualizacao` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `atualizado_por` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mercadoria` (`mercadoria`),
  CONSTRAINT `saidas_ibfk_1` FOREIGN KEY (`mercadoria`) REFERENCES `mercadorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saidas`
--

LOCK TABLES `saidas` WRITE;
/*!40000 ALTER TABLE `saidas` DISABLE KEYS */;
INSERT INTO `saidas` VALUES (1,7,5,'Campos','2022-11-22 16:24:00','2022-11-22 16:24:28','1','2022-11-22 16:24:28','1'),(2,6,2,'Rio','2022-11-16 13:00:00','2022-11-22 16:39:06','1','2022-11-22 16:39:06','1'),(3,6,3,'Rio','2022-11-23 09:15:00','2022-11-22 16:40:16','1','2022-11-22 16:40:16','1'),(4,2,6,'Manaus','2022-11-17 17:07:00','2022-11-22 16:45:04','1','2022-11-22 16:45:04','1'),(5,3,6,'São Paulo','2022-10-29 08:12:00','2022-11-22 16:46:38','1','2022-11-22 16:46:38','1'),(6,3,4,'São Paulo','2022-11-15 11:20:00','2022-11-22 16:47:21','1','2022-11-22 16:47:21','1'),(7,3,2,'São Paulo','2022-11-03 15:15:00','2022-11-22 16:48:22','1','2022-11-22 16:48:22','1');
/*!40000 ALTER TABLE `saidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `criado_por` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_atualizacao` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `atualizado_por` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','123456','2022-11-19 11:14:34','1','2022-11-19 11:14:46','1');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-23 14:36:33
