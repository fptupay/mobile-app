import { z } from 'zod'

export const transferVerifySchema = z.object({
  data: z.string(),
  amount: z.string(),
  content: z.string()
})

export const transferConfirmSchema = z.object({
  fund_transfer_id: z.string(),
  otp: z.string()
})

export type TransferVerifySchema = z.infer<typeof transferVerifySchema>
export type TransferConfirmSchema = z.infer<typeof transferConfirmSchema>
