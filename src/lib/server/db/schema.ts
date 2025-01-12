import { relations } from 'drizzle-orm';
import {
	pgTable,
	serial,
	text,
	integer,
	timestamp,
	numeric,
	primaryKey,
	PgUUID,
	uuid
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

export const inventoryTable = pgTable('inventory', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull()
});

export const inventory_link = pgTable(
	'inventory_link',
	{
		inventoryId: uuid('inventory_id')
			.notNull()
			.references(() => inventoryTable.id),
		userId: text('user_id')
			.notNull()
			.references(() => user.id)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [ table.inventoryId, table.userId ]})
		};
	}
);

export const items = pgTable('items', {
	id: uuid('id').notNull().primaryKey(),
	inventoryId: uuid('inventory_id')
		.notNull()
		.references(() => inventoryTable.id),
	name: text('name').notNull(),
	amount: integer('amount').$default(() => 0),
	desiredAmount: integer('desired_amount').$default(() => 0)
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Item = typeof items.$inferSelect;

export type Inventory = typeof inventoryTable.$inferSelect;

//RELATIONS

export const inventoryLinkRelations = relations(inventory_link, ({one}) => {
	return {
		user: one(user, {
			fields: [inventory_link.userId],
			references: [user.id]
		}),
		inventory: one(inventoryTable, {
			fields: [inventory_link.inventoryId],
			references: [inventoryTable.id]
		})
	}
})

