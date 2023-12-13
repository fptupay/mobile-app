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

export const infoResetPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ').trim(),
  card_no: z.string().length(12, 'Số CMND/CCCD phải có 12 ký tự').trim(),
  date_of_birth: z.string().trim(),
  card_holder_name: z.string().min(1, 'Tên chủ thẻ không được để trống').trim()
})
export type InfoSchema = z.infer<typeof infoResetPasswordSchema>
