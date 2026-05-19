"use client";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/unyona.app",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" />
      </svg>
    ),
  }
];

const ArrowUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
  </svg>
);

export default function SocialPanel() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* ── DESKTOP ── fixed left column */}
      <div className="fixed bottom-8 left-6 z-40 hidden md:flex flex-col items-center gap-5">
        {/* Scroll to top */}
        <button
          onClick={scrollTop}
          aria-label="Volver arriba"
          className="text-[#607D8B] dark:text-[#9BA6AD] hover:text-[#61DBD6] dark:hover:text-[#61DBD6] transition-colors duration-200"
        >
          <ArrowUp />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[#607D8B]/30 dark:bg-white/20" />

        {/* Social icons */}
        <ul className="flex flex-col gap-4">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="block text-[#607D8B] dark:text-[#9BA6AD] hover:text-[#61DBD6] dark:hover:text-[#61DBD6] transition-colors duration-200"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>

        {/* Vertical line below */}
        <div className="w-px h-10 bg-gradient-to-b from-[#607D8B]/30 to-transparent dark:from-white/20" />
      </div>

      {/* ── MOBILE ── pill at bottom center */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex md:hidden items-center gap-5 px-5 py-3 rounded-full bg-white/80 dark:bg-[#263238]/80 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-lg">
        <button
          onClick={scrollTop}
          aria-label="Volver arriba"
          className="text-[#607D8B] dark:text-[#9BA6AD] hover:text-[#61DBD6] dark:hover:text-[#61DBD6] transition-colors duration-200"
        >
          <ArrowUp />
        </button>

        <div className="w-px h-4 bg-gray-300 dark:bg-white/20" />

        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-[#607D8B] dark:text-[#9BA6AD] hover:text-[#61DBD6] dark:hover:text-[#61DBD6] transition-colors duration-200"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </>
  );
}
