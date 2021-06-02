import Nav from './nav'
import { isEmpty } from 'lodash'

const Header = ({ header, headerMenus, slug = null }) => {
	if (isEmpty(headerMenus)) {
		return null
	}

	return (
		<header>
			<Nav header={header} headerMenus={headerMenus} />
		</header>
	)
}

export default Header
