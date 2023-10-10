import { z } from 'zod'

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, {
        message: 'Mật khẩu phải có ít nhất 6 ký tự'
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(6, {
        message: 'Mật khẩu phải có ít nhất 6 ký tự'
      })
      .trim()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp'
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

export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type PasswordSchema = z.infer<typeof passwordSchema>
