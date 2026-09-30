import { useEffect, useState } from 'react'
import { waitForImages } from '../utils/waitForImages'

export function usePageLoader({
  minimumDuration = 1800,
  readyDuration = 240,
  exitDuration = 520,
} = {}) {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    let animationFrame
    let minimumTimer
    let readyTimer
    let removeTimer

    const minimumDelay = new Promise((resolve) => {
      minimumTimer = window.setTimeout(resolve, minimumDuration)
    })

    // Wait one frame so every image rendered by child components is present in
    // the document, then wait until the browser has decoded all of them.
    const assetsReady = new Promise((resolve) => {
      animationFrame = window.requestAnimationFrame(async () => {
        await Promise.all([
          waitForImages(document),
          document.fonts?.ready ?? Promise.resolve(),
        ])
        resolve()
      })
    })

    Promise.all([minimumDelay, assetsReady]).then(() => {
      if (cancelled) return

      // Give the fully assembled loader character time to paint before the
      // overlay leaves, especially when the last image finishes on a slow link.
      readyTimer = window.setTimeout(() => {
        setLeaving(true)
        removeTimer = window.setTimeout(() => setVisible(false), exitDuration)
      }, readyDuration)
    })

    return () => {
      cancelled = true
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(minimumTimer)
      window.clearTimeout(readyTimer)
      window.clearTimeout(removeTimer)
    }
  }, [exitDuration, minimumDuration, readyDuration])

  return { visible, leaving }
}
