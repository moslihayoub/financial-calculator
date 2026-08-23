import { z } from 'zod'

export const CurrencySchema = z.enum(['Dhs', 'EUR', 'USD'])
export const LanguageSchema = z.enum(['FR', 'ENG', 'AR'])
export const ThemeSchema = z.enum(['light', 'dark', 'system'])
export const RateTypeSchema = z.enum(['Day', 'Hour'])

export const ServiceItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  active: z.boolean(),
  rateType: RateTypeSchema,
  rate: z.number().min(0), // In cents
  quantity: z.number().min(1),
  dueDate: z.date(),
  tvaPercent: z.number().min(0).max(100),
  commissionPercent: z.number().min(0).max(100),
  description: z.string().optional()
})

export const UserProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  phone: z.string(),
  email: z.string().email()
})

export const GlobalSettingsSchema = z.object({
  clientName: z.string(),
  documentDate: z.date(),
  documentRef: z.string(),
  partnerAgency: z.string(),
  currency: CurrencySchema,
  language: LanguageSchema,
  theme: ThemeSchema,
  userProfile: UserProfileSchema
})
