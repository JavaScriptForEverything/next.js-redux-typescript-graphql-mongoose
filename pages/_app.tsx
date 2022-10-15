import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import { Provider as ReduxProvider } from 'react-redux'
import { wrapper } from '@store/index'
import Layout from '@layout/index'


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




const MyApp = ({ Component, ...rest }: AppPropsWithLayout) => {
	const { store, props } = wrapper.useWrappedStore(rest)
	const { pageProps } = props

	// Step-2: Wrap Component Base Layout under ApolloProvider
	if(Component.getLayout) return (
		<ReduxProvider store={store}>
			<ApolloProvider client={client}>
				Component.getLayout(<Component {...pageProps} />)
			</ApolloProvider>
		</ReduxProvider>
	)


	// Step-1: Wrap Global Layout under ApolloProvider
  return (
		<ReduxProvider store={store}>
			<ApolloProvider client={client}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ApolloProvider>
		</ReduxProvider>
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