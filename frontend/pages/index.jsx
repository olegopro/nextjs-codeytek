import client from '../src/apollo/client'
import { GET_MENUS } from '../src/queries/get-menus'

export default function Index({ menus }) {
	console.log(menus)
	return (
		<div>
			<h3 className="text-lg leading-6 font-medium text-gray-900">Applicant Information</h3>
		</div>
	)
}

export const getStaticProps = async ctx => {
	const { data, loading, networkStatus } = await client.query({
		query: GET_MENUS
	})

	return {
		props: {
			menus: { headerMenus: data?.headerMenus?.edges, footerMenus: data?.footerMenus?.edges }
		}
	}
}
