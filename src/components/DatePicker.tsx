import React, { useState, useRef, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Drawer } from './Drawer'

interface DatePickerProps {
  value: Date
  onChange: (date: Date) => void
  className?: string
  title?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, className = '', title }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(value))
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

  useEffect(() => {
    if (isOpen) {
      setCurrentMonth(startOfMonth(value))
    }
  }, [isOpen, value])

  const handleSelect = (date: Date) => {
    onChange(date)
    setIsOpen(false)
  }

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const CalendarContent = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })
    
    const dateFormat = "d"
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <div className="p-sm select-none bg-[var(--bg-surface)]">
        <div className="flex justify-between items-center mb-md px-xs">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-[var(--color-canvas-warm)] rounded transition-colors"><ChevronLeft size={18} /></button>
          <span className="text-body-strong capitalize">{format(currentMonth, 'MMMM yyyy')}</span>
          <button onClick={handleNextMonth} className="p-1 hover:bg-[var(--color-canvas-warm)] rounded transition-colors"><ChevronRight size={18} /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-xs">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
            <div key={day} className="text-micro-caps text-[var(--color-slate)]">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map((day, i) => {
            const isSelected = isSameDay(day, value)
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth()
            const isTodayDate = isToday(day)
            
            return (
              <button
                key={i}
                onClick={() => handleSelect(day)}
                className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-body transition-colors ${
                  !isCurrentMonth ? 'text-[var(--color-hairline-soft)]' : ''
                } ${
                  isSelected 
                    ? 'bg-[var(--bg-primary)] text-[var(--text-on-primary)] font-medium' 
                    : isTodayDate 
                      ? 'border border-[var(--color-slate)] text-[var(--text-ink)]' 
                      : 'text-[var(--text-ink)] hover:bg-[var(--color-canvas-warm)]'
                }`}
              >
                {format(day, dateFormat)}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full flex items-center justify-between bg-transparent focus:outline-none text-inherit font-inherit"
      >
        <span className="truncate">{format(value, 'dd/MM/yyyy')}</span>
        <CalendarIcon size={16} className="text-[var(--color-slate)] ml-2 flex-shrink-0" />
      </button>

      {/* Desktop Dropdown */}
      {!isMobile && isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-lg shadow-lg animate-fade-in overflow-hidden w-[280px]">
          <CalendarContent />
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title={title || "Sélectionner une date"}>
          <div className="flex justify-center pb-md">
            <div className="w-full max-w-[320px]">
              <CalendarContent />
            </div>
          </div>
        </Drawer>
      )}
    </div>
  )
}
