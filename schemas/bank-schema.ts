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

export const bankAccountSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  bank_acc_hide: z.string(),
  bank_code: z.string(),
  phone_number: z.string(),
  is_default: z.boolean().nullable(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  created_at: z.string(),
  updated_at: z.string()
})

export const moneyVerifySchema = z.object({
  link_account_id: z.string(),
  amount: z.number(),
  content: z.string()
})

export const moneyConfirmSchema = z.object({
  link_account_id: z.string(),
  trans_id: z.string(),
  otp: z.string()
})

export type BankLinkVerifySchema = z.infer<typeof bankLinkVerifySchema>
export type BankLinkConfirmSchema = z.infer<typeof bankLinkConfirmSchema>
export type BankAccountSchema = z.infer<typeof bankAccountSchema>
export type MoneyVerifySchema = z.infer<typeof moneyVerifySchema>
export type MoneyConfirmSchema = z.infer<typeof moneyConfirmSchema>
