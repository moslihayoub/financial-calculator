import React, { useEffect } from 'react'
import { GlobalSettingsPanel } from './components/GlobalSettingsPanel'
import { ServiceTable } from './components/ServiceTable'
import { FinancialSummary } from './components/FinancialSummary'
import { Sidebar } from './components/Sidebar'
import { useCalculatorStore } from './store'
import { Settings } from 'lucide-react'

const App: React.FC = () => {
  const { settings, setSidebar } = useCalculatorStore()

  useEffect(() => {
    // Handle RTL and Font changes for Arabic
    if (settings.language === 'AR') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
      // Use Almarai via tailwind custom utility or let CSS handle the fallback defined in --font-sans
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
            className="p-sm text-[var(--color-slate)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-surface)] rounded-full transition-colors"
          >
            <Settings size={24} />
          </button>
        </header>

        <main>
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
        </main>
      </div>
      <Sidebar />
    </>
  )
}

export default App
