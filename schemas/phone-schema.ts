import { z } from 'zod'

export const phoneSchema = z.object({
  phone_number: z.string().length(10, 'Số điện thoại phải có 10 ký tự').trim()
})

export type PhoneSchema = z.infer<typeof phoneSchema>
