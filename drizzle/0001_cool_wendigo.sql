CREATE TABLE `images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`url` text NOT NULL,
	`fileKey` varchar(255) NOT NULL,
	`mimeType` varchar(100),
	`size` int,
	`altTextAr` varchar(255),
	`altTextEn` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titleAr` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`descriptionAr` text,
	`descriptionEn` text,
	`imageUrl` text,
	`imageKey` varchar(255),
	`isActive` boolean NOT NULL DEFAULT true,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(100) NOT NULL,
	`titleAr` text,
	`titleEn` text,
	`contentAr` text,
	`contentEn` text,
	`section` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_content_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_content_key_unique` UNIQUE(`key`)
);
