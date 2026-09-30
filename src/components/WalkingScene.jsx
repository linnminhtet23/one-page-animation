import { WalkingRig } from './WalkingRig'

const defaultParagraphs = [
  'A joyful circle of motion, color, and curious companions—made for everyone who dreams of living among animals.',
  'Every paw, hop, and wag brings a little more warmth to the parade.',
]

export function WalkingScene({
  background = '/animal.webp',
  paragraphs = defaultParagraphs,
  label = 'About Paw Parade',
}) {
  const paragraphWords = paragraphs.map((paragraph) => paragraph.split(' '))
  const paragraphOffsets = paragraphWords.map((_, paragraphIndex) => (
    paragraphWords
      .slice(0, paragraphIndex)
      .reduce((total, words) => total + words.length, 0)
  ))

  return (
    <>
      <div className="walking-background pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src={background}
          alt=""
          draggable="false"
          loading="eager"
          decoding="async"
        />
      </div>

      <section className="walking-copy pointer-events-none absolute" aria-label={label}>
        {paragraphWords.map((words, paragraphIndex) => (
          <p key={paragraphs[paragraphIndex]}>
            {words.map((word, wordIndex) => (
              <span
                className="walking-copy-word"
                style={{ '--word-index': paragraphOffsets[paragraphIndex] + wordIndex }}
                key={`${word}-${wordIndex}`}
              >
                {word}
              </span>
            ))}
          </p>
        ))}
      </section>

      <WalkingRig loading="eager" />
    </>
  )
}
