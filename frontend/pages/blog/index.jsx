import client from '../../src/apollo/client'
import Layout from '../../src/components/layout'
import { PER_PAGE_FIRST, totalPagesCount } from '../../src/utils/pagination'
import Pagination from '../../src/components/blog/pagination'
import Posts from '../../src/components/blog/posts'
import { handleRedirectsAndReturnData } from '../../src/utils/slug'
import { GET_POSTS } from '../../src/queries/posts/get-posts'

const Blog = ({ data }) => {
	const pagesCount = totalPagesCount(data?.posts?.pageInfo?.offsetPagination?.total ?? 0)
	return (
		<Layout data={data}>
			<Posts posts={data?.posts?.edges ?? []} />
			<Pagination pagesCount={pagesCount} postName="blog" />
		</Layout>
	)
}

export default Blog

export async function getStaticProps() {
	const { data, errors } = await client.query({
		query: GET_POSTS,
		variables: {
			uri: '/blog/',
			perPage: PER_PAGE_FIRST,
			offset: null
		}
	})

	const defaultProps = {
		props: {
			data: data || {}
		},

		revalidate: 1
	}

	return handleRedirectsAndReturnData(defaultProps, data, errors, 'posts')
}
