import type { Currency, ServiceItem, FinancialTotals } from '../types'

// Convert external decimal strings or numbers to integer cents
export const toCents = (val: string | number): number => {
  const parsed = typeof val === 'string' ? parseFloat(val) : val
  if (isNaN(parsed)) return 0
  return Math.round(parsed * 100)
}

// Convert internal integer cents to string (2 decimal places) for input fields if needed
export const fromCents = (cents: number): string => {
  return (cents / 100).toFixed(2)
}

// For use in raw React inputs without formatting
export const centsToFloat = (cents: number): number => cents / 100

export const calculateServiceHT = (rateCents: number, quantity: number): number => {
  return rateCents * quantity
}

export const calculateFinancialTotals = (services: ServiceItem[]): FinancialTotals => {
  const activeServices = services.filter((s) => s.active)

  let totalHT = 0
  let totalTVA = 0
  let totalCommission = 0

  activeServices.forEach((s) => {
    const serviceHT = calculateServiceHT(s.rate, s.quantity)
    // precision-safe division after multiplication
    const serviceTVA = Math.round((serviceHT * s.tvaPercent) / 100)
    const serviceCommission = Math.round((serviceHT * s.commissionPercent) / 100)

    totalHT += serviceHT
    totalTVA += serviceTVA
    totalCommission += serviceCommission
  })

  const totalTTC = totalHT + totalTVA
  const netProfit = totalHT - totalCommission

  return { totalHT, totalTVA, totalTTC, totalCommission, netProfit }
}

export const formatCurrency = (amountCents: number, currency: Currency): string => {
  const amount = amountCents / 100
  const formatters = {
    Dhs: new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    }),
    EUR: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    USD: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  }

  if (currency === 'Dhs') {
    return `${formatters[currency].format(amount)} Dhs`
  }
  return formatters[currency].format(amount)
}
