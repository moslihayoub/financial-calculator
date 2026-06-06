import React from 'react'
import { useCalculatorStore } from '../store'
import { useTranslation } from '../utils/i18n'
import { CustomSelect } from './CustomSelect'

export const SettingsPanel: React.FC = () => {
  const { settings, updateSettings } = useCalculatorStore()
  const t = useTranslation(settings.language)

  const handleProfileChange = (key: keyof typeof settings.userProfile, value: string) => {
    updateSettings({
      userProfile: {
        ...settings.userProfile,
        [key]: value
      }
    })
  }

  return (
    <div className="flex flex-col gap-xl">
      <section className="space-y-md">
        <h3 className="text-subtitle border-b border-[var(--border-hairline)] pb-xs">{t.settingsTitle}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="space-y-xs">
            <label className="text-label text-[var(--color-slate)]">{t.language}</label>
            <CustomSelect
              value={settings.language}
              onChange={(val) => updateSettings({ language: val as any })}
              options={[
                { label: 'Français', value: 'FR' },
                { label: 'English', value: 'ENG' },
                { label: 'العربية', value: 'AR' }
              ]}
              className="input-field"
              title={t.language}
            />
          </div>
          
          <div className="space-y-xs">
            <label className="text-label text-[var(--color-slate)]">{t.theme}</label>
            <CustomSelect
              value={settings.theme}
              onChange={(val) => updateSettings({ theme: val as any })}
              options={[
                { label: t.themeLight, value: 'light' },
                { label: t.themeDark, value: 'dark' },
                { label: t.themeSystem, value: 'system' }
              ]}
              className="input-field"
              title={t.theme}
            />
          </div>
        </div>
      </section>

      <section className="space-y-md">
        <h3 className="text-subtitle border-b border-[var(--border-hairline)] pb-xs">{t.profile}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="space-y-xs">
            <label className="text-label text-[var(--color-slate)]">{t.name}</label>
            <input
              type="text"
              value={settings.userProfile.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="input-field"
            />
          </div>
          <div className="space-y-xs">
            <label className="text-label text-[var(--color-slate)]">{t.title}</label>
            <input
              type="text"
              value={settings.userProfile.title}
              onChange={(e) => handleProfileChange('title', e.target.value)}
              className="input-field"
            />
          </div>
          <div className="space-y-xs">
            <label className="text-label text-[var(--color-slate)]">{t.phone}</label>
            <input
              type="text"
              value={settings.userProfile.phone}
              onChange={(e) => handleProfileChange('phone', e.target.value)}
              className="input-field"
              dir="ltr"
            />
          </div>
          <div className="space-y-xs">
            <label className="text-label text-[var(--color-slate)]">{t.email}</label>
            <input
              type="email"
              value={settings.userProfile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              className="input-field"
              dir="ltr"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
