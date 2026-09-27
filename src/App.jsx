import { useEffect, useRef } from 'react'
import './App.css'

const portraits = [
  { file: 'img1.webp', className: 'portrait-1', depth: 1.5 },
  { file: 'img2.webp', className: 'portrait-2', depth: 1 },
  { file: 'img3.webp', className: 'portrait-3', depth: 2 },
  { file: 'img4.webp', className: 'portrait-4', depth: 1.2 },
  { file: 'img5.webp', className: 'portrait-5', depth: 1.8 },
  { file: 'img6.webp', className: 'portrait-6', depth: 2.3 },
  { file: 'img7.webp', className: 'portrait-7', depth: 1.4 },
  { file: 'img8.webp', className: 'portrait-8', depth: 2.1 },
  { file: 'img9.webp', className: 'portrait-9', depth: 2.6 },
  { file: 'img10.webp', className: 'portrait-10', depth: 1.8 },
  { file: 'img11.webp', className: 'portrait-11', depth: 2.2 },
  { file: 'img12.webp', className: 'portrait-12', depth: 1.5 },
  { file: 'img13.webp', className: 'portrait-13', depth: 2.5 },
  { file: 'img14.webp', className: 'portrait-14', depth: 2 },
  { file: 'img15.webp', className: 'portrait-15', depth: 2.8 },
  { file: 'img16.webp', className: 'portrait-16', depth: 1.7 },
]

