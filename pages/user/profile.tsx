import { useQuery } from '@apollo/client'
import { UserDocument } from 'shared/types/user'
import { GET_USER_ById_QUERY } from 'graphql/queries'

import Typography from '@mui/material/Typography'

export type GetUser = {
	user: UserDocument
}


const UserProfile = () => {
	const { loading, data, error } = useQuery<GetUser>(GET_USER_ById_QUERY)

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
