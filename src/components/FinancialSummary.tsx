import React from 'react'
import { Info } from 'lucide-react'
import { useCalculatorStore, useFinancialTotals, formatCurrency } from '../store'
import { useTranslation } from '../utils/i18n'

import { Tooltip } from './Tooltip'

const TooltipLabel = ({ shortText, fullText, isTitle = false }: { shortText: string, fullText: string, isTitle?: boolean }) => (
  <span className={`inline-flex items-center gap-2 ${isTitle ? 'text-subtitle font-medium' : 'text-body text-[var(--text-ink-soft)]'}`}>
    {shortText}
    <Tooltip content={fullText}>
      <Info size={14} className="text-[var(--color-slate)]" />
    </Tooltip>
  </span>
)

export const FinancialSummary: React.FC = () => {
  const { settings, setSidebar } = useCalculatorStore()
  const totals = useFinancialTotals()
  const t = useTranslation(settings.language)
  const currency = settings.currency

  return (
    <div className="card-container rounded-lg sticky top-lg">
      <h2 className="text-heading-sm mb-lg">{t.financialSummary}</h2>

      <div className="space-y-md">
        <div className="flex justify-between items-center pb-sm border-b border-[var(--border-hairline)]">
          <TooltipLabel shortText={t.totalHTShort} fullText={t.totalHT} />
          <span className="text-body-strong">{formatCurrency(totals.totalHT, currency)}</span>
        </div>

        <div className="flex justify-between items-center pb-sm border-b border-[var(--border-hairline)]">
          <TooltipLabel shortText={t.totalTVAShort} fullText={t.totalTVA} />
          <span className="text-body-strong">{formatCurrency(totals.totalTVA, currency)}</span>
        </div>

        <div className="flex justify-between items-center pb-sm border-b border-[var(--border-hairline)]">
          <TooltipLabel shortText={t.totalTTCShort} fullText={t.totalTTC} />
          <span className="text-body-strong">{formatCurrency(totals.totalTTC, currency)}</span>
        </div>

        <div className="flex justify-between items-center pb-sm border-b border-[var(--border-hairline)]">
          <TooltipLabel shortText={t.totalCommissionShort} fullText={t.totalCommission} />
          <span className="text-body-strong text-[var(--color-slate)]">
            - {formatCurrency(totals.totalCommission, currency)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-sm mt-md">
          <TooltipLabel shortText={t.netProfitShort} fullText={t.netProfit} isTitle />
          <span className="text-display-sm text-[var(--text-ink)]">
            {formatCurrency(totals.netProfit, currency)}
          </span>
        </div>
      </div>

      <button 
        onClick={() => setSidebar('export')} 
        className="btn-primary w-full mt-xl relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-white/20 translate-y-full group-active:translate-y-0 transition-transform duration-100 rounded-full"></span>
        {t.generateDocuments}
      </button>
    </div>
  )
}
