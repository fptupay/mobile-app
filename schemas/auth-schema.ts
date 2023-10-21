import { z } from 'zod'

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/,
        'Mật khẩu không hợp lệ'
      )
      .trim(),
    confirmPassword: z
      .string()
      .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/,
        'Mật khẩu không hợp lệ'
      )
      .trim()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp'
  })

export const passwordInitSchema = z.object({
  username: z.string(),
  old_password: z
    .string()
    .min(1, {
      message: 'Mật khẩu cũ không được để trống'
    })
    .trim(),
  new_password: z
    .string()
    .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/, 'Mật khẩu không hợp lệ')
    .trim()
})

export const loginFormSchema = z.object({
  username: z
    .string()
    .regex(/^[A-Za-z]{2}[0-9]{6}$/, {
      message: 'Mã sinh viên không hợp lệ'
    })
    .trim(),
  password: z
    .string()
    .min(6, {
      message: 'Mật khẩu phải có ít nhất 6 ký tự'
    })
    .trim()
})

export const loginOtpFormSchema = z.object({
  username: z.string(),
  password: z.string(),
  otp: z.string()
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type LoginOtpFormSchema = z.infer<typeof loginOtpFormSchema>
export type PasswordSchema = z.infer<typeof passwordSchema>
export type PasswordInitSchema = z.infer<typeof passwordInitSchema>
