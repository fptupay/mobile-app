import { z } from 'zod'

export const bankAccountSchema = z.object({
  accountNumber: z.string().min(1, 'Số tài khoản không được để trống').trim(),
})

export type BankAccountSchema = z.infer<typeof bankAccountSchema>
