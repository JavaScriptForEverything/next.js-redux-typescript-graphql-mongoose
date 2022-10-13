export const userResolvers = {
	Query: {
		user: () => {
			return {
				name: 'riajul',
				email: 'riajul@gmail.com'
			}
		}
	}
}