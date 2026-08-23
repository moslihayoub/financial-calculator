import { describe, it, expect } from 'vitest'
import { toCents, fromCents, calculateServiceHT, calculateFinancialTotals, formatCurrency } from '../src/lib/currency'
import { ServiceItemSchema } from '../src/lib/schemas'
import type { ServiceItem } from '../src/types'

describe('Currency Utilities', () => {
  it('should convert float to cents correctly', () => {
    expect(toCents(10.50)).toBe(1050)
    expect(toCents('15.99')).toBe(1599)
    expect(toCents(0.1 + 0.2)).toBe(30)
  })

  it('should format cents to string properly', () => {
    expect(fromCents(1050)).toBe('10.50')
    expect(fromCents(99)).toBe('0.99')
  })

  it('should calculate service HT correctly', () => {
    expect(calculateServiceHT(150000, 3)).toBe(450000)
  })

  it('should format currency for different locales', () => {
    expect(formatCurrency(150050, 'Dhs')).toBe('1,500.50 Dhs')
    expect(formatCurrency(150050, 'USD')).toBe('$1,500.50')
    expect(formatCurrency(150050, 'EUR')).toBe('€1,500.50')
  })
})

describe('Financial Totals Calculation', () => {
  it('should calculate totals for active services only', () => {
    const services: ServiceItem[] = [
      {
        id: '1', name: 'Service 1', active: true, rateType: 'Day', rate: 100000, quantity: 2, dueDate: new Date(), tvaPercent: 20, commissionPercent: 10
      },
      {
        id: '2', name: 'Service 2', active: false, rateType: 'Hour', rate: 50000, quantity: 1, dueDate: new Date(), tvaPercent: 20, commissionPercent: 10
      }
    ]

    const totals = calculateFinancialTotals(services)
    
    // active HT = 100000 * 2 = 200000
    // TVA = 200000 * 0.20 = 40000
    // TTC = 240000
    // Commission = 200000 * 0.10 = 20000
    // Net = 200000 - 20000 = 180000

    expect(totals.totalHT).toBe(200000)
    expect(totals.totalTVA).toBe(40000)
    expect(totals.totalTTC).toBe(240000)
    expect(totals.totalCommission).toBe(20000)
    expect(totals.netProfit).toBe(180000)
  })
})

describe('Zod Schemas', () => {
  it('should validate service items properly', () => {
    const validService = {
      id: '1',
      name: 'Valid Service',
      active: true,
      rateType: 'Day',
      rate: 150000,
      quantity: 1,
      dueDate: new Date(),
      tvaPercent: 20,
      commissionPercent: 10
    }
    
    expect(ServiceItemSchema.safeParse(validService).success).toBe(true)
    
    const invalidService = {
      ...validService,
      rate: -500 // Invalid rate
    }
    
    expect(ServiceItemSchema.safeParse(invalidService).success).toBe(false)
  })
})
