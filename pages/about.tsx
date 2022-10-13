import type { NextPageWithLayout } from './_app'
import { useQuery } from '@apollo/client'

import { GetUser, GET_USER } from './user/profile'

import Typography from '@mui/material/Typography'
import Footer from './layout/footer'


const About: NextPageWithLayout = () => {

	const { data } = useQuery<GetUser>(GET_USER)

	console.log(data)

	return (
		<>
			<Typography>About Page with component based layout</Typography>
		</>
	)
}
export default About




// Set Component Level Layout
About.getLayout = ( Page: React.ReactElement ) => {
	return (
		<>
			<Typography variant='h4'>component Based Header layout </Typography>

			{Page}

			<Footer />
		</>
	)
}