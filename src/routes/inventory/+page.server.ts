import type { Actions, PageServerData } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from "drizzle-orm";

export const load = async ({locals})  => {
	const sessionId = locals.session?.id!;
	const [userId] = await db.select({userId: table.session.userId}).from(table.session).where(eq(table.session.id, sessionId)).limit(1);
	const allInventories = await db.query.inventory_link.findMany({
		columns: {userId: false, inventoryId: false},
		where: eq(table.inventory_link.userId, userId.userId),
		with: {
			inventory: true
		}
	});
	return {
		inventories: allInventories
	};
};

export const actions: Actions = {
	create: async (event) => {
		const sessionId = event.locals.session?.id!;
		const [userId] = await db.select({userId: table.session.userId}).from(table.session).where(eq(table.session.id, sessionId)).limit(1)
		const formData = await event.request.formData();
		const name = formData.get('name')?.toString();
		const hi = {
			name: name ?? '',
		}

		const [inventoryId] = await db.insert(table.inventoryTable).values(hi).returning({id: table.inventoryTable.id});
		console.log(userId.userId,inventoryId.id);
		await db.insert(table.inventory_link).values({userId: userId.userId, inventoryId: inventoryId.id })
	}
};