function App() {
  const sceneRef = useRef(null)
  const sceneProgressRef = useRef(0)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return undefined

    let frame
    const updateParallax = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5
        const y = event.clientY / window.innerHeight - 0.5
        scene.style.setProperty('--pointer-x', x.toFixed(3))
        scene.style.setProperty('--pointer-y', y.toFixed(3))
      })
    }

    const resetParallax = () => {
      scene.style.setProperty('--pointer-x', 0)
      scene.style.setProperty('--pointer-y', 0)
    }

    window.addEventListener('pointermove', updateParallax, { passive: true })
    document.documentElement.addEventListener('mouseleave', resetParallax)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', updateParallax)
      document.documentElement.removeEventListener('mouseleave', resetParallax)
    }
  }, [])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return undefined

    let gestureActive = false
    let gestureReleaseTimer
    let isAnimating = false
    let animationFrame
    let touchStartY = null

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const renderProgress = (progress) => {
      sceneProgressRef.current = progress
      scene.style.setProperty('--scroll-progress', progress.toFixed(4))
      scene.classList.toggle('is-scrolling', progress > 0.02)
      scene.dataset.scene = progress > 0.5 ? '1' : '0'
    }

    renderProgress(sceneProgressRef.current)

    const animateToScene = (target) => {
      if (isAnimating || target === sceneProgressRef.current) return

      cancelAnimationFrame(animationFrame)

      const startProgress = sceneProgressRef.current
      const distance = target - startProgress
      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1200
      const startedAt = performance.now()
      isAnimating = true

      const animate = (now) => {
        const elapsed = Math.min((now - startedAt) / duration, 1)
        const eased = elapsed < 0.5
          ? 4 * elapsed * elapsed * elapsed
          : 1 - Math.pow(-2 * elapsed + 2, 3) / 2

        renderProgress(startProgress + distance * eased)

        if (elapsed < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          renderProgress(target)
          isAnimating = false
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    const moveOnePage = (direction) => {
      if (isAnimating) return

      const currentScene = sceneProgressRef.current >= 0.5 ? 1 : 0
      const nextScene = Math.min(Math.max(currentScene + direction, 0), 1)

      if (nextScene !== currentScene) animateToScene(nextScene)
    }

    const handleWheel = (event) => {
      if (event.ctrlKey) return

      event.preventDefault()
      if (Math.abs(event.deltaY) < 4) return

      if (isAnimating) return

      clearTimeout(gestureReleaseTimer)
      gestureReleaseTimer = window.setTimeout(() => {
        gestureActive = false
      }, 140)

      if (gestureActive) return

      gestureActive = true
      moveOnePage(Math.sign(event.deltaY))
    }

    const handleKeyDown = (event) => {
      const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key)
        ? 1
        : ['ArrowUp', 'PageUp'].includes(event.key)
          ? -1
          : 0

      if (direction === 0) return
      event.preventDefault()
      moveOnePage(direction)
    }

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY ?? null
    }

    const handleTouchEnd = (event) => {
      if (touchStartY === null) return

      const endY = event.changedTouches[0]?.clientY ?? touchStartY
      const distance = touchStartY - endY
      touchStartY = null

      if (Math.abs(distance) >= 45) moveOnePage(Math.sign(distance))
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      cancelAnimationFrame(animationFrame)
      clearTimeout(gestureReleaseTimer)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [])

  return (
    <div className="experience">
      <main className="floating-scene" ref={sceneRef}>
        <h1 className="brand">Paw Parade</h1>

        <div className="portrait-field" aria-hidden="true">
          {portraits.map(({ file, className, depth }, index) => (
            <div
              className={`portrait ${className}`}
              style={{
                '--depth': depth,
                '--delay': `${index * -0.16}s`,
                '--duration': `${1.25 + (index % 4) * 0.08}s`,
              }}
              key={file}
            >
              <img src={`/floating_animation/${file}`} alt="" draggable="false" />
            </div>
          ))}

          <div className="portrait first-page-hero" style={{ '--depth': 3.2 }}>
            <img src="/floating_animation/human.webp" alt="" draggable="false" />
          </div>
        </div>

        <div className="walking-rig" aria-hidden="true">
          <div className="walking-rig-stage">
            <div className="rig-leg rig-leg-left">
              <span className="rig-calf">
                <span className="rig-shoe">
                  <img src="/walking_animation/shoe.png" alt="" />
                </span>
              </span>
            </div>
            <div className="rig-leg rig-leg-right">
              <span className="rig-calf">
                <span className="rig-shoe">
                  <img src="/walking_animation/shoe.png" alt="" />
                </span>
              </span>
            </div>

            <img className="rig-part rig-throat" src="/walking_animation/throat.png" alt="" />
            <img className="rig-part rig-hair" src="/walking_animation/hair.png" alt="" />
            <img className="rig-part rig-head" src="/walking_animation/head.png" alt="" />
            <img className="rig-part rig-body" src="/walking_animation/body.png" alt="" />

            <div className="rig-part-group rig-head-group">
              <img className="rig-part rig-headphone" src="/walking_animation/headphone.png" alt="" />
              <img className="rig-part rig-cat" src="/walking_animation/cat.png" alt="" />
            </div>

            <div className="rig-part-group rig-arm rig-arm-left">
              <img className="rig-part" src="/walking_animation/left_arm.png" alt="" />
              <img className="rig-part" src="/walking_animation/left_hand.png" alt="" />
            </div>

            <div className="rig-part-group rig-arm rig-arm-right">
              <img className="rig-part" src="/walking_animation/right_arm.png" alt="" />
              <img className="rig-part" src="/walking_animation/right_hand.png" alt="" />
            </div>
          </div>
        </div>

        <section className="outro" aria-label="Paw Parade collection">
          <span className="blob blob-one" aria-hidden="true" />
          <span className="blob blob-two" aria-hidden="true" />
          <span className="blob blob-three" aria-hidden="true" />
          <span className="blob blob-four" aria-hidden="true" />
          <span className="blob blob-five" aria-hidden="true" />
          <span className="blob blob-six" aria-hidden="true" />
          <h2>Paw Parade</h2>
        </section>

        <nav className="social-links" aria-label="Social links">
          <a href="#discord" aria-label="Discord">●</a>
          <a href="#community" aria-label="Community">♞</a>
          <a href="#twitter" aria-label="Twitter">♥</a>
        </nav>

        <a className="collection-link" href="#collection">
          view collection
        </a>
      </main>
    </div>
  )
}

export default App
