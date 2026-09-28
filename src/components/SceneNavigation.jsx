const defaultSocialLinks = [
  { href: '#discord', label: 'Discord', symbol: '●' },
  { href: '#community', label: 'Community', symbol: '♞' },
  { href: '#twitter', label: 'Twitter', symbol: '♥' },
]

export function SceneNavigation({
  socialLinks = defaultSocialLinks,
  collectionHref = '#collection',
  collectionLabel = 'view collection',
}) {
  return (
    <>
      <nav
        className="social-links absolute bottom-[clamp(20px,3vw,48px)] left-[clamp(20px,3vw,56px)] z-[45] flex gap-3.5 max-[620px]:gap-2"
        aria-label="Social links"
      >
        {socialLinks.map(({ href, label, symbol }) => (
          <a
            className="grid size-[46px] place-items-center rounded-full bg-[#2c64d5] text-white no-underline shadow-[0_5px_16px_rgba(24,59,144,.2)] transition-[transform,background-color] duration-200 hover:-translate-y-1 hover:bg-[#1f45a5] focus-visible:-translate-y-1 focus-visible:bg-[#1f45a5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2446a4] motion-reduce:transition-none max-[620px]:size-[38px] max-[620px]:text-[.8rem]"
            href={href}
            aria-label={label}
            key={label}
          >
            {symbol}
          </a>
        ))}
      </nav>

      <a
        className="collection-link absolute right-0 bottom-0 z-[45] min-w-[clamp(210px,20vw,320px)] rounded-tl-[52%] bg-[#2446a4] px-9 pt-[38px] pb-[31px] text-right text-[.82rem] font-semibold tracking-[.32em] text-white no-underline transition-[transform,background-color] duration-200 hover:-translate-y-1 hover:bg-[#1f3c8f] focus-visible:-translate-y-1 focus-visible:bg-[#1f3c8f] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white motion-reduce:transition-none max-[620px]:min-w-[170px] max-[620px]:px-[18px] max-[620px]:pt-7 max-[620px]:pb-[22px] max-[620px]:text-[.66rem]"
        href={collectionHref}
      >
        {collectionLabel}
      </a>
    </>
  )
}
