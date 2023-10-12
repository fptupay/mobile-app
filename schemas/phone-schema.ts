import { z } from 'zod'

export const phoneSchema = z.object({
  phoneNumber: z.string().length(10, 'Số điện thoại phải có 10 ký tự').trim()
})

export type PhoneSchema = z.infer<typeof phoneSchema>
