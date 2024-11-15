import { sql } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const botTable = sqliteTable('bots', {
  id: text('id').unique().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  token: text('token').notNull(),
  flow: text('flow').notNull(),
});
