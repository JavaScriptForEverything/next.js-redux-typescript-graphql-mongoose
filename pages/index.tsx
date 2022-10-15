import { useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import { UserDocument } from '@shared/types/user'
import { GET_USERS_QUERY } from '@graphql/queries'
import { RootState, wrapper } from '@store/index'
import  * as userReducer from '@store/userReducer'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type GetUsers = {
	users: UserDocument[]
}

const HomePage = () => {
	const { user } = useSelector( (state: RootState) => state.user )
	console.log({ user })

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


export const getServerSideProps = wrapper.getServerSideProps( ({ dispatch }) => async () => {
	await dispatch(userReducer.getUserById())

	return { 				// return { props: {} } mandatory even though did not return anything
		props: { }
	}

})