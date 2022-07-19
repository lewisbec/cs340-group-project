-- MariaDB dump 10.19  Distrib 10.4.25-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_canzonej
-- ------------------------------------------------------
-- Server version	10.6.8-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Albums`
--

DROP TABLE IF EXISTS `Albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Albums` (
  `albumID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` text NOT NULL,
  `artistID` int(11) NOT NULL,
  PRIMARY KEY (`albumID`),
  UNIQUE KEY `albumID_UNIQUE` (`albumID`),
  KEY `fk_Albums_Artists1_idx` (`artistID`),
  CONSTRAINT `fk_Albums_Artists1` FOREIGN KEY (`artistID`) REFERENCES `Artists` (`artistID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Albums`
--

LOCK TABLES `Albums` WRITE;
/*!40000 ALTER TABLE `Albums` DISABLE KEYS */;
INSERT INTO `Albums` VALUES (1,'Bangarang','The 4th EP by Skrillex, released in 2011.',2),(2,'Poems, Prayers & Promises','Fourth studio album by American singer-songwr',3),(3,'Sgt. Pepper\'s Lonely Hearts Club Band','Eighth studio album by the English rock band ',1);
/*!40000 ALTER TABLE `Albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Artists`
--

DROP TABLE IF EXISTS `Artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Artists` (
  `artistID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `bio` text DEFAULT NULL,
  PRIMARY KEY (`artistID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Artists`
--

LOCK TABLES `Artists` WRITE;
/*!40000 ALTER TABLE `Artists` DISABLE KEYS */;
INSERT INTO `Artists` VALUES (1,'The Beatles','English rock band formed in 1960 in Liverpool'),(2,'Skrillex','DJ who popularized dubstep in the USA.'),(3,'John Denver','American singer-songwriter, actor, activst, a');
/*!40000 ALTER TABLE `Artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `isPremium` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `customerID_UNIQUE` (`customerID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'wildchild','southernRock77','wildchild@gmail.com',1),(2,'wubbles96','Skipper5385','wubbles96@yahoo.com',NULL),(3,'yankeesfan_89','password123','yankeesfan_89@gmail.com',NULL);
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Genres`
--

DROP TABLE IF EXISTS `Genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Genres` (
  `genreID` varchar(45) NOT NULL,
  PRIMARY KEY (`genreID`),
  UNIQUE KEY `genreID_UNIQUE` (`genreID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genres`
--

LOCK TABLES `Genres` WRITE;
/*!40000 ALTER TABLE `Genres` DISABLE KEYS */;
INSERT INTO `Genres` VALUES ('country'),('dubstep'),('rock');
/*!40000 ALTER TABLE `Genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Playlists`
--

DROP TABLE IF EXISTS `Playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Playlists` (
  `playlistID` int(11) NOT NULL AUTO_INCREMENT,
  `numberOfStreams` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `customerID` int(11) NOT NULL,
  PRIMARY KEY (`playlistID`,`customerID`),
  UNIQUE KEY `playlistID_UNIQUE` (`playlistID`),
  KEY `fk_Playlists_Customers1_idx` (`customerID`),
  CONSTRAINT `fk_Playlists_Customers1` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Playlists`
--

LOCK TABLES `Playlists` WRITE;
/*!40000 ALTER TABLE `Playlists` DISABLE KEYS */;
INSERT INTO `Playlists` VALUES (1,0,'I like Everything.','Title says it all.',0),(2,0,'Everything... but Country','Descriptions are hard to come up with.',0),(3,0,'TAKE ME HOME','... WEST VIRGINIA',0);
/*!40000 ALTER TABLE `Playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Playlists_Songs`
--

DROP TABLE IF EXISTS `Playlists_Songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Playlists_Songs` (
  `playlist_songID` int(11) NOT NULL AUTO_INCREMENT,
  `songID` int(11) NOT NULL,
  `playlistID` int(11) NOT NULL,
  PRIMARY KEY (`playlist_songID`),
  KEY `fk_Songs_has_Playlists_Playlists1_idx` (`playlistID`),
  KEY `fk_Songs_has_Playlists_Songs1_idx` (`songID`),
  CONSTRAINT `fk_Songs_has_Playlists_Playlists1` FOREIGN KEY (`playlistID`) REFERENCES `Playlists` (`playlistID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Songs_has_Playlists_Songs1` FOREIGN KEY (`songID`) REFERENCES `Songs` (`songID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Playlists_Songs`
--

LOCK TABLES `Playlists_Songs` WRITE;
/*!40000 ALTER TABLE `Playlists_Songs` DISABLE KEYS */;
/*!40000 ALTER TABLE `Playlists_Songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Songs`
--

DROP TABLE IF EXISTS `Songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Songs` (
  `songID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `duration` int(11) NOT NULL,
  `numberOfStreams` int(11) DEFAULT 0,
  `albumID` int(11) NOT NULL,
  `artistID` int(11) NOT NULL,
  `genreID` varchar(45) NOT NULL,
  PRIMARY KEY (`songID`,`albumID`,`artistID`,`genreID`),
  UNIQUE KEY `songID_UNIQUE` (`songID`),
  KEY `fk_Songs_Albums1_idx` (`albumID`),
  KEY `fk_Songs_Artists1_idx` (`artistID`),
  KEY `fk_Songs_Genres1_idx` (`genreID`),
  CONSTRAINT `fk_Songs_Albums1` FOREIGN KEY (`albumID`) REFERENCES `Albums` (`albumID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Songs_Artists1` FOREIGN KEY (`artistID`) REFERENCES `Artists` (`artistID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Songs_Genres1` FOREIGN KEY (`genreID`) REFERENCES `Genres` (`genreID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Songs`
--

LOCK TABLES `Songs` WRITE;
/*!40000 ALTER TABLE `Songs` DISABLE KEYS */;
INSERT INTO `Songs` VALUES (1,'Right In',180,0,1,2,'dubstep'),(2,'Bangarang',215,0,1,2,'dubstep'),(3,'Breakn\' a Sweat',302,0,1,2,'dubstep'),(4,'Take Me Home, Country Roads',188,0,2,3,'country'),(5,'Sunshine on My Shoulders',312,0,2,3,'country'),(6,'Fire and Rain',344,0,2,3,'country'),(7,'Sgt. Pepper\'s Lonely Hearts Club Band',120,0,3,1,'rock'),(8,'With a Little Help from My Friends',162,0,3,1,'rock'),(9,'Lucy in the Sky with Diamonds',208,0,3,1,'rock');
/*!40000 ALTER TABLE `Songs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


INSERT INTO Playlists_Songs (
    songID,
    playlistID
)
VALUES
(
    (SELECT songID FROM Songs WHERE title = "Right In"),
    (SELECT playlistID FROM Playlists WHERE name = "I like Everything.")
),
(
    (SELECT songID FROM Songs WHERE title = "Bangarang"),
    (SELECT playlistID FROM Playlists WHERE name = "I like Everything.")
),
(
    (SELECT songID FROM Songs WHERE title = "Breakn' a Sweat"),
    (SELECT playlistID FROM Playlists WHERE name = "I like Everything.")
),
(
    (SELECT songID FROM Songs WHERE title = "Take Me Home, Country Roads"),
    (SELECT playlistID FROM Playlists WHERE name = "I like Everything.")
),
(
    (SELECT songID FROM Songs WHERE title = "Sunshine on My Shoulders"),
    (SELECT playlistID FROM Playlists WHERE name = "I like Everything.")
),
(
    (SELECT songID FROM Songs WHERE title = "Fire and Rain"),
    (SELECT playlistID FROM Playlists WHERE name = "I like Everything.")
),
(
    (SELECT songID FROM Songs WHERE title = "Sgt. Pepper's Lonely Hearts Club Band"),
    (SELECT playlistID FROM Playlists WHERE name = "I like Everything.")
),
(
    (SELECT songID FROM Songs WHERE title = "With a Little Help from My Friends"),
    (SELECT playlistID FROM Playlists WHERE name = "I like Everything.")
),
(
    (SELECT songID FROM Songs WHERE title = "Lucy in the Sky with Diamonds"),
    (SELECT playlistID FROM Playlists WHERE name = "I like Everything.")
),
(
    (SELECT songID FROM Songs WHERE title = "Right In"),
    (SELECT playlistID FROM Playlists WHERE name = "Everything... but Country")
),
(
    (SELECT songID FROM Songs WHERE title = "Lucy in the Sky with Diamonds"),
    (SELECT playlistID FROM Playlists WHERE name = "Everything... but Country")
),
(
    (SELECT songID FROM Songs WHERE title = "Sgt. Pepper's Lonely Hearts Club Band"),
    (SELECT playlistID FROM Playlists WHERE name = "Everything... but Country")
);


-- Dump completed on 2022-07-10 23:32:39
