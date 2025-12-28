CREATE TABLE `features` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titleAr` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`descriptionAr` text,
	`descriptionEn` text,
	`value` varchar(100),
	`icon` varchar(50),
	`category` enum('mechanism','advantage','revenue') NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `features_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hero_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`labelAr` varchar(100) NOT NULL,
	`labelEn` varchar(100) NOT NULL,
	`value` varchar(50) NOT NULL,
	`suffix` varchar(10),
	`icon` varchar(50),
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hero_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `navigation_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`labelAr` varchar(100) NOT NULL,
	`labelEn` varchar(100) NOT NULL,
	`url` varchar(255) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`parentId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `navigation_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(100) NOT NULL,
	`value` text,
	`type` enum('text','number','image','json','boolean') NOT NULL DEFAULT 'text',
	`category` varchar(50) NOT NULL,
	`labelAr` varchar(255),
	`labelEn` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_settings_key_unique` UNIQUE(`key`)
);
