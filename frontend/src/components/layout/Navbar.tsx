"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#producto",       label: "Producto" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#como-funciona",  label: "Cómo funciona" },
  { href: "#quienes-somos",  label: "Nosotros" },
  { href: "#contacto",       label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar fixed top-0 left-0 w-full z-50 bg-white/85 dark:bg-[#1a1a1a]/85 backdrop-blur-3xl border-b border-gray-200/60 dark:border-white/5">
      <nav className="mx-auto flex justify-between items-center py-4 px-6">

        {/* LOGO */}
        <Link href="/" aria-label="Inicio - Unyona" className="flex items-center gap-2.5">
          <img
            src="/images/logo_unyona.png"
            alt="Unyona"
            className="h-16 w-auto"
          />
        </Link>

        {/* MENÚ DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[#607D8B] dark:text-[#9BA6AD] hover:text-[#61DBD6] dark:hover:text-[#61DBD6] transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contacto"
              className="px-5 py-2 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white text-sm font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#61DBD6]/25 transition-all duration-200"
            >
              Únete a la beta
            </a>
          </div>
        </div>

        {/* MÓVIL */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#61DBD6] transition-colors"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* MENÚ MÓVIL */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-[64px] bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="md:hidden fixed top-[64px] left-0 w-full bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-white/5 z-40">
            <ul className="flex flex-col px-6 py-6 gap-5 text-base font-medium">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className="text-[#263238] dark:text-[#E1E5E8] hover:text-[#61DBD6]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="block text-center px-6 py-3 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white font-bold rounded-full"
                >
                  Únete a la beta
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}