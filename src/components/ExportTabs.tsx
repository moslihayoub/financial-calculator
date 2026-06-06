import React, { useState } from 'react'
import { Copy, Check, Share, Mail } from 'lucide-react'
import { CustomSelect } from './CustomSelect'
import { Drawer } from './Drawer'
import { format } from 'date-fns'
import { useCalculatorStore, useFinancialTotals, formatCurrency } from '../store'
import { useTranslation } from '../utils/i18n'

export const ExportTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [copied, setCopied] = useState<boolean>(false)
  const [shareDrawerOpen, setShareDrawerOpen] = useState<boolean>(false)
  
  const { settings, services } = useCalculatorStore()
  const totals = useFinancialTotals()
  const t = useTranslation(settings.language)
  const activeServices = services.filter((s) => s.active)

  const signature = `\n\n---\n${settings.userProfile.name}\n${settings.userProfile.title}\n${settings.userProfile.phone}\n${settings.userProfile.email}`

  const generateProforma = () => {
    let content = `# ${t.proformaTitle}\n\n`
    content += `**${t.partnerAgency}:** ${settings.partnerAgency}\n`
    content += `**${t.clientName}:** ${settings.clientName}\n`
    content += `**${t.documentDate}:** ${format(settings.documentDate, 'yyyy-MM-dd')}\n`
    content += `**${t.documentRef}:** ${settings.documentRef}\n\n`
    
    content += `| ${t.serviceName} | ${t.rateType} | ${t.rateHT} | ${t.quantity} | ${t.tva} | Total HT |\n`
    content += `|---|---|---|---|---|---|\n`
    
    activeServices.forEach(s => {
      const lineHT = s.rate * s.quantity
      content += `| ${s.name} | ${s.rateType === 'Day' ? t.day : t.hour} | ${formatCurrency(s.rate, settings.currency)} | ${s.quantity} | ${s.tvaPercent}% | **${formatCurrency(lineHT, settings.currency)}** |\n`
    })
    
    content += `\n---\n`
    content += `**${t.totalHT}:** ${formatCurrency(totals.totalHT, settings.currency)}\n`
    content += `**${t.totalTVA}:** ${formatCurrency(totals.totalTVA, settings.currency)}\n`
    content += `**${t.totalTTC}:** ${formatCurrency(totals.totalTTC, settings.currency)}\n`
    content += signature

    return content
  }

  const generatePO = () => {
    let content = `# ${t.poTitle} - ${settings.documentRef}\n\n`
    content += `**${t.clientName}:** ${settings.clientName}\n`
    content += `**${t.documentDate}:** ${format(settings.documentDate, 'yyyy-MM-dd')}\n\n`
    content += `${t.poText}\n\n`
    
    activeServices.forEach(s => {
      const lineHT = s.rate * s.quantity
      content += `- **${s.name}**: ${s.quantity} ${s.rateType === 'Day' ? t.day : t.hour}(s) at ${formatCurrency(s.rate, settings.currency)} -> **${formatCurrency(lineHT, settings.currency)}** (Due: ${format(s.dueDate, 'yyyy-MM-dd')})\n`
    })
    
    content += `\n**${t.totalTTC}: ${formatCurrency(totals.totalTTC, settings.currency)}**\n\n`
    content += `\n___________________________\n`
    content += `*${t.poSignature}*\n`
    content += signature

    return content
  }

  const generateEmail = () => {
    let content = `Subject: ${t.emailSubject} - ${settings.clientName}\n\n`
    content += t.emailBody.replace('{partnerAgency}', settings.partnerAgency) + '\n\n'
    
    content += `--- SUMMARY ---\n`
    activeServices.forEach(s => {
      content += `• ${s.name}: ${formatCurrency(s.rate * s.quantity, settings.currency)} HT\n`
    })
    content += `\n`
    content += `${t.totalHT}: ${formatCurrency(totals.totalHT, settings.currency)}\n`
    content += `${t.totalTVA}: ${formatCurrency(totals.totalTVA, settings.currency)}\n`
    content += `${t.totalTTC}: ${formatCurrency(totals.totalTTC, settings.currency)}\n`
    
    content += signature

    return content
  }

  const generateWhatsapp = () => {
    let content = `${t.whatsappText}`
    
    activeServices.forEach(s => {
      content += `🔸 *${s.name}*\n   ${s.quantity} x ${formatCurrency(s.rate, settings.currency)} = ${formatCurrency(s.rate * s.quantity, settings.currency)} HT\n`
    })
    
    content += `\n💰 *${t.totalTTC}: ${formatCurrency(totals.totalTTC, settings.currency)}*\n`
    content += `\n📄 Ref: ${settings.documentRef}`
    content += signature

    return content
  }

  const tabs = [
    { label: t.exportProforma, generator: generateProforma },
    { label: t.exportPO, generator: generatePO },
    { label: t.exportEmail, generator: generateEmail },
    { label: t.exportWhatsapp, generator: generateWhatsapp },
  ]

  const generateHtmlTable = () => {
    let html = `<table border="1" style="border-collapse: collapse; width: 100%; font-family: sans-serif; font-size: 14px;">`
    html += `<thead><tr style="background: #f3f4f6;">`
    html += `<th style="padding: 8px; text-align: left;">${t.serviceName}</th>`
    html += `<th style="padding: 8px; text-align: left;">${t.rateType}</th>`
    html += `<th style="padding: 8px; text-align: left;">${t.rateHTFull || t.rateHT}</th>`
    html += `<th style="padding: 8px; text-align: left;">${t.quantityFull || t.quantity}</th>`
    html += `<th style="padding: 8px; text-align: left;">${t.tvaFull || t.tva}</th>`
    html += `<th style="padding: 8px; text-align: left;">Total HT</th>`
    html += `</tr></thead><tbody>`
    
    activeServices.forEach(s => {
      const lineHT = s.rate * s.quantity
      html += `<tr>`
      html += `<td style="padding: 8px; border-bottom: 1px solid #eee;">${s.name}</td>`
      html += `<td style="padding: 8px; border-bottom: 1px solid #eee;">${s.rateType === 'Day' ? t.day : t.hour}</td>`
      html += `<td style="padding: 8px; border-bottom: 1px solid #eee;">${formatCurrency(s.rate, settings.currency)}</td>`
      html += `<td style="padding: 8px; border-bottom: 1px solid #eee;">${s.quantity}</td>`
      html += `<td style="padding: 8px; border-bottom: 1px solid #eee;">${s.tvaPercent}%</td>`
      html += `<td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${formatCurrency(lineHT, settings.currency)}</strong></td>`
      html += `</tr>`
    })
    
    html += `</tbody></table><br>`
    html += `<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5;">`
    html += `<strong>${t.totalHT}:</strong> ${formatCurrency(totals.totalHT, settings.currency)}<br>`
    html += `<strong>${t.totalTVA}:</strong> ${formatCurrency(totals.totalTVA, settings.currency)}<br>`
    html += `<strong>${t.totalTTC}:</strong> ${formatCurrency(totals.totalTTC, settings.currency)}`
    html += `</p>`
    
    const sigLines = signature.trim().split('\n')
    html += `<p style="font-family: sans-serif; font-size: 14px; color: #666;">`
    sigLines.forEach(line => {
      if (line === '---') html += `<br>—<br>`
      else html += `${line}<br>`
    })
    html += `</p>`
    return html
  }

  const handleCopy = async () => {
    const text = tabs[activeTab].generator()
    const isRich = activeTab === 0 || activeTab === 1 // Proforma or PO
    
    try {
      if (isRich && navigator.clipboard && window.ClipboardItem) {
        const html = generateHtmlTable()
        const blobHtml = new Blob([html], { type: 'text/html' })
        const blobText = new Blob([text], { type: 'text/plain' })
        const item = new ClipboardItem({
          'text/html': blobHtml,
          'text/plain': blobText
        })
        await navigator.clipboard.write([item])
      } else {
        await navigator.clipboard.writeText(text)
      }
    } catch (err) {
      console.error('Failed to write rich text', err)
      navigator.clipboard.writeText(text)
    }
    
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    const text = tabs[activeTab].generator()
    if (navigator.share) {
      try {
        await navigator.share({
          title: tabs[activeTab].label,
          text: text,
        })
      } catch (err) {
        console.error('Error sharing', err)
      }
    } else {
      handleCopy()
    }
  }

  const handleEmail = () => {
    const text = tabs[activeTab].generator()
    const subject = encodeURIComponent(tabs[activeTab].label)
    const body = encodeURIComponent(text)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const ActionButtons = () => (
    <>
      <button
        onClick={handleCopy}
        className="btn-primary flex-1 relative overflow-hidden group py-xs h-auto min-h-[40px] flex items-center justify-center"
      >
        <span className="absolute inset-0 bg-white/20 translate-y-full group-active:translate-y-0 transition-transform duration-100 rounded-full"></span>
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span className="ml-xs">{copied ? 'Copié' : 'Copier'}</span>
      </button>
      
      <button
        onClick={handleShare}
        className="btn-ghost flex-1 py-xs h-auto min-h-[40px] flex items-center justify-center"
      >
        <Share size={16} />
        <span className="ml-xs">Partager</span>
      </button>
      
      <button
        onClick={handleEmail}
        className="btn-ghost flex-1 py-xs h-auto min-h-[40px] flex items-center justify-center"
      >
        <Mail size={16} />
        <span className="ml-xs">Email</span>
      </button>
    </>
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-md border-b border-[var(--border-hairline)] bg-[var(--bg-surface)] relative">
        <CustomSelect
          value={activeTab}
          onChange={(val) => {
            setActiveTab(Number(val))
            setCopied(false)
          }}
          options={tabs.map((tab, idx) => ({ label: tab.label, value: idx }))}
          className="text-body-strong"
        />
      </div>

      <div className="flex-1 flex flex-col p-md bg-[var(--color-canvas-warm)]">
        <textarea
          className="w-full flex-1 bg-transparent text-body font-mono text-[var(--color-graphite)] focus:outline-none resize-none"
          readOnly
          value={tabs[activeTab].generator()}
          dir={settings.language === 'AR' ? 'rtl' : 'ltr'}
        />
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center justify-between gap-sm mt-md pt-sm border-t border-[var(--border-hairline)]">
          <ActionButtons />
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center justify-center mt-md pt-sm border-t border-[var(--border-hairline)]">
          <button
            onClick={() => setShareDrawerOpen(true)}
            className="btn-primary w-full relative overflow-hidden group py-xs h-auto min-h-[40px] flex items-center justify-center"
          >
            <Share size={16} />
            <span className="ml-xs">Partager</span>
          </button>
        </div>
      </div>

      {/* Mobile Share Drawer */}
      <Drawer isOpen={shareDrawerOpen} onClose={() => setShareDrawerOpen(false)} title="Partager le document">
        <div className="flex flex-col gap-sm">
          <button
            onClick={() => { handleCopy(); setShareDrawerOpen(false) }}
            className="w-full flex items-center p-md bg-[var(--color-canvas-warm)] rounded-lg hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 transition-colors"
          >
            {copied ? <Check size={20} className="text-[var(--bg-primary)]" /> : <Copy size={20} className="text-[var(--color-slate)]" />}
            <span className="ml-md text-body-strong text-left">{copied ? 'Copié' : 'Copier dans le presse-papier'}</span>
          </button>
          
          <button
            onClick={async () => { await handleShare(); setShareDrawerOpen(false) }}
            className="w-full flex items-center p-md bg-[var(--color-canvas-warm)] rounded-lg hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 transition-colors"
          >
            <Share size={20} className="text-[var(--color-slate)]" />
            <span className="ml-md text-body-strong text-left">Partager via app</span>
          </button>
          
          <button
            onClick={() => { handleEmail(); setShareDrawerOpen(false) }}
            className="w-full flex items-center p-md bg-[var(--color-canvas-warm)] rounded-lg hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 transition-colors"
          >
            <Mail size={20} className="text-[var(--color-slate)]" />
            <span className="ml-md text-body-strong text-left">Envoyer par Email</span>
          </button>
        </div>
      </Drawer>
    </div>
  )
}
