import { useEffect, useState } from 'react'

export function usePageLoader({ minimumDuration = 1800, exitDuration = 520 } = {}) {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const startedAt = performance.now()
    let leaveTimer
    let removeTimer

    const finishLoading = () => {
      const remainingDuration = Math.max(
        minimumDuration - (performance.now() - startedAt),
        0,
      )

      leaveTimer = window.setTimeout(() => {
        setLeaving(true)
        removeTimer = window.setTimeout(() => setVisible(false), exitDuration)
      }, remainingDuration)
    }

    if (document.readyState === 'complete') finishLoading()
    else window.addEventListener('load', finishLoading, { once: true })

    return () => {
      window.removeEventListener('load', finishLoading)
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
    }
  }, [exitDuration, minimumDuration])

  return { visible, leaving }
}
