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
    <>
      <header className="navbar fixed top-0 left-0 w-full z-50 bg-white/85 dark:bg-[#1a1a1a]/85 backdrop-blur-3xl border-b border-gray-200/60 dark:border-white/5">
        <nav className="max-w-full mx-auto flex justify-between items-center py-4 px-6">

          {/* LOGO */}
          <Link href="/" aria-label="Inicio - Unyona" className="flex items-center gap-2.5">
            <img
              src="/images/logo.png"
              alt="Unyona"
              className="h-10 w-auto"
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

          {/* MÓVIL — botón hamburguesa */}
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
      </header>

      {/* MENÚ MÓVIL — fuera del header para evitar que backdrop-blur rompa el fixed */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-[#1a1a1a] z-[60] flex flex-col">
          {/* Cabecera del overlay */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/5">
            <Link href="/" aria-label="Inicio - Unyona" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <img src="/images/logo.png" alt="Unyona" className="h-10 w-auto" />
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#61DBD6] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Links centrados verticalmente */}
          <ul className="flex flex-col flex-1 justify-center px-8 gap-8 text-xl font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="block text-[#263238] dark:text-[#E1E5E8] hover:text-[#61DBD6] dark:hover:text-[#61DBD6] transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="block text-center px-6 py-4 bg-gradient-to-r from-[#61DBD6] to-[#46D4D0] text-white font-bold rounded-full text-base"
              >
                Únete a la beta
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
