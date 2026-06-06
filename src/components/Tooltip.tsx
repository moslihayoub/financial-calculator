import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setCoords({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      })
    }
  }

  useEffect(() => {
    if (isVisible) {
      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [isVisible])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex cursor-help"
      >
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div
            className="fixed z-[9999] px-3 py-1.5 bg-[var(--text-ink)] text-[var(--bg-surface)] text-[12px] font-sans font-medium rounded shadow-lg pointer-events-none whitespace-nowrap -translate-x-1/2 -translate-y-full animate-fade-in"
            style={{
              top: coords.top,
              left: coords.left,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  )
}
