import type { Actions, PageServerData } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

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
		const formData = await event.request.formData();
		const name = formData.get('name');


	}
};