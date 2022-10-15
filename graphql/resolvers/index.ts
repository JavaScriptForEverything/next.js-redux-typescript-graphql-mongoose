import { userResolvers } from '@graphql/resolvers/userResolvers'

const rootResolvers = {}

export const resolvers = [ 
	rootResolvers,
	userResolvers
]

