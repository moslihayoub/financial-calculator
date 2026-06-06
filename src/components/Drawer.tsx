import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity animate-fade-in"
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div className="relative bg-[var(--bg-surface)] w-full rounded-t-2xl shadow-2xl animate-slide-up flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-md border-b border-[var(--border-hairline)]">
          {title ? <h3 className="text-heading-sm">{title}</h3> : <div />}
          <button 
            onClick={onClose}
            className="p-xs hover:bg-[var(--color-canvas-warm)] rounded-full transition-colors"
          >
            <X size={20} className="text-[var(--color-slate)]" />
          </button>
        </div>
        <div className="p-md overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}
