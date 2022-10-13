import { gql } from 'apollo-server-micro'

export const userTypeDefs = gql`
	extend type Query {
		user: User
		users: [User]!
	}
	extend type Mutation {
		signup(input: userInput): User
	}

	input userInput {
		name: String!
		email: String!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		createdAt: String!
		updatedAt: String!
	}
`