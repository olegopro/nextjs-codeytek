export const PER_PAGE_FIRST = 9 // No of posts to be shown on first page.
export const PER_PAGE_REST = 12 // No of posts to be shown following page and after.

export const getPageOffset = pageNo => {
	let offset = 0
	pageNo = Number(pageNo)
	if (pageNo === 1) offset = 0
	else if (pageNo === 2) offset = PER_PAGE_FIRST
	else {
		offset = PER_PAGE_FIRST + (pageNo - 2) * PER_PAGE_REST
	}
	return offset
}

export const totalPagesCount = totalPostsCount => {
	return Math.ceil((totalPostsCount - PER_PAGE_FIRST) / PER_PAGE_REST + 1)
}

export const createPaginationLinks = (currentPage, totalPages) => {
	const paginationArray = []
	let countOfDotItems = 0

	if (!totalPages && totalPages <= 1) {
		return paginationArray
	}

	if (currentPage - 2 > 0) {
		paginationArray.push(currentPage - 2)
	}

	if (currentPage - 1 > 0) {
		paginationArray.push(currentPage - 1)
	}

	paginationArray.push(currentPage)

	if (totalPages >= currentPage + 1) {
		paginationArray.push(currentPage + 1)
	}

	if (totalPages >= currentPage + 2) {
		paginationArray.push(currentPage + 2)
	}

	if (paginationArray[0] - 1 > 1) {
		paginationArray.unshift('...')
		countOfDotItems += 1
	}

	if (totalPages - paginationArray[paginationArray.length - (2 - countOfDotItems)] > 2) {
		paginationArray.push('...')
	}

	if (paginationArray.indexOf(1) === -1) {
		paginationArray.unshift(1)
	}

	if (paginationArray.indexOf(totalPages) === -1) {
		paginationArray.push(totalPages)
	}

	return paginationArray
}
