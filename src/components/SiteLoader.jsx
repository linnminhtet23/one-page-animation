import { WalkingRig } from './WalkingRig'

export function SiteLoader({ visible, leaving, label = 'Loading Paw Parade' }) {
  if (!visible) return null

  return (
    <div
      className={`site-loader fixed inset-0 z-[1000] grid place-content-center justify-items-center gap-4 overflow-hidden bg-[#fffdf9] opacity-100${leaving ? ' is-leaving' : ''}`}
      role="status"
      aria-label={label}
    >
      <div className="loader-character-wrap" aria-hidden="true">
        <WalkingRig className="loader-walking-rig" loading="eager" />
        <span className="loader-shadow" />
      </div>
      <p className="loader-word m-0 flex gap-[.42em] pl-[.42em] text-[#2448a8]" aria-hidden="true">
        {'LOADING...'.split('').map((letter, index) => (
          <span style={{ '--loader-letter': index }} key={`${letter}-${index}`}>
            {letter}
          </span>
        ))}
      </p>
    </div>
  )
}
