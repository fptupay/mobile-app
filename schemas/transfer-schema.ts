import { z } from 'zod'

export const transferVerifySchema = z.object({
  data: z.string(),
  amount: z.string(),
  content: z.string()
})

export type TransferVerifySchema = z.infer<typeof transferVerifySchema>
