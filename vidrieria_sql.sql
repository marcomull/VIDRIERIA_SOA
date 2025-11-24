-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: vidrieria
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comprobantes`
--

DROP TABLE IF EXISTS `comprobantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comprobantes` (
  `id_comprobante` int NOT NULL AUTO_INCREMENT,
  `id_venta` int DEFAULT NULL,
  `tipo` enum('BOLETA','FACTURA') NOT NULL,
  `numero` varchar(255) NOT NULL,
  `fecha_emision` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_comprobante`),
  UNIQUE KEY `numero` (`numero`),
  KEY `id_venta` (`id_venta`),
  CONSTRAINT `comprobantes_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comprobantes`
--

LOCK TABLES `comprobantes` WRITE;
/*!40000 ALTER TABLE `comprobantes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comprobantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedido` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int DEFAULT NULL,
  `id_especificacion` int DEFAULT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` double DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_especificacion` (`id_especificacion`),
  CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_especificacion`) REFERENCES `especificaciones_producto` (`id_especificacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especificaciones_producto`
--

DROP TABLE IF EXISTS `especificaciones_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especificaciones_producto` (
  `id_especificacion` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `id_vidrio` int DEFAULT NULL,
  `id_material` int DEFAULT NULL,
  `ancho` double DEFAULT NULL,
  `alto` double DEFAULT NULL,
  `espesor` double DEFAULT NULL,
  `detalles` varchar(255) DEFAULT NULL,
  `pago_total` double DEFAULT NULL,
  PRIMARY KEY (`id_especificacion`),
  KEY `especificaciones_producto_ibfk_1` (`id_producto`),
  KEY `especificaciones_producto_ibfk_2` (`id_vidrio`),
  KEY `especificaciones_producto_ibfk_3` (`id_material`),
  CONSTRAINT `especificaciones_producto_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `especificaciones_producto_ibfk_2` FOREIGN KEY (`id_vidrio`) REFERENCES `tipos_vidrio` (`id_vidrio`),
  CONSTRAINT `especificaciones_producto_ibfk_3` FOREIGN KEY (`id_material`) REFERENCES `materiales` (`id_material`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especificaciones_producto`
--

LOCK TABLES `especificaciones_producto` WRITE;
/*!40000 ALTER TABLE `especificaciones_producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `especificaciones_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_movimientos_material`
--

DROP TABLE IF EXISTS `historial_movimientos_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_movimientos_material` (
  `id_historial` int NOT NULL AUTO_INCREMENT,
  `id_stock_material` int NOT NULL,
  `tipo_movimiento` enum('INGRESO_MANUAL','AJUSTE_MANUAL','BAJA_POR_ROTURA','CONSUMO_PEDIDO') NOT NULL,
  `cantidad_movida` int NOT NULL COMMENT 'Positivo para ingresos, negativo para salidas',
  `stock_restante` int NOT NULL COMMENT 'La cantidad que quedó en stock_material después del movimiento',
  `id_usuario_responsable` int DEFAULT NULL COMMENT 'El id_usuario del token que realizó la acción',
  `fecha_movimiento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_historial`),
  KEY `fk_hist_stock_material` (`id_stock_material`),
  CONSTRAINT `fk_hist_stock_material` FOREIGN KEY (`id_stock_material`) REFERENCES `stock_material` (`id_stock_material`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_movimientos_material`
--

LOCK TABLES `historial_movimientos_material` WRITE;
/*!40000 ALTER TABLE `historial_movimientos_material` DISABLE KEYS */;
INSERT INTO `historial_movimientos_material` VALUES (1,7,'INGRESO_MANUAL',5,5,37,'2025-11-10 20:01:06'),(2,5,'AJUSTE_MANUAL',-3,22,37,'2025-11-10 20:04:40'),(3,7,'AJUSTE_MANUAL',10,15,37,'2025-11-10 23:57:40'),(4,4,'AJUSTE_MANUAL',45,50,37,'2025-11-10 23:59:16'),(5,3,'AJUSTE_MANUAL',5,15,37,'2025-11-10 23:59:59');
/*!40000 ALTER TABLE `historial_movimientos_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_movimientos_vidrio`
--

DROP TABLE IF EXISTS `historial_movimientos_vidrio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_movimientos_vidrio` (
  `id_historial` int NOT NULL AUTO_INCREMENT,
  `id_stock_vidrio` int NOT NULL,
  `tipo_movimiento` enum('INGRESO_MANUAL','AJUSTE_MANUAL','BAJA_POR_ROTURA','CONSUMO_PEDIDO') NOT NULL,
  `cantidad_movida` int NOT NULL COMMENT 'Positivo para ingresos, negativo para salidas',
  `stock_restante` int NOT NULL COMMENT 'La cantidad que quedó en stock_vidrio después del movimiento',
  `id_usuario_responsable` int DEFAULT NULL COMMENT 'El id_usuario del token que realizó la acción',
  `fecha_movimiento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_historial`),
  KEY `fk_hist_stock_vidrio` (`id_stock_vidrio`),
  CONSTRAINT `fk_hist_stock_vidrio` FOREIGN KEY (`id_stock_vidrio`) REFERENCES `stock_vidrio` (`id_stock_vidrio`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_movimientos_vidrio`
--

LOCK TABLES `historial_movimientos_vidrio` WRITE;
/*!40000 ALTER TABLE `historial_movimientos_vidrio` DISABLE KEYS */;
INSERT INTO `historial_movimientos_vidrio` VALUES (1,7,'INGRESO_MANUAL',5,5,37,'2025-11-10 16:31:25'),(2,8,'INGRESO_MANUAL',20,20,37,'2025-11-10 19:50:01'),(3,8,'BAJA_POR_ROTURA',-20,0,37,'2025-11-10 19:51:27'),(4,7,'AJUSTE_MANUAL',10,15,37,'2025-11-10 20:04:18'),(5,3,'AJUSTE_MANUAL',14,15,37,'2025-11-10 23:58:20'),(6,2,'AJUSTE_MANUAL',8,18,37,'2025-11-10 23:58:34'),(7,7,'AJUSTE_MANUAL',5,20,37,'2025-11-13 01:57:06');
/*!40000 ALTER TABLE `historial_movimientos_vidrio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materiales`
--

DROP TABLE IF EXISTS `materiales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materiales` (
  `id_material` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `activo` bit(1) DEFAULT NULL,
  `tipo_material` varchar(255) NOT NULL,
  PRIMARY KEY (`id_material`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materiales`
--

LOCK TABLES `materiales` WRITE;
/*!40000 ALTER TABLE `materiales` DISABLE KEYS */;
INSERT INTO `materiales` VALUES (1,'Marco de pruebadsadas','prueba prueba','https://res.cloudinary.com/dposuxkqf/image/upload/v1761539341/materiales/mnhzhfymd1u04d7plkei.jpg',_binary '','Marco'),(2,'sa','asd',NULL,_binary '\0','dsa'),(3,'wq','rew',NULL,_binary '\0','eqw'),(4,'dsf','ewqfds',NULL,_binary '','ewqfsd'),(5,'wq','wq',NULL,_binary '','wq'),(6,'wq','wq',NULL,_binary '\0','wq'),(7,'wq','wq','https://res.cloudinary.com/dposuxkqf/image/upload/v1761540792/materiales/tisl664rq4yxzxsfkvhg.jpg',_binary '\0','wq'),(8,'eqw','eqw','https://res.cloudinary.com/dposuxkqf/image/upload/v1761540941/materiales/g3yfbhro3juwdhsckfui.jpg',_binary '','ew');
/*!40000 ALTER TABLE `materiales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodos_pago`
--

DROP TABLE IF EXISTS `metodos_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodos_pago` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodos_pago`
--

LOCK TABLES `metodos_pago` WRITE;
/*!40000 ALTER TABLE `metodos_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodos_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `fecha_pedido` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('PENDIENTE','EN_PROCESO','COMPLETADO','CANCELADO') DEFAULT 'PENDIENTE',
  PRIMARY KEY (`id_pedido`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `tipo` enum('VIDRIO','VITRINA','MAMPARA','CUADRO','VENTANA','ESPEJO') DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `activo` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Ventana Corrediza','Ventana de aluminio y vidrio 6mm','VENTANA','https://ejemplo.com/img/ventana.jpg',_binary ''),(2,'Mampara de Ducha','Mampara de vidrio templado 8mm','MAMPARA','https://ejemplo.com/img/mampara.jpg',_binary '\0'),(3,'Cuadro Decorativo','Cuadro con marco de madera y vidrio','CUADRO','https://ejemplo.com/img/cuadro.jpg',_binary '\0'),(4,'Vitrina de Exhibición','Vitrina de 3 niveles con puertas de vidrio','VITRINA','https://ejemplo.com/img/vitrina.jpg',_binary '\0'),(5,'Espejo de Baño','Espejo biselado de 4mm','ESPEJO','https://res.cloudinary.com/dposuxkqf/image/upload/v1761081927/materiales/tajy4gd0ruoquiafgog4.jpg',_binary ''),(9,'Mampara de sala','rewrwer','MAMPARA','https://res.cloudinary.com/dposuxkqf/image/upload/v1761347960/productos/hrtv3haa71dstjovzdbt.jpg',_binary ''),(10,'Ventana Corredizaa','yioiyu','MAMPARA','https://res.cloudinary.com/dposuxkqf/image/upload/v1761418747/productos/wnon8shuuwfxt5qfsgvn.png',_binary ''),(11,'Mampara de sala','dasdasdsa','MAMPARA','https://res.cloudinary.com/dposuxkqf/image/upload/v1761609578/productos/jvlsuskr7ab7dr90yvpl.jpg',_binary '');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_material`
--

DROP TABLE IF EXISTS `stock_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_material` (
  `id_stock_material` int NOT NULL AUTO_INCREMENT,
  `id_material` int NOT NULL,
  `largo` double NOT NULL,
  `cantidad` int NOT NULL,
  `es_retazo` tinyint(1) DEFAULT '0',
  `precio_metro` double DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `fecha_ingreso` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_stock_material`),
  KEY `fk_stock_material_tipo` (`id_material`),
  KEY `idx_material_largo` (`id_material`,`largo`),
  CONSTRAINT `fk_stock_material_tipo` FOREIGN KEY (`id_material`) REFERENCES `materiales` (`id_material`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Inventario físico de tiras y retazos de materiales';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_material`
--

LOCK TABLES `stock_material` WRITE;
/*!40000 ALTER TABLE `stock_material` DISABLE KEYS */;
INSERT INTO `stock_material` VALUES (1,1,6,50,0,18.5,'Pasillo A - Perfiles','2025-11-09 20:23:58',1),(2,2,5.8,30,0,22,'Pasillo B - Tubos','2025-11-09 20:24:08',1),(3,1,1.5,15,1,15,'Caja de Retazos 1','2025-11-09 20:24:15',1),(4,2,2.1,50,0,18,'Caja de Retazos 2','2025-11-09 20:24:23',1),(5,1,6,22,0,19,'Pasillo A - Rack 2','2025-11-09 20:24:29',1),(6,1,0.85,20,1,14,'Caja de Retazos 1 actualizado','2025-11-09 20:24:35',0),(7,4,9.3,15,0,18,'Pasillo B - Tubos','2025-11-10 20:01:06',1);
/*!40000 ALTER TABLE `stock_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_vidrio`
--

DROP TABLE IF EXISTS `stock_vidrio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_vidrio` (
  `id_stock_vidrio` int NOT NULL AUTO_INCREMENT,
  `id_vidrio` int NOT NULL,
  `espesor` double NOT NULL,
  `ancho` double NOT NULL,
  `alto` double NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `es_retazo` tinyint(1) DEFAULT '0',
  `ubicacion` varchar(255) DEFAULT NULL,
  `fecha_ingreso` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `activo` tinyint(1) DEFAULT '1',
  `preciom2` double DEFAULT NULL,
  PRIMARY KEY (`id_stock_vidrio`),
  KEY `fk_stock_vidrio_tipo` (`id_vidrio`),
  KEY `idx_vidrio_espesor_medidas` (`id_vidrio`,`espesor`,`ancho`,`alto`),
  CONSTRAINT `fk_stock_vidrio_tipo` FOREIGN KEY (`id_vidrio`) REFERENCES `tipos_vidrio` (`id_vidrio`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Inventario físico de planchas y retazos de vidrio';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_vidrio`
--

LOCK TABLES `stock_vidrio` WRITE;
/*!40000 ALTER TABLE `stock_vidrio` DISABLE KEYS */;
INSERT INTO `stock_vidrio` VALUES (1,1,6,1.5,2.5,20,0,'Estante A-1','2025-11-09 19:55:22',1,100),(2,2,8,1.2,2,18,0,'Estante A-2','2025-11-09 20:06:54',1,95),(3,1,6,0.8,1.2,15,1,'Zona de Retazos','2025-11-09 20:08:22',1,40),(4,2,4,1.8,2.4,15,0,'Estante B-1','2025-11-09 20:09:15',1,88),(5,1,4,1.5,2.2,30,0,'Estante A-3','2025-11-09 20:09:26',0,50),(6,1,8,0.6,0.9,5,1,'Zona de Retazos Actualizado','2025-11-09 20:09:34',0,70),(7,1,8,0.6,0.9,20,1,'Zona de Pruebas Kardex','2025-11-10 16:31:25',1,70),(8,2,5,1.5,1.5,0,0,'Estante A-1','2025-11-10 19:50:01',0,75);
/*!40000 ALTER TABLE `stock_vidrio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_vidrio`
--

DROP TABLE IF EXISTS `tipos_vidrio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_vidrio` (
  `id_vidrio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `activo` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_vidrio`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_vidrio`
--

LOCK TABLES `tipos_vidrio` WRITE;
/*!40000 ALTER TABLE `tipos_vidrio` DISABLE KEYS */;
INSERT INTO `tipos_vidrio` VALUES (1,'Vidrio Templado','Vidrio de seguridad tratado térmicamente para aumentar 5 veces su resistencia a impactos.','https://res.cloudinary.com/dposuxkqf/image/upload/v1761590659/tipos_vidrio/igvzayrpw8qi92j3rqjv.jpg',_binary ''),(2,'Vidrio Laminado Acústico','Compuesto por dos hojas de vidrio con una capa intermedia de PVB acústico para reducir el ruido exterior.','https://res.cloudinary.com/dposuxkqf/image/upload/v1761590680/tipos_vidrio/qblk7ipcyhysj3gwqlzf.jpg',_binary ''),(3,'Vidrio templado ','dsadas','https://res.cloudinary.com/dposuxkqf/image/upload/v1761590227/tipos_vidrio/rcor7l0xi5tzmeoswhgi.jpg',_binary '');
/*!40000 ALTER TABLE `tipos_vidrio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `correo` varchar(255) NOT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `ruc` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `rol` enum('ADMIN','CLIENTE','VENDEDOR','TALLER','ALMACEN') DEFAULT 'CLIENTE',
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `codigo_verificacion` varchar(255) DEFAULT NULL,
  `fecha_expiracion` datetime(6) DEFAULT NULL,
  `verificado` bit(1) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_token_expiracion` datetime(6) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (28,'Juan Luis','Talavera Diaz','juantdtd@gmail.com','$2a$10$tSWmi.xoYSmyorOnwFBs2OxVqM7TQdk0vRGuU.yHAGTRCxB.rytQ.','941065434','72937348','20613057898','Alvares Thomas','ADMIN','2025-10-09 22:27:06',NULL,NULL,_binary '',NULL,NULL,1),(35,'DASDSADSAS','Gomez Reyes','Grcris.3.3@gmail.com','$2a$10$gfVQ6kM0B6sUVF9Q/4YS3OHHaSUUuU0jEqND8wRbuyzGEy6d5/ZOu','956593552','74769870','10747698711','Characato 28 de Julio','CLIENTE','2025-10-10 02:10:01',NULL,NULL,_binary '',NULL,NULL,1),(37,'Marco Antonios','Arias Mullisaca','marcoarias765@gmail.com','$2a$10$oAvFZHB5RgkwFqQMQP4pY.hf2jkrOch83fxnwdfGBh0EaYpc9d.06','966360415','75234779','20613057898','Characato','ADMIN','2025-10-10 23:32:58',NULL,NULL,_binary '',NULL,NULL,1),(41,'ewq','Lazo Medina','abelazo16052001@gmail.com','$2a$10$do7VKfvNgVHswKL1IowWNO4CRUiOIXbFr93ZIZw3eSsnkENnkOlb2','123456789','71320611','10747698711','','CLIENTE','2025-10-27 23:55:05',NULL,NULL,_binary '',NULL,NULL,1),(45,'eqwqwewq','vendedor','u20311530@utp.edu.pe','$2a$10$S9MFfJ2Z4JIpcJuK9mObfeQPe1g6PLLZwyTJHGt37hJDi4cuZBsVe','966360415','75234779','10747698711','Characato','ALMACEN','2025-10-30 00:05:23',NULL,NULL,_binary '',NULL,NULL,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int DEFAULT NULL,
  `id_pago` int DEFAULT NULL,
  `total` double DEFAULT NULL,
  `fecha_venta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_venta`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_pago` (`id_pago`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_pago`) REFERENCES `metodos_pago` (`id_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-14 11:11:50
