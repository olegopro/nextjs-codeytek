// @ts-nocheck
import { useLazyQuery } from '@apollo/client'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import client from '../src/apollo/client'
import Footer from '../src/components/layout/footer'
import Header from '../src/components/layout/header'
import LoadMorePosts from '../src/components/news/load-more-posts'
import SearchBox from '../src/components/search/search-box'
import { GET_MENUS } from '../src/queries/get-menus'
import { GET_SEARCH_RESULTS_WITH_TOTAL_PAGES } from '../src/queries/search/get-search-results'
import { PER_PAGE_FIRST } from '../src/utils/pagination'
import { handleRedirectsAndReturnData } from '../src/utils/slug'

export default function Search({ data }) {
	const { header, footer, headerMenus, footerMenus, slug } = data || {}
	const [searchQuery, setSearchQuery] = useState('')
	const [searchError, setSearchError] = useState()
	const [queryResultPosts, setQueryResultPosts] = useState({})
	const [showResultInfo, setShowResultInfo] = useState(false)

	const [fetchPosts, { loading }] = useLazyQuery(GET_SEARCH_RESULTS_WITH_TOTAL_PAGES, {
		notifyOnNetworkStatusChange: true,
		onCompleted: data => {
			setQueryResultPosts(data?.posts ?? {})
			setShowResultInfo(true)
		},
		onError: error => {
			setSearchError(error?.graphQLErrors ?? '')
		}
	})

	const handleSearchFormSubmit = event => {
		event.preventDefault()
		setShowResultInfo(false)
		if (isEmpty(searchQuery)) {
			setSearchError('Please enter text to search')
			setQueryResultPosts({})
			return null
		}

		setSearchError('')
		fetchPosts({
			variables: {
				first: PER_PAGE_FIRST,
				after: null,
				query: searchQuery
			}
		})
	}

	return (
		<>
			<Header header={header} headerMenus={headerMenus?.edges ?? []} slug={slug} />
			<SearchBox
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				handleSearchFormSubmit={handleSearchFormSubmit}
			/>
			<LoadMorePosts
				classes="md:container px-5 py-12 mx-auto min-h-almost-screen"
				posts={queryResultPosts}
				graphQLQuery={GET_SEARCH_RESULTS}
				searchQuery={searchQuery}
			/>
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
