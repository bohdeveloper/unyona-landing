import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#f7f9fa] dark:bg-[#111818] border-t border-gray-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Grid principal: 1 col móvil → 2 cols tablet → 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">

          {/* Marca — ocupa las 2 columnas en tablet */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex mb-4">
              <img
                src="/images/logo_unyona.png"
                alt="Unyona"
                className="h-10 w-auto dark:drop-shadow-[0_0_10px_rgba(97,219,214,0.25)]"
              />
            </Link>
            <p className="text-sm text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-6 max-w-[280px]">
              La app para conocer gente cerca, organizar quedadas y conectar con personas que comparten tus intereses. Del online al offline.
            </p>

            {/* Redes sociales */}
            <div className="flex gap-2.5">
              <a
                href="https://www.instagram.com/unyona.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Unyona"
                className="w-9 h-9 rounded-full border border-gray-300 dark:border-white/10 flex items-center justify-center text-[#607D8B] dark:text-[#9BA6AD] hover:border-[#61DBD6] hover:text-[#61DBD6] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/unyona"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Unyona"
                className="w-9 h-9 rounded-full border border-gray-300 dark:border-white/10 flex items-center justify-center text-[#607D8B] dark:text-[#9BA6AD] hover:border-[#61DBD6] hover:text-[#61DBD6] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href="mailto:hello@unyona.com"
                aria-label="Email de Unyona"
                className="w-9 h-9 rounded-full border border-gray-300 dark:border-white/10 flex items-center justify-center text-[#607D8B] dark:text-[#9BA6AD] hover:border-[#61DBD6] hover:text-[#61DBD6] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-[11px] font-bold text-[#263238] dark:text-white uppercase tracking-widest mb-5">
              Navegación
            </p>
            <ul className="space-y-3 text-sm text-[#607D8B] dark:text-[#9BA6AD]">
              {[
                { href: "/#producto",         label: "Producto" },
                { href: "/#funcionalidades",  label: "Funcionalidades" },
                { href: "/#quienes-somos",    label: "Nosotros" },
                { href: "/#como-funciona",    label: "Cómo funciona" },
                { href: "/#contacto",         label: "Contacto" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-[#61DBD6] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-bold text-[#263238] dark:text-white uppercase tracking-widest mb-5">
              Legal
            </p>
            <ul className="space-y-3 text-sm text-[#607D8B] dark:text-[#9BA6AD]">
              <li>
                <Link href="/privacidad" className="hover:text-[#61DBD6] transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/aviso-legal" className="hover:text-[#61DBD6] transition-colors">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[#61DBD6] transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-[11px] font-bold text-[#263238] dark:text-white uppercase tracking-widest mb-5">
              Contacto
            </p>
            <ul className="space-y-3 text-sm text-[#607D8B] dark:text-[#9BA6AD]">
              <li>
                <a href="mailto:hello@unyona.com" className="hover:text-[#61DBD6] transition-colors">
                  hello@unyona.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/unyona.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#61DBD6] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/unyona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#61DBD6] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra inferior */}
        <div className="border-t border-gray-200 dark:border-white/5 pt-7 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#9BA6AD]">
          <span>© {year} Unyona · Todos los derechos reservados</span>
          <span>
            Diseñado y construido por{" "}
            <span className="text-[#61DBD6] font-semibold">Borja Olazabal</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
