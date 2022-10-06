import type { NextPageWithLayout } from './_app'

import Typography from '@mui/material/Typography'
import Footer from './layout/footer'


const About: NextPageWithLayout = () => {

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
			<Typography paragraph>component Based Header instead of Global Header</Typography>

			{Page}

			<Footer />
		</>
	)
}