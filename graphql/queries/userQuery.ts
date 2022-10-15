import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
	query getAllUsers {
		users {
			id
			name
			email
			createdAt
			updatedAt
		}
	}
`


export const GET_USER_ById_QUERY = gql`
	query {
		user(userId: "634835832a9d536d8845fe0b") {
			id
			name
			email
			createdAt
			updatedAt
		}
	}
`