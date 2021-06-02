import { isArray, isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import Post from '../post'

const Posts = ({ posts }) => {
	if (isEmpty(posts) && !isArray(posts)) {
		return null
	}

	return (
		<div className="flex flex-wrap -mb-4">
			{posts.map(post => {
				return (
					<div key={post?.node?.id ?? ''} className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2">
						<Post post={post?.node} />
					</div>
				)
			})}
		</div>
	)
}

Posts.propTypes = {
	posts: PropTypes.array
}

Posts.defaultProps = {
	posts: []
}

export default Posts
