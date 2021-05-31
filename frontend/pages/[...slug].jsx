import client from '../src/apollo/client'
import { GET_PAGES_URI } from '../src/queries/pages/get-pages'
import { isEmpty } from 'lodash'
import { GET_PAGE } from '../src/queries/pages/get-page'
import { useRouter } from 'next/router'

const Pages = ({ data }) => {
	console.log(data)

	const router = useRouter()
	if (router.isFallback) {
		return <div>Loading...</div>
	}

	// @ts-ignore
	return router?.query?.slug.join('/')
}

export default Pages

export async function getStaticProps({ params }) {
	const { data } = await client.query({
		query: GET_PAGE,
		variables: {
			uri: params?.slug.join('/')
		}
	})

	return {
		props: {
			data: {
				header: data?.header || [],
				menus: {
					headerMenus: data?.headerMenus?.edges || [],
					footerMenus: data?.footerMenus?.edges || []
				},
				footer: data?.footer || [],
				page: data?.page ?? {},
				path: params?.slug.join('/')
			}
		}
	}
}

export async function getStaticPaths() {
	const { data } = await client.query({
		query: GET_PAGES_URI
	})

	const pathsData = []

	data?.pages?.nodes &&
		data?.pages?.nodes.map(page => {
			if (!isEmpty(page?.uri)) {
				const slugs = page?.uri?.split('/').filter(pageSlug => pageSlug)
				pathsData.push({ params: { slug: slugs } })
			}
		})

	return {
		paths: pathsData,
		fallback: true
	}
}
