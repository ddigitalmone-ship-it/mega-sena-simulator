CREATE TABLE `game_collections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`gameIds` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `game_collections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saved_games` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`numbers` json NOT NULL,
	`strategy` varchar(50),
	`ifr` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `saved_games_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`filename` varchar(255) NOT NULL,
	`originalName` varchar(255) NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`url` text NOT NULL,
	`mimeType` varchar(100) NOT NULL,
	`size` bigint NOT NULL,
	`fileType` enum('export','report','backup') NOT NULL DEFAULT 'export',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_files_id` PRIMARY KEY(`id`)
);
