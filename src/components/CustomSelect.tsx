import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { Drawer } from './Drawer'

export interface Option {
  label: string
  value: string | number
}

interface CustomSelectProps {
  value: string | number
  onChange: (value: any) => void
  options: Option[]
  className?: string
  title?: string
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, className = '', title }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen && !isMobile) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, isMobile])

  const selectedOption = options.find(o => o.value === value)

  const handleSelect = (val: string | number) => {
    onChange(val)
    setIsOpen(false)
  }

  const ListContent = () => (
    <div className="flex flex-col p-1 gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className={`flex items-center justify-between px-3 py-2 w-full text-left transition-colors rounded-md hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 ${
            option.value === value ? 'text-[var(--text-ink)] font-medium bg-gray-50 dark:bg-gray-800/50' : 'text-[var(--color-graphite)]'
          }`}
        >
          <span className="truncate pr-4">{option.label}</span>
          {option.value === value && <Check size={16} className="text-[var(--bg-primary)] flex-shrink-0" />}
        </button>
      ))}
    </div>
  )

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full flex items-center justify-between bg-transparent focus:outline-none text-inherit font-inherit"
      >
        <span className="truncate">{selectedOption?.label || ''}</span>
        <ChevronDown size={16} className="text-[var(--color-slate)] ml-2 flex-shrink-0" />
      </button>

      {/* Desktop Dropdown */}
      {!isMobile && isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 min-w-[200px] w-max max-w-[300px] bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-md shadow-lg animate-fade-in overflow-hidden">
          <ListContent />
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title={title || "Sélectionner"}>
          <ListContent />
        </Drawer>
      )}
    </div>
  )
}
