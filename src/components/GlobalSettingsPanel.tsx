import React from 'react'
import { useCalculatorStore } from '../store'
import type { Currency } from '../store'
import { useTranslation } from '../utils/i18n'
import { DatePicker } from './DatePicker'
import { CustomSelect } from './CustomSelect'

export const GlobalSettingsPanel: React.FC = () => {
  const { settings, updateSettings } = useCalculatorStore()
  const t = useTranslation(settings.language)

  return (
    <div className="card-container mb-section">
      <h2 className="text-eyebrow text-[var(--color-stone)] mb-lg">{t.globalSettings}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
        {/* Client Name */}
        <div>
          <label className="block text-body text-[var(--text-ink)] mb-xs">{t.clientName}</label>
          <input
            type="text"
            className="input-field"
            value={settings.clientName}
            onChange={(e) => updateSettings({ clientName: e.target.value })}
            placeholder="Société Marocaine Alpha"
          />
        </div>

        {/* Document Date */}
        <div>
          <label className="block text-body text-[var(--text-ink)] mb-xs">{t.documentDate}</label>
          <DatePicker
            value={settings.documentDate}
            onChange={(date) => updateSettings({ documentDate: date })}
            className="input-field"
            title={t.documentDate}
          />
        </div>

        {/* Document Ref */}
        <div>
          <label className="block text-body text-[var(--text-ink)] mb-xs">{t.documentRef}</label>
          <input
            type="text"
            className="input-field"
            value={settings.documentRef}
            onChange={(e) => updateSettings({ documentRef: e.target.value })}
            placeholder="REF-2026-001"
          />
        </div>

        {/* Partner Agency */}
        <div>
          <label className="block text-body text-[var(--text-ink)] mb-xs">{t.partnerAgency}</label>
          <input
            type="text"
            className="input-field"
            value={settings.partnerAgency}
            onChange={(e) => updateSettings({ partnerAgency: e.target.value })}
            placeholder="WHD"
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-body text-[var(--text-ink)] mb-xs">{t.currency}</label>
          <CustomSelect
            value={settings.currency}
            onChange={(val) => updateSettings({ currency: val as Currency })}
            options={[
              { label: 'Dhs', value: 'Dhs' },
              { label: 'EUR (€)', value: 'EUR' },
              { label: 'USD ($)', value: 'USD' }
            ]}
            className="input-field"
            title={t.currency}
          />
        </div>

      </div>
    </div>
  )
}
