import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { useCalculatorStore } from '../store'
import { useTranslation } from '../utils/i18n'
import { ExportTabs } from './ExportTabs'
import { SettingsPanel } from './SettingsPanel'

export const Sidebar: React.FC = () => {
  const { settings, services, updateService, sidebarView, activeServiceIdForSidebar, setSidebar } = useCalculatorStore()
  const t = useTranslation(settings.language)

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarView !== 'none') {
        setSidebar('none')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sidebarView, setSidebar])

  if (sidebarView === 'none') return null

  const activeService = services.find(s => s.id === activeServiceIdForSidebar)

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 transition-opacity backdrop-blur-sm"
        onClick={() => setSidebar('none')}
      />

      {/* Sidebar Panel */}
      <aside 
        className={`fixed top-0 bottom-0 z-50 w-full md:w-[80vw] bg-[var(--bg-surface)] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col animate-fade-in ${
          settings.language === 'AR' ? 'left-0' : 'right-0'
        }`}
      >
        <header className="flex items-center justify-between p-md border-b border-[var(--border-hairline)]">
          <h2 className="text-heading-sm">
            {sidebarView === 'export' && t.generateDocuments}
            {sidebarView === 'description' && t.description}
            {sidebarView === 'settings' && t.settingsTitle}
          </h2>
          <button
            onClick={() => setSidebar('none')}
            className="p-xs hover:bg-[var(--border-hairline)] rounded-full transition-colors"
            title={t.close}
          >
            <X size={20} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-md">
          {sidebarView === 'export' && <ExportTabs />}
          {sidebarView === 'settings' && <SettingsPanel />}
          
          {sidebarView === 'description' && activeService && (
            <div className="flex flex-col h-full gap-sm">
              <label className="text-subtitle">{activeService.name}</label>
              <textarea
                className="flex-1 p-md bg-[var(--color-canvas-warm)] border border-[var(--border-hairline)] rounded-md text-body focus:outline-none resize-none"
                placeholder={`${t.description}...`}
                value={activeService.description || ''}
                onChange={(e) => updateService(activeService.id, { description: e.target.value })}
                dir={settings.language === 'AR' ? 'rtl' : 'ltr'}
              />
            </div>
          )}
        </main>
      </aside>
    </>
  )
}
