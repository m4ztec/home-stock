import type { PageServerData } from './$types';

export const load: PageServerData = ()  => {
	return {
		post: {
			title: `Title for hi goes here`,
			content: `Content for  hi goes here`
		}
	};
};