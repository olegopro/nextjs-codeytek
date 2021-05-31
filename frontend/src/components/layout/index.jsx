import Footer from '../footer'
import Header from '../header'
import Head from 'next/head'
// import Link from 'next/link'

const Layout = ({ data, children }) => {
	console.log(data)
	return (
		<div>
			<Head>
				<link rel="shortcut icon" href={data.header.favicon} />
			</Head>

			<Header header={data?.header} headerMenus={data?.menus?.headerMenus} />
			{children}
			<Footer footer={data?.footer} footerMenus={data?.menus?.footerMenus} />
		</div>
	)
}

export default Layout
