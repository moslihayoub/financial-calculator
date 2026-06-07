import React from 'react'
import { Check, FileText, Plus, Info } from 'lucide-react'
import { useCalculatorStore } from '../store'
import type { RateType } from '../store'
import { useTranslation } from '../utils/i18n'
import { Tooltip } from './Tooltip'
import { CustomSelect } from './CustomSelect'
import { DatePicker } from './DatePicker'

const TooltipHeader = ({ shortText, fullText }: { shortText: string, fullText: string }) => (
  <span className="inline-flex items-center gap-1">
    {shortText}
    <Tooltip content={fullText}>
      <Info size={12} className="text-[var(--color-slate)]" />
    </Tooltip>
  </span>
)

interface ServiceTableProps {
  isAccordion?: boolean
}

export const ServiceTable: React.FC<ServiceTableProps> = ({ isAccordion = false }) => {
  const { services, updateService, toggleServiceActivity, toggleAllServices, addService, settings, setSidebar } = useCalculatorStore()
  const t = useTranslation(settings.language)
  
  const allActive = services.length > 0 && services.every(s => s.active)

  return (
    <div className={isAccordion ? "" : "card-container mb-section"}>
      {!isAccordion && (
        <div className="flex items-center justify-between mb-lg">
          <h2 className="text-eyebrow text-[var(--color-stone)]">{t.services}</h2>
          <button
            onClick={addService}
            className="btn-primary h-[32px] px-4 flex items-center justify-center gap-xs text-[13px]"
          >
            <Plus size={14} />
            {t.addService}
          </button>
        </div>
      )}
      {isAccordion && (
        <div className="flex items-center justify-between mb-md pt-sm">
          <div />
          <button
            onClick={addService}
            className="btn-primary h-[32px] px-4 flex items-center justify-center gap-xs text-[13px]"
          >
            <Plus size={14} />
            {t.addService}
          </button>
        </div>
      )}

      {/* Mobile View: Cards */}
      <div className="block md:hidden space-y-4">
        <div className="flex items-center justify-between mb-sm">
          <button
            onClick={() => toggleAllServices(!allActive)}
            className="flex items-center gap-2 text-body"
          >
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              allActive
                ? 'bg-[var(--bg-primary)] border-[var(--bg-primary)] text-[var(--text-on-primary)]'
                : 'border-[var(--border-hairline-soft)] text-transparent'
            }`}>
              <Check size={12} />
            </div>
            <span>{t.selectAll}</span>
          </button>
        </div>

        {services.map(service => (
          <div key={service.id} className={`bg-[var(--color-canvas-warm)] border border-[var(--border-hairline)] rounded-xl p-md shadow-sm transition-opacity ${!service.active ? 'opacity-50' : ''}`}>
            <div className="flex items-center justify-between mb-md pb-sm border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleServiceActivity(service.id)}
                  className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                    service.active
                      ? 'bg-[var(--bg-primary)] border-[var(--bg-primary)] text-[var(--text-on-primary)]'
                      : 'border-[var(--border-hairline-soft)] text-transparent'
                  }`}
                >
                  <Check size={14} />
                </button>
                <div className="flex items-center gap-2 flex-1">
                  <input
                    className="bg-transparent text-body-strong w-full focus:outline-none"
                    value={service.name}
                    onChange={(e) => updateService(service.id, { name: e.target.value })}
                    placeholder={t.serviceName}
                  />
                  <button
                    onClick={() => setSidebar('description', service.id)}
                    className="text-[var(--color-slate)] hover:text-[var(--text-ink)] transition-colors p-1"
                    title={t.description}
                  >
                    <FileText size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-md gap-y-4">
              <div>
                <label className="text-micro-caps text-[var(--color-slate)] mb-1 block">{t.rateType}</label>
                <CustomSelect
                  value={service.rateType}
                  onChange={(val) => updateService(service.id, { rateType: val as RateType })}
                  options={[
                    { label: t.day, value: 'Day' },
                    { label: t.hour, value: 'Hour' }
                  ]}
                  title={t.rateType}
                  className="h-[30px] border-b border-[var(--border-hairline-soft)]"
                />
              </div>
              <div>
                <label className="text-micro-caps text-[var(--color-slate)] mb-1 block"><TooltipHeader shortText={t.rateHT} fullText={t.rateHTFull || ''} /></label>
                <div className="stepper-container mt-1">
                  <button type="button" onClick={() => updateService(service.id, { rate: Math.max(0, service.rate - 1) })} className="stepper-btn">-</button>
                  <input type="number" className="stepper-input" value={service.rate} onChange={(e) => updateService(service.id, { rate: Number(e.target.value) })} min="0" />
                  <button type="button" onClick={() => updateService(service.id, { rate: service.rate + 1 })} className="stepper-btn">+</button>
                </div>
              </div>
              <div>
                <label className="text-micro-caps text-[var(--color-slate)] mb-1 block"><TooltipHeader shortText={t.quantity} fullText={t.quantityFull || ''} /></label>
                <div className="stepper-container mt-1">
                  <button
                    type="button"
                    onClick={() => updateService(service.id, { quantity: Math.max(1, service.quantity - 1) })}
                    className="stepper-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="stepper-input"
                    value={service.quantity}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (!isNaN(val) && val >= 1) {
                        updateService(service.id, { quantity: val })
                      }
                    }}
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => updateService(service.id, { quantity: service.quantity + 1 })}
                    className="stepper-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="text-micro-caps text-[var(--color-slate)] mb-1 block">{t.dueDate}</label>
                <DatePicker
                  value={service.dueDate}
                  onChange={(date) => updateService(service.id, { dueDate: date })}
                  title={t.dueDate}
                  className="h-[30px] border-b border-[var(--border-hairline-soft)]"
                />
              </div>
              <div>
                <label className="text-micro-caps text-[var(--color-slate)] mb-1 block"><TooltipHeader shortText={t.tva} fullText={t.tvaFull || ''} /></label>
                <div className="stepper-container mt-1">
                  <button type="button" onClick={() => updateService(service.id, { tvaPercent: Math.max(0, service.tvaPercent - 1) })} className="stepper-btn">-</button>
                  <input type="number" className="stepper-input" value={service.tvaPercent} onChange={(e) => updateService(service.id, { tvaPercent: Number(e.target.value) })} min="0" />
                  <button type="button" onClick={() => updateService(service.id, { tvaPercent: service.tvaPercent + 1 })} className="stepper-btn">+</button>
                </div>
              </div>
              <div>
                <label className="text-micro-caps text-[var(--color-slate)] mb-1 block"><TooltipHeader shortText={t.commission} fullText={t.commissionFull || ''} /></label>
                <div className="stepper-container mt-1">
                  <button type="button" onClick={() => updateService(service.id, { commissionPercent: Math.max(0, service.commissionPercent - 1) })} className="stepper-btn">-</button>
                  <input type="number" className="stepper-input" value={service.commissionPercent} onChange={(e) => updateService(service.id, { commissionPercent: Number(e.target.value) })} min="0" />
                  <button type="button" onClick={() => updateService(service.id, { commissionPercent: service.commissionPercent + 1 })} className="stepper-btn">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-visible w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-hairline)]">
              <th className="py-sm px-xs align-middle">
                <button
                  onClick={() => toggleAllServices(!allActive)}
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    allActive
                      ? 'bg-[var(--bg-primary)] border-[var(--bg-primary)] text-[var(--text-on-primary)]'
                      : 'border-[var(--border-hairline-soft)] text-transparent'
                  }`}
                  title={t.selectAll}
                >
                  <Check size={12} />
                </button>
              </th>
              <th className="py-sm px-xs text-micro-caps text-[var(--color-slate)] font-normal whitespace-nowrap w-[25%]">{t.serviceName}</th>
              <th className="py-sm px-xs text-micro-caps text-[var(--color-slate)] font-normal whitespace-nowrap">{t.rateType}</th>
              <th className="py-sm px-xs text-micro-caps text-[var(--color-slate)] font-normal whitespace-nowrap"><TooltipHeader shortText={t.rateHT} fullText={t.rateHTFull} /></th>
              <th className="py-sm px-xs text-micro-caps text-[var(--color-slate)] font-normal whitespace-nowrap"><TooltipHeader shortText={t.quantity} fullText={t.quantityFull} /></th>
              <th className="py-sm px-xs text-micro-caps text-[var(--color-slate)] font-normal whitespace-nowrap">{t.dueDate}</th>
              <th className="py-sm px-xs text-micro-caps text-[var(--color-slate)] font-normal whitespace-nowrap"><TooltipHeader shortText={t.tva} fullText={t.tvaFull} /></th>
              <th className="py-sm px-xs text-micro-caps text-[var(--color-slate)] font-normal whitespace-nowrap"><TooltipHeader shortText={t.commission} fullText={t.commissionFull} /></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className={`border-b border-[var(--border-hairline-soft)] transition-colors ${
                  !service.active ? 'opacity-50' : ''
                }`}
              >
                <td className="py-md px-xs align-top">
                  <button
                    onClick={() => toggleServiceActivity(service.id)}
                    className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                      service.active
                        ? 'bg-[var(--bg-primary)] border-[var(--bg-primary)] text-[var(--text-on-primary)]'
                        : 'border-[var(--border-hairline-soft)] text-transparent'
                    }`}
                  >
                    <Check size={14} />
                  </button>
                </td>
                <td className="py-md px-xs align-top">
                  <div className="flex items-center gap-xs">
                    <input
                      className="bg-transparent text-body-strong w-full focus:outline-none"
                      value={service.name}
                      onChange={(e) => updateService(service.id, { name: e.target.value })}
                    />
                    <button
                      onClick={() => setSidebar('description', service.id)}
                      className="text-[var(--color-slate)] hover:text-[var(--text-ink)] transition-colors p-1"
                      title={t.description}
                    >
                      <FileText size={16} />
                    </button>
                  </div>
                </td>
                <td className="py-md px-xs align-top">
                  <CustomSelect
                    value={service.rateType}
                    onChange={(val) => updateService(service.id, { rateType: val as RateType })}
                    options={[
                      { label: t.day, value: 'Day' },
                      { label: t.hour, value: 'Hour' }
                    ]}
                  />
                </td>
                <td className="py-md px-xs align-top">
                  <div className="stepper-container">
                    <button type="button" onClick={() => updateService(service.id, { rate: Math.max(0, service.rate - 1) })} className="stepper-btn">-</button>
                    <input type="number" className="stepper-input" value={service.rate} onChange={(e) => updateService(service.id, { rate: Number(e.target.value) })} min="0" />
                    <button type="button" onClick={() => updateService(service.id, { rate: service.rate + 1 })} className="stepper-btn">+</button>
                  </div>
                </td>
                <td className="py-md px-xs align-top">
                  <div className="stepper-container">
                    <button
                      type="button"
                      onClick={() => updateService(service.id, { quantity: Math.max(1, service.quantity - 1) })}
                      className="stepper-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="stepper-input"
                      value={service.quantity}
                      onChange={(e) => {
                        const val = Number(e.target.value)
                        if (!isNaN(val) && val >= 1) {
                          updateService(service.id, { quantity: val })
                        }
                      }}
                      min="1"
                    />
                    <button
                      type="button"
                      onClick={() => updateService(service.id, { quantity: service.quantity + 1 })}
                      className="stepper-btn"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-md px-xs align-top">
                  <DatePicker
                    value={service.dueDate}
                    onChange={(date) => updateService(service.id, { dueDate: date })}
                  />
                </td>
                <td className="py-md px-xs align-top">
                  <div className="stepper-container">
                    <button type="button" onClick={() => updateService(service.id, { tvaPercent: Math.max(0, service.tvaPercent - 1) })} className="stepper-btn">-</button>
                    <input type="number" className="stepper-input" value={service.tvaPercent} onChange={(e) => updateService(service.id, { tvaPercent: Number(e.target.value) })} min="0" />
                    <button type="button" onClick={() => updateService(service.id, { tvaPercent: service.tvaPercent + 1 })} className="stepper-btn">+</button>
                  </div>
                </td>
                <td className="py-md px-xs align-top">
                  <div className="stepper-container">
                    <button type="button" onClick={() => updateService(service.id, { commissionPercent: Math.max(0, service.commissionPercent - 1) })} className="stepper-btn">-</button>
                    <input type="number" className="stepper-input" value={service.commissionPercent} onChange={(e) => updateService(service.id, { commissionPercent: Number(e.target.value) })} min="0" />
                    <button type="button" onClick={() => updateService(service.id, { commissionPercent: service.commissionPercent + 1 })} className="stepper-btn">+</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
