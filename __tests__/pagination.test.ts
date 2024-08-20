import { next, prev, pagination } from "../src/utils/pagination"

describe("utils", () => {
	test('if page == 2 and pages == 5, next should return 3', () => {
		expect(next(2, 5)).toBe(3)
	})

	test("page == 2 and pages == 3, prev  shoudl return 1", () => {
		expect(prev(2)).toBe(1)
	})

	test("should returning a pagination object", () => {
		const page = 2
		const limit = 5
		const total = 22
		const path = `user?page=${page}&limit${limit}`
		const pag = pagination(path, page, limit, total)

		expect(pag).toHaveProperty("path")
		expect(pag.path).toEqual(path)

		expect(pag.next).toEqual(page + 1)
		expect(pag.prev).toEqual(page - 1)
		expect(pag.page).toEqual(page)

		expect(pag).toHaveProperty("last")
		expect(pag.last).toEqual(Math.ceil(total / limit))

		expect(pag.total).toEqual(total)
	})
})