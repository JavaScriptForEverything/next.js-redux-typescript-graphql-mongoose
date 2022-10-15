import Footer from '@layout/footer'
import Header from '@layout/header'

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
