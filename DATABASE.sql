-- MySQL dump 10.13  Distrib 8.4.6-6, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: u521934522-nasma-db
-- ------------------------------------------------------
-- Server version	8.4.6-6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!50717 SELECT COUNT(*) INTO @rocksdb_has_p_s_session_variables FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'performance_schema' AND TABLE_NAME = 'session_variables' */;
/*!50717 SET @rocksdb_get_is_supported = IF (@rocksdb_has_p_s_session_variables, 'SELECT COUNT(*) INTO @rocksdb_is_supported FROM performance_schema.session_variables WHERE VARIABLE_NAME=\'rocksdb_bulk_load\'', 'SELECT 0') */;
/*!50717 PREPARE s FROM @rocksdb_get_is_supported */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;
/*!50717 SET @rocksdb_enable_bulk_load = IF (@rocksdb_is_supported, 'SET SESSION rocksdb_bulk_load = 1', 'SET @rocksdb_dummy_bulk_load = 0') */;
/*!50717 PREPARE s FROM @rocksdb_enable_bulk_load */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;
mysqldump: Error: 'Access denied; you need (at least one of) the PROCESS privilege(s) for this operation' when trying to dump tablespaces

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titleAr` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titleEn` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descriptionAr` text COLLATE utf8mb4_unicode_ci,
  `descriptionEn` text COLLATE utf8mb4_unicode_ci,
  `value` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` enum('mechanism','advantage','revenue') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_stats`
--

DROP TABLE IF EXISTS `hero_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_stats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `labelAr` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `labelEn` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `suffix` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_stats`
--

LOCK TABLES `hero_stats` WRITE;
/*!40000 ALTER TABLE `hero_stats` DISABLE KEYS */;
INSERT INTO `hero_stats` VALUES (1,'سنوات الخبرة','Years of Experience','20','+','calendar',1,1,'2025-12-31 12:43:08','2025-12-31 12:43:08'),(2,'المشاريع المنجزة','Completed Projects','150','+','briefcase',2,1,'2025-12-31 12:43:08','2025-12-31 12:43:08'),(3,'العملاء الراضون','Happy Clients','200','+','users',3,1,'2025-12-31 12:43:08','2025-12-31 12:43:08'),(4,'الجوائز','Awards','15','+','award',4,1,'2025-12-31 12:43:08','2025-12-31 12:43:08');
/*!40000 ALTER TABLE `hero_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `altTextAr` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `altTextEn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fileKey` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mimeType` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (14,'03.png','/uploads/znHJDBrQrp0gLResrkoqZ-03.png','شعار الموقع','Site Logo',NULL,164166,'2025-12-31 20:01:17','2025-12-31 20:01:17','images/znHJDBrQrp0gLResrkoqZ-03.png','image/png'),(15,'03.png','/uploads/qFn_eQX1Hj38SflZXe_ms-03.png','أيقونة الموقع','Site Favicon',NULL,164166,'2025-12-31 20:01:24','2025-12-31 20:01:24','images/qFn_eQX1Hj38SflZXe_ms-03.png','image/png'),(16,'03.png','/uploads/IxJnUKschzO2sLctZY3ES-03.png','اللوجو الثاني','Second Logo',NULL,164166,'2025-12-31 20:01:35','2025-12-31 20:01:35','images/IxJnUKschzO2sLctZY3ES-03.png','image/png'),(17,'03.png','/uploads/yb3sH8bBo-AQslrgKxUJ4-03.png','اللوجو الثاني','Second Logo',NULL,164166,'2025-12-31 20:01:50','2025-12-31 20:01:50','images/yb3sH8bBo-AQslrgKxUJ4-03.png','image/png'),(18,'03.png','/uploads/MkFbxM2bBRNaGlsOt8DXC-03.png','اللوجو الثاني','Second Logo',NULL,164166,'2025-12-31 20:06:52','2025-12-31 20:06:52','images/MkFbxM2bBRNaGlsOt8DXC-03.png','image/png'),(19,'03.png','/uploads/z1wRDuCx7gjXbssrSJge--03.png','اللوجو الثاني','Second Logo',NULL,164166,'2025-12-31 20:17:19','2025-12-31 20:17:19','images/z1wRDuCx7gjXbssrSJge--03.png','image/png');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `navigation_items`
--

DROP TABLE IF EXISTS `navigation_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `navigation_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `labelAr` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `labelEn` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `parentId` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `navigation_items`
--

LOCK TABLES `navigation_items` WRITE;
/*!40000 ALTER TABLE `navigation_items` DISABLE KEYS */;
INSERT INTO `navigation_items` VALUES (1,'الرئيسية','Home','/',1,1,NULL,'2025-12-31 12:43:08','2025-12-31 12:43:08'),(2,'من نحن','About','/about',2,1,NULL,'2025-12-31 12:43:08','2025-12-31 12:43:08'),(3,'المشاريع','Projects','/projects',3,1,NULL,'2025-12-31 12:43:08','2025-12-31 12:43:08'),(4,'المعرض','Gallery','/gallery',4,1,NULL,'2025-12-31 12:43:08','2025-12-31 12:43:08'),(5,'تواصل معنا','Contact','/contact',5,1,NULL,'2025-12-31 12:43:08','2025-12-31 12:43:08');
/*!40000 ALTER TABLE `navigation_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titleAr` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titleEn` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descriptionAr` text COLLATE utf8mb4_unicode_ci,
  `descriptionEn` text COLLATE utf8mb4_unicode_ci,
  `imageUrl` text COLLATE utf8mb4_unicode_ci,
  `imageKey` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectUrl` text COLLATE utf8mb4_unicode_ci,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_content`
--

DROP TABLE IF EXISTS `site_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label_ar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `label_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value_ar` text COLLATE utf8mb4_unicode_ci,
  `value_en` text COLLATE utf8mb4_unicode_ci,
  `section` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_ar` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_en` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_content_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_content`
--

LOCK TABLES `site_content` WRITE;
/*!40000 ALTER TABLE `site_content` DISABLE KEYS */;
INSERT INTO `site_content` VALUES (1,'header_home','رابط الصفحة الرئيسية','Home Page Link','الرئيسية ','Home','header','رابط الصفحة الرئيسية','Home page link',NULL,'2025-12-31 11:54:45','2025-12-31 18:40:04'),(2,'header_about','رابط قسم من نحن','About Us Link','من نحن','About Us','header','رابط قسم من نحن','About section link',NULL,'2025-12-31 11:54:45','2025-12-31 18:25:46'),(3,'header_shheer','رابط مشروع شهير','SHHEER Project Link','مشروع شهير','SHHEER Project','header','رابط مشروع شهير','SHHEER project link',NULL,'2025-12-31 11:54:45','2025-12-31 18:25:46'),(4,'header_projects','رابط المشاريع','Projects Link','مشاريعنا','Our Projects','header','رابط قسم المشاريع','Projects section link',NULL,'2025-12-31 11:54:45','2025-12-31 18:25:46'),(5,'header_contact','رابط التواصل','Contact Link','تواصل ','Contact Us','header','رابط قسم التواصل','Contact section link',NULL,'2025-12-31 11:54:45','2025-12-31 18:25:46'),(6,'header_login','رابط تسجيل الدخول','Login Link','تسجيل الدخول','Login','header','زر تسجيل الدخول','Login button',NULL,'2025-12-31 11:54:45','2025-12-31 18:40:09'),(7,'hero_title','العنوان الرئيسي','Main Title','شهير التجارية ','Shheer Trading','hero','العنوان الرئيسي','Main title',NULL,'2025-12-31 11:54:45','2025-12-31 18:40:33'),(8,'hero_subtitle','الوصف الرئيسي','Main Description','رواد في تطوير الأعمال والابتكارات ذات الملكية الفكرية منذ عام 2006','Pioneers in business development and intellectual property innovations since 2005','hero','العنوان الفرعي','Subtitle',NULL,'2025-12-31 11:54:45','2025-12-31 18:34:39'),(9,'hero_stat1_value','قيمة الإحصائية 1','Stat 1 Value','+20','+20','hero','قيمة الإحصائية الأولى','First stat value',NULL,'2025-12-31 11:54:45','2025-12-31 18:34:39'),(10,'hero_stat1_label','وصف الإحصائية 1','Stat 1 Label','عاماً من الخبرة','Years of Experience','hero','وصف الإحصائية الأولى','First stat label',NULL,'2025-12-31 11:54:45','2025-12-31 18:34:39'),(11,'hero_stat2_value','قيمة الإحصائية 2','Stat 2 Value','$4B','$4B','hero','قيمة الإحصائية الثانية','Second stat value',NULL,'2025-12-31 11:54:45','2025-12-31 18:34:39'),(12,'hero_stat2_label','وصف الإحصائية 2','Stat 2 Label','قيمة الرخصة','License Value','hero','وصف الإحصائية الثانية','Second stat label',NULL,'2025-12-31 11:54:45','2025-12-31 18:34:39'),(13,'hero_stat3_value','قيمة الإحصائية 3','Stat 3 Value','$400B+','$400B+','hero','قيمة الإحصائية الثالثة','Third stat value',NULL,'2025-12-31 11:54:45','2025-12-31 18:34:39'),(14,'hero_stat3_label','وصف الإحصائية 3','Stat 3 Label','حجم السوق','Market Size','hero','وصف الإحصائية الثالثة','Third stat label',NULL,'2025-12-31 11:54:45','2025-12-31 18:34:39'),(15,'hero_cta_primary','زر الإجراء الرئيسي','Primary CTA Button','اكتشف مشروع شهير','Discover SHHEER','hero','نص الزر الرئيسي في قسم Hero','Main button text in Hero section','✨','2025-12-31 11:54:45','2025-12-31 18:27:29'),(16,'hero_cta_secondary','زر الإجراء الثانوي','Secondary CTA Button','تواصل معنا','Contact Us','hero','نص الزر الثانوي في قسم Hero','Secondary button text in Hero section','📧','2025-12-31 11:54:45','2025-12-31 18:27:29'),(17,'about_title','عنوان قسم من نحن','About Section Title','من نحن','About Us','about','عنوان القسم','Section title','📋','2025-12-31 11:54:45','2025-12-31 18:44:02'),(18,'about_subtitle','عنوان فرعي لقسم من نحن','About Section Subtitle','تأسست عام 2005','Founded in 2005','about','العنوان الفرعي','Section subtitle','📝','2025-12-31 11:54:45','2025-12-31 18:44:02'),(19,'about_description','وصف قسم من نحن','About Section Description','نسمة برزان التجارية هي إحدى المؤسسات السعودية المتخصصة بتطوير الأعمال والابتكارات ذات الملكية الفكرية، تأسست عام 2005 بمدينة الرياض. تسعى حالياً لتكون مؤسسة رائدة لخدمة الأوطان والمجتمعات وخدمة البشرية عامة.','Nesma Barzan Trading is a Saudi company specialized in business development and intellectual property innovations, founded in 2005 in Riyadh. It currently seeks to be a leading institution serving nations, communities, and humanity in general.','about','وصف الشركة','Company description','📄','2025-12-31 11:54:45','2025-12-31 18:44:02'),(20,'about_location','الموقع','Location','الرياض، المملكة العربية السعودية','Riyadh, Saudi Arabia','about','الموقع','Location','📍','2025-12-31 11:54:45','2025-12-31 18:44:02'),(21,'about_founded_year','سنة التأسيس','Founded Year','2005','2005','about','سنة التأسيس','Founded year','📅','2025-12-31 11:54:45','2025-12-31 18:44:02'),(22,'vision_title','عنوان الرؤية','Vision Title','رؤيتنا','Our Vision','vision','عنوان الرؤية','Vision title','🎯','2025-12-31 11:54:45','2025-12-31 18:44:02'),(23,'vision_description','وصف الرؤية','Vision Description','أن نكون مؤسسة رائدة لخدمة الأوطان والمجتمعات وخدمة البشرية عامة من خلال الابتكارات والحلول التقنية المتميزة.','To be a leading institution serving nations, communities, and humanity through distinguished innovations and technical solutions.','vision','وصف الرؤية','Vision description','💡','2025-12-31 11:54:45','2025-12-31 18:44:02'),(24,'mission_title','عنوان المهمة','Mission Title','مهمتنا','Our Mission','mission','عنوان المهمة','Mission title','🚀','2025-12-31 11:54:45','2025-12-31 18:44:02'),(25,'mission_description','وصف المهمة','Mission Description','تطوير الأعمال والابتكارات ذات الملكية الفكرية التي تخدم المجتمع وتحقق التنمية المستدامة.','Developing businesses and intellectual property innovations that serve society and achieve sustainable development.','mission','وصف المهمة','Mission description','🎯','2025-12-31 11:54:45','2025-12-31 18:44:02'),(26,'shheer_badge','شارة المشروع','Project Badge','مشروع مبتكر','Innovative Project','shheer','شارة المشروع','Project badge','🏅','2025-12-31 11:54:45','2025-12-31 18:44:24'),(27,'shheer_title','عنوان المشروع','Project Title','مشروع شهير SHHEER','SHHEER Project','shheer','عنوان المشروع','Project title','📱','2025-12-31 11:54:45','2025-12-31 18:44:24'),(28,'shheer_subtitle','عنوان فرعي للمشروع','Project Subtitle','منصة إعلانية مبتكرة على شاشات الهواتف المحمولة','Innovative advertising platform on mobile phone screens','shheer','العنوان الفرعي','Project subtitle','💫','2025-12-31 11:54:45','2025-12-31 18:44:24'),(29,'shheer_market_info','معلومات السوق','Market Information','حجم سوق الإعلانات على الهواتف المحمولة يتجاوز 400 مليار دولار عالمياً في 2024، ومن المتوقع أن يصل إلى تريليون دولار بحلول 2032','The mobile advertising market size exceeds $400 billion globally in 2024, and is expected to reach one trillion dollars by 2032','shheer','معلومات السوق','Market information','📊','2025-12-31 11:54:45','2025-12-31 18:44:24'),(30,'shheer_description_title','عنوان وصف المشروع','Project Description Title','وصف المشروع','Project Description','shheer','عنوان الوصف','Description title','📋','2025-12-31 11:54:45','2025-12-31 18:44:24'),(31,'shheer_description','وصف المشروع','Project Description','مشروع SHHEER هو نافذة اختيارية حرة غير مقيدة للدعاية والإعلان المرئي المتحرك. يتم عرض الإعلان على شاشة الهاتف النقال عن طريق تعاقبه مع شعار شركة الاتصالات المعنية. وهو أحد تطبيقات الهاتف المتحرك (GSM) الذي يستخدم شاشات الهاتف النقال كوسيلة مبتكرة للوصول إلى ملايين المستخدمين في منطقة ووقت محددين وفقاً لاحتياجات المعلن.','SHHEER project is a free optional unrestricted window for visual moving advertising. The advertisement is displayed on the mobile phone screen by alternating with the logo of the concerned telecommunications company. It is one of the mobile phone applications (GSM) that uses mobile phone screens as an innovative means to reach millions of users in a specific area and time according to the advertiser\'s needs.','shheer','وصف المشروع','Project description','📄','2025-12-31 11:54:45','2025-12-31 18:44:24'),(32,'project_license_title','عنوان حقوق الملكية','License Title','حقوق الملكية','Intellectual Property','project_details','عنوان حقوق الملكية','IP title','⚖️','2025-12-31 11:54:45','2025-12-31 18:44:24'),(33,'project_license_number','رقم الرخصة','License Number','رخصة رقم ج/3/3833 بتاريخ 12/5/2005','License No. J/3/3833 dated 12/5/2005','project_details','رقم الرخصة','License number','🔢','2025-12-31 11:54:45','2025-12-31 18:44:24'),(34,'project_license_value','قيمة الرخصة','License Value','قيمة الرخصة: 4 مليار دولار','License Value: $4 Billion','project_details','قيمة الرخصة','License value','💰','2025-12-31 11:54:45','2025-12-31 18:44:24'),(35,'project_mechanism_title','عنوان آلية العمل','Mechanism Title','آلية العمل','How It Works','project_details','عنوان آلية العمل','Mechanism title','⚙️','2025-12-31 11:54:45','2025-12-31 18:44:24'),(36,'project_ad_duration','مدة الإعلان','Ad Duration','مدة الإعلان: 10 ثواني','Ad Duration: 10 seconds','project_details','مدة الإعلان','Ad duration','⏱️','2025-12-31 11:54:45','2025-12-31 18:44:24'),(37,'project_logo_duration','مدة شعار المشغل','Logo Duration','مدة شعار المشغل: 5 ثواني','Operator Logo Duration: 5 seconds','project_details','مدة الشعار','Logo duration','⏰','2025-12-31 11:54:45','2025-12-31 18:44:24'),(38,'project_frequency_minute','عدد المرات في الدقيقة','Frequency per Minute','عدد المرات في الدقيقة: 4 مرات','Frequency per Minute: 4 times','project_details','التكرار في الدقيقة','Frequency per minute','🔄','2025-12-31 11:54:45','2025-12-31 18:44:24'),(39,'project_frequency_hour','عدد المرات في الساعة','Frequency per Hour','عدد المرات في الساعة: 240 مرة','Frequency per Hour: 240 times','project_details','التكرار في الساعة','Frequency per hour','🔁','2025-12-31 11:54:45','2025-12-31 18:44:24'),(40,'project_daily_hours','ساعات العرض اليومية','Daily Hours','ساعات العرض اليومية: 10-20 ساعة','Daily Display Hours: 10-20 hours','project_details','ساعات العرض','Display hours','📅','2025-12-31 11:54:45','2025-12-31 18:44:24'),(41,'features_title','عنوان قسم المميزات','Features Section Title','المميزات','Features','features','عنوان القسم','Section title','⭐','2025-12-31 11:54:45','2025-12-31 18:44:44'),(42,'feature_1','الميزة الأولى','Feature 1','زيادة عدد العملاء','Increase Customer Base','features','الميزة الأولى','First feature','✅','2025-12-31 11:54:45','2025-12-31 18:44:44'),(43,'feature_2','الميزة الثانية','Feature 2','ضمان ولاء العملاء','Ensure Customer Loyalty','features','الميزة الثانية','Second feature','✅','2025-12-31 11:54:45','2025-12-31 18:44:44'),(44,'feature_3','الميزة الثالثة','Feature 3','نمو حجم المبيعات','Sales Volume Growth','features','الميزة الثالثة','Third feature','✅','2025-12-31 11:54:45','2025-12-31 18:44:44'),(45,'feature_4','الميزة الرابعة','Feature 4','تعويض الأرباح المفقودة','Compensate Lost Profits','features','الميزة الرابعة','Fourth feature','✅','2025-12-31 11:54:45','2025-12-31 18:44:44'),(46,'feature_5','الميزة الخامسة','Feature 5','السيطرة على العلامات التجارية','Brand Control','features','الميزة الخامسة','Fifth feature','✅','2025-12-31 11:54:45','2025-12-31 18:44:44'),(47,'feature_6','الميزة السادسة','Feature 6','منصة بث حر غير محدود','Unlimited Free Broadcasting Platform','features','الميزة السادسة','Sixth feature','✅','2025-12-31 11:54:45','2025-12-31 18:44:44'),(48,'returns_title','عنوان قسم العوائد المالية','Returns Section Title','العوائد المالية المتوقعة','Expected Financial Returns','financial','عنوان القسم','Section title','💰','2025-12-31 11:54:45','2025-12-31 18:45:00'),(49,'returns_daily_label','عنوان العائد اليومي','Daily Return Label','يومياً','Daily','financial','تسمية العائد اليومي','Daily label','📅','2025-12-31 11:54:45','2025-12-31 18:45:00'),(50,'returns_daily_value','قيمة العائد اليومي','Daily Return Value','$1.5M','$1.5M','financial','قيمة العائد اليومي','Daily value','💵','2025-12-31 11:54:45','2025-12-31 18:45:00'),(51,'returns_daily_desc','وصف العائد اليومي','Daily Return Description','يومياً: 1.5 مليون دولار','Daily: $1.5 Million','financial','وصف العائد اليومي','Daily description','📝','2025-12-31 11:54:45','2025-12-31 18:45:00'),(52,'returns_monthly_label','عنوان العائد الشهري','Monthly Return Label','شهرياً','Monthly','financial','تسمية العائد الشهري','Monthly label','📆','2025-12-31 11:54:45','2025-12-31 18:45:00'),(53,'returns_monthly_value','قيمة العائد الشهري','Monthly Return Value','$45M','$45M','financial','قيمة العائد الشهري','Monthly value','💵','2025-12-31 11:54:45','2025-12-31 18:45:00'),(54,'returns_monthly_desc','وصف العائد الشهري','Monthly Return Description','شهرياً: 45 مليون دولار','Monthly: $45 Million','financial','وصف العائد الشهري','Monthly description','📝','2025-12-31 11:54:45','2025-12-31 18:45:00'),(55,'returns_yearly_label','عنوان العائد السنوي','Yearly Return Label','سنوياً','Yearly','financial','تسمية العائد السنوي','Yearly label','📅','2025-12-31 11:54:45','2025-12-31 18:45:00'),(56,'returns_yearly_value','قيمة العائد السنوي','Yearly Return Value','$540M','$540M','financial','قيمة العائد السنوي','Yearly value','💵','2025-12-31 11:54:45','2025-12-31 18:45:00'),(57,'returns_yearly_desc','وصف العائد السنوي','Yearly Return Description','سنوياً: 540 مليون دولار','Yearly: $540 Million','financial','وصف العائد السنوي','Yearly description','📝','2025-12-31 11:54:45','2025-12-31 18:45:00'),(58,'returns_total_label','عنوان العائد الإجمالي','Total Return Label','مع 6 شركات','With 6 Companies','financial','تسمية المجموع','Total label','💰','2025-12-31 11:54:45','2025-12-31 18:45:00'),(59,'returns_total_value','قيمة العائد الإجمالي','Total Return Value','$3.24B','$3.24B','financial','قيمة المجموع','Total value','💵','2025-12-31 11:54:45','2025-12-31 18:45:00'),(60,'returns_total_desc','وصف العائد الإجمالي','Total Return Description','مع 6 شركات اتصالات: 3.24 مليار دولار سنوياً','With 6 telecom companies: $3.24 Billion annually','financial','وصف المجموع','Total description','📝','2025-12-31 11:54:45','2025-12-31 18:45:00'),(61,'projects_title','عنوان قسم المشاريع','Projects Section Title','مشاريعنا','Our Projects','projects','عنوان القسم','Section title','🏗️','2025-12-31 11:54:45','2025-12-31 18:45:21'),(62,'projects_subtitle','عنوان فرعي لقسم المشاريع','Projects Section Subtitle','اكتشف مشاريع نسمة برزان المبتكرة','Discover Nesma Barzan\'s innovative projects','projects','العنوان الفرعي','Section subtitle','📝','2025-12-31 11:54:45','2025-12-31 18:45:21'),(63,'contact_title','عنوان قسم التواصل','Contact Section Title','تواصل معنا','Contact Us','contact','عنوان القسم','Section title','📞','2025-12-31 11:54:45','2025-12-31 18:45:21'),(64,'contact_subtitle','عنوان فرعي لقسم التواصل','Contact Section Subtitle','نحن هنا للإجابة على استفساراتكم ومناقشة فرص الشراكة والاستثمار','We are here to answer your inquiries and discuss partnership and investment opportunities','contact','العنوان الفرعي','Section subtitle','📝','2025-12-31 11:54:45','2025-12-31 18:45:21'),(65,'contact_form_name','حقل الاسم','Name Field','الاسم','Name','contact','حقل الاسم','Name field','👤','2025-12-31 11:54:45','2025-12-31 18:45:21'),(66,'contact_form_email','حقل البريد الإلكتروني','Email Field','البريد الإلكتروني','Email','contact','حقل البريد','Email field','📧','2025-12-31 11:54:45','2025-12-31 18:45:21'),(67,'contact_form_phone','حقل الهاتف','Phone Field','رقم الهاتف','Phone Number','contact','حقل الهاتف','Phone field','📱','2025-12-31 11:54:45','2025-12-31 18:45:21'),(68,'contact_form_message','حقل الرسالة','Message Field','الرسالة','Message','contact','حقل الرسالة','Message field','💬','2025-12-31 11:54:45','2025-12-31 18:45:21'),(69,'contact_form_button','زر الإرسال','Submit Button','إرسال','Send','contact','زر الإرسال','Submit button','📤','2025-12-31 11:54:45','2025-12-31 18:45:21'),(70,'contact_phone_label','عنوان الهاتف','Phone Label','الهاتف','Phone','contact_info','تسمية الهاتف','Phone label','📞','2025-12-31 11:54:45','2025-12-31 18:45:21'),(71,'contact_phone_value','رقم الهاتف','Phone Value','+966 555 499 991','+966 555 499 991','contact_info','رقم الهاتف','Phone number','📱','2025-12-31 11:54:45','2025-12-31 18:45:21'),(72,'contact_email_label','عنوان البريد','Email Label','البريد الإلكتروني','Email','contact_info','تسمية البريد','Email label','📧','2025-12-31 11:54:45','2025-12-31 18:45:21'),(73,'contact_email_value','البريد الإلكتروني','Email Value','info@shheer.com','info@shheer.com','contact_info','البريد الإلكتروني','Email address','✉️','2025-12-31 11:54:45','2025-12-31 18:45:21'),(74,'contact_website_label','عنوان الموقع','Website Label','الموقع الإلكتروني','Website','contact_info','تسمية الموقع','Website label','🌐','2025-12-31 11:54:45','2025-12-31 18:45:21'),(75,'contact_website_value','رابط الموقع','Website Value','www.shheer.com','www.shheer.com','contact_info','عنوان الموقع','Website URL','🔗','2025-12-31 11:54:45','2025-12-31 18:45:21'),(76,'contact_address_label','عنوان العنوان','Address Label','العنوان','Address','contact_info','تسمية العنوان','Address label','📍','2025-12-31 11:54:45','2025-12-31 18:45:21'),(77,'contact_address_value','العنوان','Address Value','الرياض، المملكة العربية السعودية','Riyadh, Saudi Arabia','contact_info','العنوان','Address','🏢','2025-12-31 11:54:45','2025-12-31 18:45:21'),(78,'footer_copyright','حقوق النشر','Copyright','© 2025 نسمة برزان التجارية. جميع الحقوق محفوظة.','© 2025 Nesma Barzan Trading. All rights reserved.','footer','حقوق النشر','Copyright text','©️','2025-12-31 11:54:45','2025-12-31 18:45:21'),(79,'footer_company_name','اسم الشركة','Company Name','نسمة برزان التجارية','Nesma Barzan Trading','footer','اسم الشركة','Company name','🏢','2025-12-31 11:54:45','2025-12-31 18:45:21'),(80,'footer_tagline','شعار الشركة','Company Tagline','رواد في تطوير الأعمال والابتكارات','Pioneers in business development and innovations','footer','شعار الشركة','Company tagline','💫','2025-12-31 11:54:45','2025-12-31 18:45:21'),(99,'hero_logo','اللوجو الثاني','Second Logo','/uploads/z1wRDuCx7gjXbssrSJge--03.png','/uploads/z1wRDuCx7gjXbssrSJge--03.png','hero',NULL,NULL,'🎨','2025-12-31 19:13:30','2025-12-31 20:17:21'),(101,'preloader_logo','لوجو البري لود','Preloader Logo','/uploads/IxJnUKschzO2sLctZY3ES-03.png','/uploads/IxJnUKschzO2sLctZY3ES-03.png','preloader',NULL,NULL,'⏳','2025-12-31 19:23:28','2025-12-31 20:01:38'),(104,'preloader_color','لون دائرة التحميل','Loading Circle Color','#1e87a6','#1e87a6','preloader','لون الدائرة المتحركة في شاشة التحميل','Color of animated circle in loading screen','🎨','2025-12-31 19:48:13','2025-12-31 19:55:02');
/*!40000 ALTER TABLE `site_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `type` enum('text','number','boolean','image','json') COLLATE utf8mb4_unicode_ci DEFAULT 'text',
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'general',
  `labelAr` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `labelEn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` VALUES (1,'site_logo','/uploads/znHJDBrQrp0gLResrkoqZ-03.png','image','general','شعار الموقع','Site Logo','2025-12-31 09:56:08','2025-12-31 20:01:17'),(2,'site_name_ar','شهير ','text','general','اسم الموقع بالعربي','Site Name (Arabic)','2025-12-31 09:56:08','2025-12-31 19:52:49'),(3,'site_name_en','Shheer','text','general','اسم الموقع بالإنجليزي','Site Name (English)','2025-12-31 09:56:08','2025-12-31 19:53:05'),(4,'foundation_year','2005','number','general','سنة التأسيس','Foundation Year','2025-12-31 09:56:08','2025-12-31 09:56:08'),(5,'contact_phone','+966 555 499 991','text','contact','رقم الهاتف','Phone Number','2025-12-31 09:56:08','2025-12-31 09:56:08'),(6,'contact_email','info@shheer.com','text','contact','البريد الإلكتروني','Email','2025-12-31 09:56:08','2025-12-31 09:56:08'),(7,'contact_website','www.shheer.com','text','contact','الموقع الإلكتروني','Website','2025-12-31 09:56:08','2025-12-31 09:56:08'),(8,'contact_address_ar','الرياض، المملكة العربية السعودية','text','contact','العنوان (عربي)','Address (Arabic)','2025-12-31 09:56:08','2025-12-31 09:56:08'),(9,'contact_address_en','Riyadh, Saudi Arabia','text','contact','العنوان (إنجليزي)','Address (English)','2025-12-31 09:56:08','2025-12-31 09:56:08'),(11,'site_favicon','/uploads/qFn_eQX1Hj38SflZXe_ms-03.png','image','general','أيقونة الموقع','Site Favicon','2025-12-31 18:44:12','2025-12-31 20:01:24'),(14,'site_description_ar','','text','general','وصف الموقع بالعربي','Site Description (Arabic)','2025-12-31 18:44:44','2025-12-31 18:44:44'),(15,'site_description_en','','text','general','وصف الموقع بالإنجليزي','Site Description (English)','2025-12-31 18:44:44','2025-12-31 18:44:44'),(17,'copyright_text','','text','general','نص حقوق النشر','Copyright Text','2025-12-31 18:44:44','2025-12-31 18:44:44'),(24,'favicon','/favicon.ico','text','general',NULL,NULL,'2025-12-31 19:45:31','2025-12-31 19:45:31');
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openId` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` text COLLATE utf8mb4_unicode_ci,
  `email` varchar(320) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loginMethod` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT 'password',
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_openId_unique` (`openId`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `openId` (`openId`),
  UNIQUE KEY `openId_2` (`openId`),
  UNIQUE KEY `openId_3` (`openId`),
  UNIQUE KEY `openId_4` (`openId`),
  UNIQUE KEY `openId_5` (`openId`),
  UNIQUE KEY `openId_6` (`openId`),
  UNIQUE KEY `openId_7` (`openId`),
  UNIQUE KEY `openId_8` (`openId`),
  UNIQUE KEY `openId_9` (`openId`),
  UNIQUE KEY `openId_10` (`openId`),
  UNIQUE KEY `openId_11` (`openId`),
  UNIQUE KEY `openId_12` (`openId`),
  UNIQUE KEY `openId_13` (`openId`),
  UNIQUE KEY `openId_14` (`openId`),
  UNIQUE KEY `openId_15` (`openId`),
  UNIQUE KEY `openId_16` (`openId`),
  UNIQUE KEY `openId_17` (`openId`),
  UNIQUE KEY `openId_18` (`openId`),
  UNIQUE KEY `openId_19` (`openId`),
  UNIQUE KEY `openId_20` (`openId`),
  UNIQUE KEY `openId_21` (`openId`),
  UNIQUE KEY `openId_22` (`openId`),
  UNIQUE KEY `openId_23` (`openId`),
  UNIQUE KEY `openId_24` (`openId`),
  UNIQUE KEY `openId_25` (`openId`),
  UNIQUE KEY `openId_26` (`openId`),
  UNIQUE KEY `openId_27` (`openId`),
  UNIQUE KEY `openId_28` (`openId`),
  UNIQUE KEY `openId_29` (`openId`),
  UNIQUE KEY `openId_30` (`openId`),
  UNIQUE KEY `openId_31` (`openId`),
  UNIQUE KEY `openId_32` (`openId`),
  UNIQUE KEY `openId_33` (`openId`),
  UNIQUE KEY `openId_34` (`openId`),
  UNIQUE KEY `openId_35` (`openId`),
  UNIQUE KEY `openId_36` (`openId`),
  UNIQUE KEY `openId_37` (`openId`),
  UNIQUE KEY `openId_38` (`openId`),
  UNIQUE KEY `openId_39` (`openId`),
  UNIQUE KEY `openId_40` (`openId`),
  UNIQUE KEY `openId_41` (`openId`),
  UNIQUE KEY `openId_42` (`openId`),
  UNIQUE KEY `openId_43` (`openId`),
  UNIQUE KEY `openId_44` (`openId`),
  UNIQUE KEY `openId_45` (`openId`)
) ENGINE=InnoDB AUTO_INCREMENT=856 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user-1','admin','$2b$10$WqXuXnDbSzWcHjOZ90ffLeVFGwQSHj.yvLMdX9RRKFoZG3qzpfrn2','Administrator','admin@nesmabarzan.com',NULL,'password','admin','2025-12-31 09:56:08','2026-01-01 13:02:48','2026-01-01 13:02:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50112 SET @disable_bulk_load = IF (@is_rocksdb_supported, 'SET SESSION rocksdb_bulk_load = @old_rocksdb_bulk_load', 'SET @dummy_rocksdb_bulk_load = 0') */;
/*!50112 PREPARE s FROM @disable_bulk_load */;
/*!50112 EXECUTE s */;
/*!50112 DEALLOCATE PREPARE s */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-01 13:42:50
