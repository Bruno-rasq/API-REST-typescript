export function next(page: number, pages: number) {
	return Number(page) + 1 >= pages ? pages : Number(page) + 1
}

export function prev(page: number, pages: number) {
	return Number(page) - 1 >= 1 ?Number(page) - 1 : 1
}