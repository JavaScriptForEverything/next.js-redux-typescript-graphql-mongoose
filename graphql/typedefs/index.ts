import { gql } from 'apollo-server-micro';
import { userTypeDefs } from './userTypeDefs';


export const rootTypeDefs = gql`
	type Query {
		_: String
	}

	type Mutation {
		_: String
	}
`

export const typeDefs = [ rootTypeDefs, userTypeDefs ]