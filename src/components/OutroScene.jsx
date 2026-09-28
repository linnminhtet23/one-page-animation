const blobNames = ['one', 'two', 'three', 'four', 'five', 'six']

export function OutroScene({ title = 'Paw Parade', label = 'Paw Parade collection' }) {
  return (
    <section className="outro absolute inset-0 grid place-items-center" aria-label={label}>
      {blobNames.map((name) => (
        <span className={`blob blob-${name}`} aria-hidden="true" key={name} />
      ))}
      <h2>{title}</h2>
    </section>
  )
}
