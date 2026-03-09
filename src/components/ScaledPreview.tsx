import { useEffect, useRef, useState } from 'react'

// 210mm in px at 96dpi (CSS reference pixel)
const A4_WIDTH_PX = 794

export default function ScaledPreview({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const available = containerRef.current.offsetWidth
      setScale(Math.min(1, available / A4_WIDTH_PX))
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <div style={{ zoom: scale }}>
        {children}
      </div>
    </div>
  )
}
