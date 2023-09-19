import { z } from 'zod'
import { loginFormSchema } from './Authen.schema'

export type LoginFormType = z.infer<typeof loginFormSchema>
