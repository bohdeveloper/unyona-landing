export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* ... */}
        <div>
        </div>

        {/* Credits */}
        <div className="text-center text-sm text-[#607D8B] dark:text-[#9BA6AD]">
          <span>Diseñado y construido por </span>
          <span className="text-[#61DBD6] font-semibold">Borja Olazabal</span>
          <span className="block mt-0.5">© {year} Unyona · Todos los derechos reservados</span>
        </div>

        {/* ... */}
        <div>
        </div>

      </div>
    </footer>
  );
}