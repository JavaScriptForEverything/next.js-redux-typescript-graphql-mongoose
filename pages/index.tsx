import { useQuery } from '@apollo/client'
import { UserDocument } from 'shared/types/user'
import { GET_USERS_QUERY } from 'graphql/queries'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type GetUsers = {
	users: UserDocument[]
}

const HomePage = () => {
	const { data } = useQuery<GetUsers>(GET_USERS_QUERY) 
	if( !data ) return <>Loading</>

	return (
		<Box sx={{ minHeight: 300 }}>
			<Typography> Home Page with global Layout </Typography>			
			<Typography> Abut About Page is component based Layout </Typography>			

			<pre>
				{JSON.stringify(data.users, null, 2)}
			</pre>
		</Box>
	)
}
export default HomePage
