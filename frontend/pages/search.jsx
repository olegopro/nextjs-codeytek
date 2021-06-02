import client from '../src/apollo/client'
import Footer from '../src/components/layout/footer'
import Header from '../src/components/layout/header'
import SearchBox from '../src/components/search/search-box'
import { GET_MENUS } from '../src/queries/get-menus'
import { handleRedirectsAndReturnData } from '../src/utils/slug'

export default function Search({ data }) {
	const { header, footer, headerMenus, footerMenus, slug } = data || {}
	return (
		<>
			<Header header={header} headerMenus={headerMenus?.edges ?? []} slug={slug} />
			<SearchBox />
			<Footer footer={footer} footerMenus={footerMenus?.edges} />
		</>
	)
}

export async function getStaticProps() {
	const { data, errors } = await client.query({
		query: GET_MENUS
	})

	const defaultProps = {
		props: {
			data: { ...data, slug: 'search' }
		},
		revalidate: 1
	}
	return handleRedirectsAndReturnData(defaultProps, data, errors, 'headerMenus')
}
