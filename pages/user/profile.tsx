import Typography from '@mui/material/Typography'
import { gql, useQuery } from '@apollo/client'

import { User } from 'shared/types/user'


export type GetUser = {
	user: User
}

export const GET_USER = gql`
	query {
		user {
			name
			email
		}
	}
`

const UserProfile = () => {
	const { loading, data, error } = useQuery<GetUser>(GET_USER)

	if(!data || error) return <>Loading: {loading}</>

	return (
		<>
			<Typography>User Profile</Typography>

			<Typography>{data.user.name}</Typography>
			<Typography>{data.user.email}</Typography>

			
		</>
	)
}
export default UserProfile
