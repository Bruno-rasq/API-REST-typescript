import { z } from "zod"

export const userSchemaInput = z.object({
	name: z.string(),
	email: z.string().email()
})