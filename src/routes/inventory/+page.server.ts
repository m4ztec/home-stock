import type { Actions, PageServerData } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from "drizzle-orm";

export const load: PageServerData = ()  => {
	return {
		post: {
			title: `Title for hi goes here`,
			content: `Content for  hi goes here`
		},
		inventories: {

		}
	};
};

export const actions: Actions = {
	cretae: async (event) => {
		const sessionId = event.locals.session?.id!;
		const userId = db.select({userId: table.session.userId}).from(table.session).where(eq(table.session.id, sessionId));
		const formData = await event.request.formData();
		const name = formData.get('name')?.toString();
		const hi = {
			name: name ?? '',
		}

	const inventoryId =	db.insert(table.inventoryTable).values(hi).returning({id: table.inventoryTable.id});
	db.insert(table.inventory_link).values({})
	}
};