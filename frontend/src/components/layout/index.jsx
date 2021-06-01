import { isEmpty } from 'lodash'
import Head from 'next/head'
import { sanitize } from '../../utils/DOMPurify'
import Seo from '../seo'
import Footer from './footer'
import Header from './header'
// import Link from 'next/link'

const Layout = ({ data, children }) => {
	if (isEmpty(data?.page)) {
		return null
	}

	const { page, header, footer, headerMenus, footerMenus } = data || {}

	return (
		<div>
			<Seo seo={page?.seo} uri={page?.uri} />
			<Head>
				<link rel="shortcut icon" href={header.favicon} />
				{page?.seo?.schemaDetails && (
					<script
						type="application/ld+json"
						className="yoast-schema-graph"
						key="yoastSchema"
						dangerouslySetInnerHTML={{ __html: sanitize(page?.seo?.schemaDetails) }}
					/>
				)}
			</Head>

			<Header header={header} headerMenus={headerMenus?.edges} />
			<div className="h-almost-screen">{children}</div>
			<Footer footer={footer} footerMenus={footerMenus?.edges} />
		</div>
	)
}

export default Layout
