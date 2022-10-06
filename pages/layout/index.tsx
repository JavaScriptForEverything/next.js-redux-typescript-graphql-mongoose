import Footer from './footer'
import Header from './header'

type LayoutProps = {
	children: React.ReactElement
}
const Layout = ({ children }: LayoutProps ) => {

	return (
		<>
			<Header />
				{children}
			<Footer />
		</>
	)
}
export default Layout
