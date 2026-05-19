import Link from "next/link";

export const metadata = {
  title: "Politica de Privacidad · Unyona",
  description:
    "Informacion sobre como Unyona recoge, usa y protege tus datos personales de acuerdo con el RGPD y la LOPD-GDD.",
  alternates: { canonical: "https://unyona.com/privacidad" },
  robots: { index: true, follow: false },
};

const tocItems = [
  { id: "responsable",     label: "Responsable del tratamiento" },
  { id: "datos",           label: "Datos que tratamos" },
  { id: "base-legal",      label: "Base legal" },
  { id: "conservacion",    label: "Tiempo de conservación" },
  { id: "destinatarios",   label: "Destinatarios y transferencias" },
  { id: "derechos",        label: "Tus derechos" },
  { id: "aepd",            label: "Reclamación ante la AEPD" },
  { id: "actualizaciones", label: "Actualizaciones" },
];

export default function PrivacidadPage() {
  return (
    <div>
      <section className="pt-24 pb-10 bg-gradient-to-br from-[#e8faf9] via-white to-white dark:from-[#0d2b2a] dark:via-[#1a1a1a] dark:to-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#61DBD6] hover:underline mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver a inicio
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-xl bg-[#61DBD6]/15 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#61DBD6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </span>
            <h1 className="text-3xl font-bold text-[#263238] dark:text-white font-poppins">
              Pol&iacute;tica de Privacidad
            </h1>
          </div>
          <p className="text-sm text-[#607D8B] dark:text-[#9BA6AD]">
            &Uacute;ltima actualizaci&oacute;n: <strong>mayo de 2026</strong>
          </p>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-6">

          <nav className="mb-10 p-5 bg-[#f7f9fa] dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
            <p className="text-xs font-bold text-[#607D8B] dark:text-[#9BA6AD] uppercase tracking-widest mb-3">
              Contenido
            </p>
            <ol className="space-y-1">
              {tocItems.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-2 text-sm text-[#455A64] dark:text-[#9BA6AD] hover:text-[#61DBD6] dark:hover:text-[#61DBD6] transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#61DBD6]/15 text-[#61DBD6] text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <p className="text-[#455A64] dark:text-[#9BA6AD] leading-relaxed mb-10 text-[15px]">
            En Unyona nos tomamos muy en serio la protecci&oacute;n de tu privacidad. Esta pol&iacute;tica
            explica qu&eacute; datos personales recogemos, con qu&eacute; finalidad, cu&aacute;nto tiempo los
            conservamos y cu&aacute;les son tus derechos, de conformidad con el{" "}
            <strong className="text-[#263238] dark:text-white">Reglamento (UE) 2016/679 (RGPD)</strong>{" "}
            y la{" "}
            <strong className="text-[#263238] dark:text-white">Ley Org&aacute;nica 3/2018 de Protecci&oacute;n de Datos (LOPD-GDD)</strong>.
          </p>

          <div id="responsable" className="scroll-mt-28 mb-10">
            <h2 className="text-lg font-bold text-[#263238] dark:text-white font-poppins mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#61DBD6] text-white text-xs font-bold flex items-center justify-center">1</span>
              Responsable del tratamiento
            </h2>
            <div className="bg-[#e8faf9] dark:bg-[#61DBD6]/10 border-l-4 border-[#61DBD6] rounded-r-xl p-4 text-sm text-[#263238] dark:text-[#d0f0ee] leading-relaxed">
              <p><strong>Denominaci&oacute;n:</strong> Unyona (proyecto en desarrollo)</p>
              <p className="mt-1"><strong>Correo electr&oacute;nico de contacto:</strong>{" "}
                <a href="mailto:hello@unyona.com" className="text-[#61DBD6] hover:underline">hello@unyona.com</a>
              </p>
              <p className="mt-1"><strong>Sitio web:</strong>{" "}
                <a href="https://unyona.com" className="text-[#61DBD6] hover:underline">unyona.com</a>
              </p>
              <p className="mt-2 text-xs text-[#607D8B] dark:text-[#9BA6AD]">
                Unyona se encuentra en proceso de constituci&oacute;n societaria. Una vez formalizada la
                sociedad, actualizaremos esta pol&iacute;tica con los datos registrales completos (denominaci&oacute;n
                social, CIF, domicilio social e inscripci&oacute;n en el Registro Mercantil).
              </p>
            </div>
          </div>

          <div id="datos" className="scroll-mt-28 mb-10">
            <h2 className="text-lg font-bold text-[#263238] dark:text-white font-poppins mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#61DBD6] text-white text-xs font-bold flex items-center justify-center">2</span>
              Datos que tratamos y finalidades
            </h2>
            <p className="text-[#455A64] dark:text-[#9BA6AD] text-sm leading-relaxed mb-4">
              Recogemos &uacute;nicamente los datos que nos proporcionas de forma voluntaria a trav&eacute;s de
              los formularios del sitio web.
            </p>
            <div className="mb-4 p-4 border border-gray-100 dark:border-white/10 rounded-xl">
              <h3 className="font-bold text-[#263238] dark:text-white text-sm mb-2">2.1 Suscripci&oacute;n al newsletter</h3>
              <ul className="text-sm text-[#455A64] dark:text-[#9BA6AD] space-y-1 list-none">
                <li><span className="text-[#61DBD6] font-bold mr-2">&rarr;</span><strong>Datos:</strong> nombre y correo electr&oacute;nico.</li>
                <li><span className="text-[#61DBD6] font-bold mr-2">&rarr;</span><strong>Finalidad:</strong> env&iacute;o de la c&aacute;psula informativa semanal de Unyona.</li>
                <li><span className="text-[#61DBD6] font-bold mr-2">&rarr;</span><strong>Proceso:</strong> doble confirmaci&oacute;n (double opt-in) &mdash; recibir&aacute;s un email de verificaci&oacute;n antes de ser a&ntilde;adido a la lista.</li>
              </ul>
            </div>
            <div className="mb-4 p-4 border border-gray-100 dark:border-white/10 rounded-xl">
              <h3 className="font-bold text-[#263238] dark:text-white text-sm mb-2">2.2 Formulario de contacto</h3>
              <ul className="text-sm text-[#455A64] dark:text-[#9BA6AD] space-y-1 list-none">
                <li><span className="text-[#61DBD6] font-bold mr-2">&rarr;</span><strong>Datos:</strong> nombre, correo electr&oacute;nico, asunto y mensaje.</li>
                <li><span className="text-[#61DBD6] font-bold mr-2">&rarr;</span><strong>Finalidad:</strong> atender y responder tu consulta.</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-100 dark:border-white/10 rounded-xl">
              <h3 className="font-bold text-[#263238] dark:text-white text-sm mb-2">2.3 Lista de espera (beta privada)</h3>
              <ul className="text-sm text-[#455A64] dark:text-[#9BA6AD] space-y-1 list-none">
                <li><span className="text-[#61DBD6] font-bold mr-2">&rarr;</span><strong>Datos:</strong> nombre, correo electr&oacute;nico y datos opcionales de perfil (ciudad, intereses).</li>
                <li><span className="text-[#61DBD6] font-bold mr-2">&rarr;</span><strong>Finalidad:</strong> gestionar el acceso prioritario a la beta y personalizar la experiencia inicial.</li>
              </ul>
            </div>
          </div>

          <div id="base-legal" className="scroll-mt-28 mb-10">
            <h2 className="text-lg font-bold text-[#263238] dark:text-white font-poppins mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#61DBD6] text-white text-xs font-bold flex items-center justify-center">3</span>
              Base legal para el tratamiento
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f7f9fa] dark:bg-white/5">
                    <th className="text-left p-3 text-[#263238] dark:text-white font-semibold rounded-tl-lg">Tratamiento</th>
                    <th className="text-left p-3 text-[#263238] dark:text-white font-semibold rounded-tr-lg">Base legal (Art. 6 RGPD)</th>
                  </tr>
                </thead>
                <tbody className="text-[#455A64] dark:text-[#9BA6AD]">
                  <tr className="border-t border-gray-100 dark:border-white/10">
                    <td className="p-3">Newsletter</td>
                    <td className="p-3">Consentimiento del interesado (Art. 6.1.a)</td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-white/10">
                    <td className="p-3">Lista de espera beta</td>
                    <td className="p-3">Consentimiento del interesado (Art. 6.1.a)</td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-white/10">
                    <td className="p-3">Formulario de contacto</td>
                    <td className="p-3">Inter&eacute;s leg&iacute;timo para atender tu consulta (Art. 6.1.f)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#607D8B] dark:text-[#9BA6AD] mt-3 leading-relaxed">
              Puedes retirar tu consentimiento en cualquier momento sin que ello afecte a la licitud del
              tratamiento previo. Para hacerlo, utiliza el enlace de baja incluido en cada email o
              esc&iacute;benos a{" "}
              <a href="mailto:hello@unyona.com" className="text-[#61DBD6] hover:underline">hello@unyona.com</a>.
            </p>
          </div>

          <div id="conservacion" className="scroll-mt-28 mb-10">
            <h2 className="text-lg font-bold text-[#263238] dark:text-white font-poppins mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#61DBD6] text-white text-xs font-bold flex items-center justify-center">4</span>
              Tiempo de conservaci&oacute;n
            </h2>
            <ul className="text-sm text-[#455A64] dark:text-[#9BA6AD] space-y-2">
              <li className="flex gap-2">
                <span className="text-[#61DBD6] mt-0.5">&bull;</span>
                <span><strong className="text-[#263238] dark:text-white">Newsletter y beta:</strong>{" "}
                  hasta que retires tu consentimiento mediante la baja o transcurran 3 a&ntilde;os desde el
                  &uacute;ltimo env&iacute;o sin interacci&oacute;n.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#61DBD6] mt-0.5">&bull;</span>
                <span><strong className="text-[#263238] dark:text-white">Contacto:</strong>{" "}
                  durante el tiempo necesario para gestionar tu consulta y, posteriormente, hasta 1 a&ntilde;o
                  por si fuese necesario acreditar la respuesta facilitada.</span>
              </li>
            </ul>
          </div>

          <div id="destinatarios" className="scroll-mt-28 mb-10">
            <h2 className="text-lg font-bold text-[#263238] dark:text-white font-poppins mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#61DBD6] text-white text-xs font-bold flex items-center justify-center">5</span>
              Destinatarios y transferencias internacionales
            </h2>
            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed mb-4">
              No cedemos tus datos a terceros salvo obligaci&oacute;n legal. Utilizamos los siguientes
              encargados de tratamiento para prestar el servicio:
            </p>
            <div className="p-4 bg-[#f7f9fa] dark:bg-white/5 rounded-xl text-sm text-[#455A64] dark:text-[#9BA6AD] space-y-3">
              <div>
                <p className="font-semibold text-[#263238] dark:text-white">Resend, Inc.</p>
                <p>Servicio de env&iacute;o de correo electr&oacute;nico transaccional y gesti&oacute;n de listas
                de newsletter. Empresa con sede en Estados Unidos.</p>
                <p className="mt-1 text-xs">
                  La transferencia internacional se realiza bajo el marco{" "}
                  <strong>EU&ndash;US Data Privacy Framework</strong> y cl&aacute;usulas contractuales tipo
                  aprobadas por la Comisi&oacute;n Europea. M&aacute;s informaci&oacute;n en{" "}
                  <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer"
                     className="text-[#61DBD6] hover:underline">resend.com/legal/privacy-policy</a>.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-white/10 pt-3">
                <p className="font-semibold text-[#263238] dark:text-white">Cloudflare, Inc.</p>
                <p>Alojamiento del sitio web y red de distribuci&oacute;n de contenidos (CDN). Empresa con sede
                en Estados Unidos, con certificaci&oacute;n bajo el EU&ndash;US Data Privacy Framework.</p>
              </div>
            </div>
          </div>

          <div id="derechos" className="scroll-mt-28 mb-10">
            <h2 className="text-lg font-bold text-[#263238] dark:text-white font-poppins mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#61DBD6] text-white text-xs font-bold flex items-center justify-center">6</span>
              Tus derechos
            </h2>
            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed mb-4">
              El RGPD y la LOPD-GDD te reconocen los siguientes derechos respecto a tus datos personales:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <div className="p-3 border border-gray-100 dark:border-white/10 rounded-lg">
                <p className="font-semibold text-[#263238] dark:text-white text-sm">Acceso</p>
                <p className="text-xs text-[#607D8B] dark:text-[#9BA6AD] mt-0.5">Conocer qu&eacute; datos tuyos tratamos.</p>
              </div>
              <div className="p-3 border border-gray-100 dark:border-white/10 rounded-lg">
                <p className="font-semibold text-[#263238] dark:text-white text-sm">Rectificaci&oacute;n</p>
                <p className="text-xs text-[#607D8B] dark:text-[#9BA6AD] mt-0.5">Corregir datos inexactos o incompletos.</p>
              </div>
              <div className="p-3 border border-gray-100 dark:border-white/10 rounded-lg">
                <p className="font-semibold text-[#263238] dark:text-white text-sm">Supresi&oacute;n</p>
                <p className="text-xs text-[#607D8B] dark:text-[#9BA6AD] mt-0.5">Solicitar el borrado de tus datos (&ldquo;derecho al olvido&rdquo;).</p>
              </div>
              <div className="p-3 border border-gray-100 dark:border-white/10 rounded-lg">
                <p className="font-semibold text-[#263238] dark:text-white text-sm">Oposici&oacute;n</p>
                <p className="text-xs text-[#607D8B] dark:text-[#9BA6AD] mt-0.5">Oponerte al tratamiento en determinados supuestos.</p>
              </div>
              <div className="p-3 border border-gray-100 dark:border-white/10 rounded-lg">
                <p className="font-semibold text-[#263238] dark:text-white text-sm">Portabilidad</p>
                <p className="text-xs text-[#607D8B] dark:text-[#9BA6AD] mt-0.5">Recibir tus datos en formato estructurado y legible.</p>
              </div>
              <div className="p-3 border border-gray-100 dark:border-white/10 rounded-lg">
                <p className="font-semibold text-[#263238] dark:text-white text-sm">Limitaci&oacute;n</p>
                <p className="text-xs text-[#607D8B] dark:text-[#9BA6AD] mt-0.5">Restringir el tratamiento de tus datos en ciertos casos.</p>
              </div>
            </div>
            <div className="bg-[#e8faf9] dark:bg-[#61DBD6]/10 border-l-4 border-[#61DBD6] rounded-r-xl p-4 text-sm">
              <p className="font-semibold text-[#263238] dark:text-white mb-1">&iquest;C&oacute;mo ejercer tus derechos?</p>
              <p className="text-[#455A64] dark:text-[#9BA6AD]">
                Env&iacute;a un email a{" "}
                <a href="mailto:hello@unyona.com" className="text-[#61DBD6] font-semibold hover:underline">hello@unyona.com</a>{" "}
                indicando el derecho que deseas ejercer y adjuntando un documento acreditativo de tu identidad.
                Responderemos en el plazo m&aacute;ximo de <strong className="text-[#263238] dark:text-white">30 d&iacute;as</strong>.
              </p>
            </div>
          </div>

          <div id="aepd" className="scroll-mt-28 mb-10">
            <h2 className="text-lg font-bold text-[#263238] dark:text-white font-poppins mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#61DBD6] text-white text-xs font-bold flex items-center justify-center">7</span>
              Reclamaci&oacute;n ante la AEPD
            </h2>
            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed">
              Si consideras que el tratamiento de tus datos no es conforme al RGPD, tienes derecho a presentar
              una reclamaci&oacute;n ante la Agencia Espa&ntilde;ola de Protecci&oacute;n de Datos (AEPD),
              autoridad de control competente en Espa&ntilde;a.
            </p>
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-sm text-[#61DBD6] hover:underline"
            >
              www.aepd.es
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>

          <div id="actualizaciones" className="scroll-mt-28 mb-12">
            <h2 className="text-lg font-bold text-[#263238] dark:text-white font-poppins mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#61DBD6] text-white text-xs font-bold flex items-center justify-center">8</span>
              Actualizaciones de esta pol&iacute;tica
            </h2>
            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed">
              Podemos actualizar esta pol&iacute;tica cuando sea necesario. Cuando lo hagamos, actualizaremos
              la fecha de la parte superior. Si los cambios son significativos, te lo comunicaremos por correo
              electr&oacute;nico si eres suscriptor.
            </p>
          </div>

          <div className="border-t border-gray-100 dark:border-white/10 pt-6 flex flex-wrap justify-between items-center gap-4 text-sm">
            <Link href="/" className="inline-flex items-center gap-1.5 text-[#61DBD6] hover:underline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Volver al inicio
            </Link>
            <div className="flex gap-4 text-[#607D8B] dark:text-[#9BA6AD]">
              <Link href="/aviso-legal" className="hover:text-[#61DBD6] transition-colors">Aviso Legal</Link>
              <Link href="/cookies" className="hover:text-[#61DBD6] transition-colors">Cookies</Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
