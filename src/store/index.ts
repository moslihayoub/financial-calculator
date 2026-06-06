import { create } from 'zustand'

export type Currency = 'Dhs' | 'EUR' | 'USD'
export type Language = 'FR' | 'ENG' | 'AR'
export type Theme = 'light' | 'dark' | 'system'
export type RateType = 'Day' | 'Hour'

export interface ServiceItem {
  id: string
  name: string
  active: boolean
  rateType: RateType
  rate: number
  quantity: number
  dueDate: Date
  tvaPercent: number
  commissionPercent: number
  description?: string
}

interface UserProfile {
  name: string
  title: string
  phone: string
  email: string
}

interface GlobalSettings {
  clientName: string
  documentDate: Date
  documentRef: string
  partnerAgency: string
  currency: Currency
  language: Language
  theme: Theme
  userProfile: UserProfile
}

interface CalculatorState {
  settings: GlobalSettings
  services: ServiceItem[]
  sidebarView: 'none' | 'export' | 'description' | 'settings'
  activeServiceIdForSidebar: string | null
  updateSettings: (settings: Partial<GlobalSettings>) => void
  updateService: (id: string, updates: Partial<ServiceItem>) => void
  toggleServiceActivity: (id: string) => void
  toggleAllServices: (active: boolean) => void
  addService: () => void
  setSidebar: (view: 'none' | 'export' | 'description' | 'settings', serviceId?: string) => void
}

const defaultServices: ServiceItem[] = [
  {
    id: '1',
    name: 'Web Hostinger',
    active: true,
    rateType: 'Day',
    rate: 1500,
    quantity: 3,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    tvaPercent: 20,
    commissionPercent: 10,
  },
  {
    id: '2',
    name: 'Video ADS',
    active: true,
    rateType: 'Hour',
    rate: 400,
    quantity: 8,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    tvaPercent: 20,
    commissionPercent: 15,
  },
  {
    id: '3',
    name: 'Crea post ADS',
    active: true,
    rateType: 'Day',
    rate: 1200,
    quantity: 2,
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    tvaPercent: 20,
    commissionPercent: 10,
  },
]

export const useCalculatorStore = create<CalculatorState>((set) => ({
  settings: {
    clientName: '',
    documentDate: new Date(),
    documentRef: 'REF-2026-001',
    partnerAgency: 'WHD',
    currency: 'Dhs',
    language: 'FR',
    theme: 'system',
    userProfile: {
      name: 'Ayoub MOSLIH',
      title: 'Lead product designer AI',
      phone: '+212 663585065',
      email: 'ayoub@whd.ma',
    },
  },
  services: defaultServices,
  sidebarView: 'none',
  activeServiceIdForSidebar: null,
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  updateService: (id, updates) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
  toggleServiceActivity: (id) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    })),
  toggleAllServices: (active) =>
    set((state) => ({
      services: state.services.map((s) => ({ ...s, active })),
    })),
  addService: () =>
    set((state) => {
      const newId = Date.now().toString()
      const newService: ServiceItem = {
        id: newId,
        name: 'Nouveau Service',
        active: true,
        rateType: 'Day',
        rate: 0,
        quantity: 1,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        tvaPercent: 20,
        commissionPercent: 10,
        description: '',
      }
      return { services: [...state.services, newService] }
    }),
  setSidebar: (view, serviceId) =>
    set(() => ({
      sidebarView: view,
      activeServiceIdForSidebar: serviceId || null,
    })),
}))

// Derived Selectors
export const useFinancialTotals = () => {
  const services = useCalculatorStore((state) => state.services)
  const activeServices = services.filter((s) => s.active)

  let totalHT = 0
  let totalTVA = 0
  let totalCommission = 0

  activeServices.forEach((s) => {
    const serviceHT = s.rate * s.quantity
    const serviceTVA = serviceHT * (s.tvaPercent / 100)
    // Based on requirements, commission is calculated directly on HT:
    const serviceCommission = serviceHT * (s.commissionPercent / 100)

    totalHT += serviceHT
    totalTVA += serviceTVA
    totalCommission += serviceCommission
  })

  const totalTTC = totalHT + totalTVA
  const netProfit = totalHT - totalCommission

  return { totalHT, totalTVA, totalTTC, totalCommission, netProfit }
}

export const formatCurrency = (amount: number, currency: Currency) => {
  const formatters = {
    Dhs: new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    }),
    EUR: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
    USD: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
  }

  // To enforce Western Arabic numerals, 'en-US' is used regardless of the selected language.
  if (currency === 'Dhs') {
    return `${formatters[currency].format(amount)} Dhs`
  }
  return formatters[currency].format(amount)
}
