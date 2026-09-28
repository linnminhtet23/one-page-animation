import { portraits as defaultPortraits } from '../data/portraits'

export function PortraitField({
  items = defaultPortraits,
  assetBase = '/floating_animation',
  heroFile = 'human.webp',
}) {
  return (
    <div className="portrait-field absolute inset-0" aria-hidden="true">
      {items.map(({ file, className, depth }, index) => (
        <div
          className={`portrait ${className}`}
          style={{
            '--depth': depth,
            '--delay': `${index * -0.16}s`,
            '--duration': `${1.25 + (index % 4) * 0.08}s`,
          }}
          key={file}
        >
          <img
            src={`${assetBase}/${file}`}
            alt=""
            draggable="false"
            loading="eager"
            decoding="async"
          />
        </div>
      ))}

      <div className="portrait first-page-hero" style={{ '--depth': 3.2 }}>
        <img
          src={`${assetBase}/${heroFile}`}
          alt=""
          draggable="false"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  )
}
