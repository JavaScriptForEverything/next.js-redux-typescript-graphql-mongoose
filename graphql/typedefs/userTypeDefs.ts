import { gql } from 'apollo-server-micro';

export const userTypeDefs = gql`
	extend type Query {
		user: User!
	}

	type User {
		name: String!
		email: String!
	}
`