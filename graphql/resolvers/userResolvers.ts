import User from '../../server/models/userModel'

type InputProps = {
	name: string
	email: string
}
type ArgumentProps = {
	input: InputProps
}

export const userResolvers = {
	Query: {
		user: async (_: undefined, arg: { userId: string }) => {
			const user = await User.findById(arg.userId)
			// console.log(user)
			return user

			// return {
			// 	id: '1',
			// 	name: 'riajul',
			// 	email: 'riajul@gmail.com'
			// }
		},

		users: async () => {
			const users = await User.find()
			return users
		}

	}, 	// end of Query

	Mutation: {
		signup: async (_: undefined, arg: ArgumentProps ) => {
			const user = await User.create(arg.input)
			console.log( user.id )
			return user
		}
	}
}