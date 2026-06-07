import React, { useEffect, useState } from 'react'
import { GlobalSettingsPanel } from './components/GlobalSettingsPanel'
import { ServiceTable } from './components/ServiceTable'
import { FinancialSummary } from './components/FinancialSummary'
import { Sidebar } from './components/Sidebar'
import { useCalculatorStore } from './store'
import { Settings, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from './utils/i18n'

const App: React.FC = () => {
  const { settings, setSidebar } = useCalculatorStore()
  const t = useTranslation(settings.language)

  // Mobile Accordion States
  const [globalSettingsOpen, setGlobalSettingsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(true)
  const [summaryOpen, setSummaryOpen] = useState(true)

  useEffect(() => {
    // Handle RTL and Font changes for Arabic
    if (settings.language === 'AR') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = settings.language === 'FR' ? 'fr' : 'en'
    }
  }, [settings.language])

  useEffect(() => {
    // Handle Theme changes
    if (settings.theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    } else {
      document.documentElement.setAttribute('data-theme', settings.theme)
    }
  }, [settings.theme])

  return (
    <>
      <div className="min-h-screen p-md md:p-xl max-w-[1600px] mx-auto font-sans">
        <header className="mb-section flex justify-between items-start">
          <div>
            <h1 className="text-display mb-sm">Freelance Calculator</h1>
            <p className="text-subtitle text-[var(--color-slate)]">
              Financial planner & document generator.
            </p>
          </div>
          <button
            onClick={() => setSidebar('settings')}
            className="p-sm text-[var(--color-slate)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-surface)] rounded-full transition-colors cursor-pointer"
          >
            <Settings size={24} />
          </button>
        </header>

        <main>
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <GlobalSettingsPanel />
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-xl">
              {/* Left Column: Service Configuration */}
              <div className="xl:col-span-8">
                <ServiceTable />
              </div>

              {/* Right Column: Summary (Sticky) */}
              <div className="xl:col-span-4 space-y-lg relative">
                <div className="sticky top-md">
                  <FinancialSummary />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Collapsible Layout */}
          <div className="block md:hidden space-y-4">
            {/* Global Settings Section */}
            <div className="border border-[var(--border-hairline)] rounded-xl overflow-hidden bg-[var(--bg-surface)]">
              <button
                type="button"
                onClick={() => setGlobalSettingsOpen(!globalSettingsOpen)}
                className="w-full flex items-center justify-between p-md text-left focus:outline-none cursor-pointer"
              >
                <span className="text-eyebrow text-[var(--text-ink)] font-bold">{t.globalSettings}</span>
                {globalSettingsOpen ? (
                  <ChevronUp size={18} className="text-[var(--color-slate)]" />
                ) : (
                  <ChevronDown size={18} className="text-[var(--color-slate)]" />
                )}
              </button>
              {globalSettingsOpen && (
                <div className="p-md pt-0 border-t border-[var(--border-hairline-soft)] animate-fade-in">
                  <GlobalSettingsPanel isAccordion />
                </div>
              )}
            </div>

            {/* Services Section */}
            <div className="border border-[var(--border-hairline)] rounded-xl overflow-hidden bg-[var(--bg-surface)]">
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between p-md text-left focus:outline-none cursor-pointer"
              >
                <span className="text-eyebrow text-[var(--text-ink)] font-bold">{t.services}</span>
                {servicesOpen ? (
                  <ChevronUp size={18} className="text-[var(--color-slate)]" />
                ) : (
                  <ChevronDown size={18} className="text-[var(--color-slate)]" />
                )}
              </button>
              {servicesOpen && (
                <div className="p-md pt-0 border-t border-[var(--border-hairline-soft)] animate-fade-in">
                  <ServiceTable isAccordion />
                </div>
              )}
            </div>

            {/* Financial Summary Section */}
            <div className="border border-[var(--border-hairline)] rounded-xl overflow-hidden bg-[var(--bg-surface)]">
              <button
                type="button"
                onClick={() => setSummaryOpen(!summaryOpen)}
                className="w-full flex items-center justify-between p-md text-left focus:outline-none cursor-pointer"
              >
                <span className="text-eyebrow text-[var(--text-ink)] font-bold">{t.financialSummary}</span>
                {summaryOpen ? (
                  <ChevronUp size={18} className="text-[var(--color-slate)]" />
                ) : (
                  <ChevronDown size={18} className="text-[var(--color-slate)]" />
                )}
              </button>
              {summaryOpen && (
                <div className="p-md pt-0 border-t border-[var(--border-hairline-soft)] animate-fade-in">
                  <FinancialSummary isAccordion />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Sidebar />
    </>
  )
}

export default App
