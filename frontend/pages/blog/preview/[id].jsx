import client from '../../../src/apollo/client'
import Layout from '../../../src/components/layout'
import { GET_POST_BY_ID } from '../../../src/queries/posts/get-posts'
import { getAuthToken } from '../../../src/utils/cookies'
import { sanitize } from '../../../src/utils/miscellaneous.js'
import { getLoginPreviewRedirectUrl } from '../../../src/utils/redirects'
import { handleRedirectsAndReturnData } from '../../../src/utils/slug'

const PostPreview = ({ data }) => {
	return (
		// @ts-ignore
		<Layout data={data} isPost>
			<div dangerouslySetInnerHTML={{ __html: sanitize(data?.post?.content ?? '') }} />
		</Layout>
	)
}

export default PostPreview

export async function getServerSideProps(context) {
	const authToken = getAuthToken(context.req)

	const { params } = context || {}
	const { data, errors } = await client.query({
		query: GET_POST_BY_ID,
		variables: {
			id: Number(params?.id ?? '')
		},
		context: {
			headers: {
				authorization: authToken ? `Bearer ${authToken}` : ''
			}
		}
	})

	const defaultProps = {
		props: {
			data: data || {}
		}
	}

	const loginRedirectURL = getLoginPreviewRedirectUrl('post', params?.id ?? '')

	return handleRedirectsAndReturnData(defaultProps, data, errors, 'post', true, loginRedirectURL)
}
