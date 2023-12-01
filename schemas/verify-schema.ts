import { z } from 'zod'

export const verifyResetPasswordSchema = z.object({
  username: z.string().min(6, 'Tên đăng nhập phải có ít nhất 6 ký tự').trim(),
  phone_number: z.string().length(10, 'Số điện thoại phải có 10 ký tự').trim()
})

export type VerifySchema = z.infer<typeof verifyResetPasswordSchema>

export const phoneSchema = z.object({
  phone_number: z.string().length(10, 'Số điện thoại phải có 10 ký tự').trim()
})

export type PhoneSchema = z.infer<typeof phoneSchema>
