import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import Layout from './layout'


// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P={}, IP=P> = NextPage<P, IP> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {

	if(Component.getLayout) return Component.getLayout(<Component {...pageProps} />)

  return (
		<>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}
export default MyApp


/*
const  About: NextPageWithLayout = () => <>About Page</>
export default About

// Set Component level Layout
About.getLayout = (Page: React.ReactElement) => {
	return (
		<>
		{Page}
		<Footer />
		</>
	)
}
*/