CREATE TABLE `bots` (
	`id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`token` text NOT NULL,
	`flow` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bots_id_unique` ON `bots` (`id`);