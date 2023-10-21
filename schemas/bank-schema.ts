import { z } from 'zod'

export const bankLinkVerifySchema = z.object({
  bank_code: z.string(),
  card_no: z.string(),
  identity: z.string(),
  holder_name: z.string(),
  identity_type: z.enum(['CCCD', 'CMND']),
  link_type: z.enum(['ACCOUNT', 'CARD']),
  phone_number: z.string(),
  issue_date: z.string().optional()
})

export const bankLinkConfirmSchema = z.object({
  bank_code: z.string(),
  trans_id: z.string(),
  otp: z.string()
})

export type BankLinkVerifySchema = z.infer<typeof bankLinkVerifySchema>
export type BankLinkConfirmSchema = z.infer<typeof bankLinkConfirmSchema>
