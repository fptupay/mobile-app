import { z } from 'zod'

export const loginFormSchema = z.object({
  username: z
    .string()
    .regex(/^[a-z]{2}[0-9]{6}$/, {
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
