import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import { wrapper } from 'store'
import Layout from './layout'


// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P={}, IP=P> = NextPage<P, IP> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}


const client = new ApolloClient({
	uri: 'http://localhost:3000/api/graphql',
	cache: new InMemoryCache()
})




const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {

	// Step-2: Wrap Component Base Layout under ApolloProvider
	if(Component.getLayout) return (
		<ApolloProvider client={client}>
			Component.getLayout(<Component {...pageProps} />)
		</ApolloProvider>
	)


	// Step-1: Wrap Global Layout under ApolloProvider
  return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	)
}
// export default MyApp
export default wrapper.withRedux(MyApp)


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