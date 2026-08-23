export type Currency = 'Dhs' | 'EUR' | 'USD'
export type Language = 'FR' | 'ENG' | 'AR'
export type Theme = 'light' | 'dark' | 'system'
export type RateType = 'Day' | 'Hour'

export interface ServiceItem {
  id: string
  name: string
  active: boolean
  rateType: RateType
  rate: number // In cents
  quantity: number
  dueDate: Date
  tvaPercent: number
  commissionPercent: number
  description?: string
}

export interface UserProfile {
  name: string
  title: string
  phone: string
  email: string
}

export interface GlobalSettings {
  clientName: string
  documentDate: Date
  documentRef: string
  partnerAgency: string
  currency: Currency
  language: Language
  theme: Theme
  userProfile: UserProfile
}

export interface FinancialTotals {
  totalHT: number // In cents
  totalTVA: number // In cents
  totalTTC: number // In cents
  totalCommission: number // In cents
  netProfit: number // In cents
}
