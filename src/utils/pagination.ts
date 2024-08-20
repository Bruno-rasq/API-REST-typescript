type Pagination = {
	path: string,
	page: number,
	next: number,
	prev: number,
	last: number,
	total: number
}

export const next = (page: number, pages: number) =>  {
	return Number(page) + 1 >= pages ? pages : Number(page) + 1
}

export const prev = (page: number) => {
	return Number(page) - 1 >= 1 ? Number(page) - 1 : 1
}

export const pagination = (
	path: string, 
	page: number, 
	limit: number, 
	total: number
): Pagination => {
	const pages = Math.ceil( total / Number(limit))
	return {
		path,
		page,
		next: next(Number(page),pages),
		prev: prev(Number(page)),
		last: pages,
		total
	}
}