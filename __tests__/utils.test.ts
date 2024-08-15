import { next, prev } from "../src/utils/utils"

describe("utils", () => {
	test('if page == 2 and pages == 5, next should return 3', () => {
		expect(next(2, 5)).toBe(3)
	})

	test("page == 2 and pages == 3, prev  shoudl return 1", () => {
		expect(prev(2, 3)).toBe(1)
	})
})