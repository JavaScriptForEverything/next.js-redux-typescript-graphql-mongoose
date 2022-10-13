import { gql } from 'apollo-server-micro';
import { userTypeDefs } from './userTypeDefs';


export const rootTypeDefs = gql`
	type Query {
		_: String
	}
`

export const typeDefs = [ rootTypeDefs, userTypeDefs ]