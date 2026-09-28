import { useEffect } from 'react'

export function useParallax(targetRef) {
  useEffect(() => {
    const target = targetRef.current
    if (!target) return undefined

    let frame
    const update = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5
        const y = event.clientY / window.innerHeight - 0.5
        target.style.setProperty('--pointer-x', x.toFixed(3))
        target.style.setProperty('--pointer-y', y.toFixed(3))
      })
    }

    const reset = () => {
      target.style.setProperty('--pointer-x', 0)
      target.style.setProperty('--pointer-y', 0)
    }

    window.addEventListener('pointermove', update, { passive: true })
    document.documentElement.addEventListener('mouseleave', reset)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', update)
      document.documentElement.removeEventListener('mouseleave', reset)
    }
  }, [targetRef])
}
