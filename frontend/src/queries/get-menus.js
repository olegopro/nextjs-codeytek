import { gql } from '@apollo/client'
import MenuFragment from './fragments/menus'

export const GET_MENUS = gql`
	query MyQuery {
		headerMenus: menuItems(where: { location: HCMS_MENU_HEADER, parentId: "0" }) {
			edges {
				node {
					id
					label
					url
					path
					childItems {
						edges {
							node {
								...MenuFragment
							}
						}
					}
				}
			}
		}
		footerMenus: menuItems(where: { location: HCMS_MENU_HEADER, parentId: "0" }) {
			edges {
				node {
					...MenuFragment
				}
			}
		}
	}
	${MenuFragment}
`
