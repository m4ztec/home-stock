import {
	pgTable,
	serial,
	text,
	integer,
	timestamp,
	numeric,
	primaryKey
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const inventory = pgTable('inventory', {
	id: text('id').primaryKey(),
	name: text('name').notNull()
});

export const user_inventory_link = pgTable(
	'inventory_link',
	{
		userId: text('user_id')
			.notNull()
			.references(() => user.id),
		inventoryId: text('inventory_id')
			.notNull()
			.references(() => inventory.id)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.inventoryId] })
		};
	}
);

export const items = pgTable('items', {
	id: text('id').notNull().primaryKey(),
	inventoryId: text('inventory_id')
		.notNull()
		.references(() => inventory.id),
	name: text('name').notNull(),
	amount: integer('amount').$default(() => 0),
	desiredAmount: integer('desired_amount').$default(() => 0)
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Item = typeof items.$inferSelect;
