import client from '../src/apollo/client'
import Layout from '../src/components/layout'
import { GET_PAGE } from '../src/queries/pages/get-page'
import { handleRedirectsAndReturnData } from '../src/utils/slug'

export default function Home({ data }) {
	return <Layout data={data}>content</Layout>
}

export async function getStaticProps() {
	const { data, errors } = await client.query({
		query: GET_PAGE,
		variables: {
			uri: '/'
		}
	})

	const defaultProps = {
		props: {
			data: data || {}
		},
		revalidate: 1
	}

	return handleRedirectsAndReturnData(defaultProps, data, errors, 'page')
}
