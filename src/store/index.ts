import { create } from 'zustand'
import type { Currency, Language, Theme, RateType, ServiceItem, GlobalSettings } from '../types'
import { calculateFinancialTotals, formatCurrency as pureFormatCurrency, toCents } from '../lib/currency'

export type { Currency, Language, Theme, RateType, ServiceItem, GlobalSettings }

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
    rate: toCents(1500),
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
    rate: toCents(400),
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
    rate: toCents(1200),
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

// Derived Selectors using pure calculation functions
export const useFinancialTotals = () => {
  const services = useCalculatorStore((state) => state.services)
  return calculateFinancialTotals(services)
}

export const formatCurrency = pureFormatCurrency
