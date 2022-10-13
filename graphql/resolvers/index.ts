import { userResolvers } from './userResolvers'

const rootResolvers = {}

export const resolvers = [ 
	rootResolvers,
	userResolvers
]

