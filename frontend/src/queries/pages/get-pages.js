import { gql } from '@apollo/client'
import { PAGES_COUNT } from '../../utils/slug'

export const GET_PAGES_URI = gql`
	query GET_PAGES_URI {
		pages: pages(first: ${PAGES_COUNT}) {
			nodes {
				id
				uri
			}
		}
	}
`
