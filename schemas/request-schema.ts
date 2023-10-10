import { z } from 'zod'

export const supportRequestSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: 'Nội dung không được để trống'
    })
    .max(50, {
      message: 'Nội dung không được quá 50 ký tự'
    })
    .trim()
})

export type SupportRequestSchema = z.infer<typeof supportRequestSchema>
