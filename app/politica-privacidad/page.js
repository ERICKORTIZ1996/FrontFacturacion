"use client"

import { useEffect } from "react"

export default function PoliticaPrivacidad() {
    // Actualizar título de la página
    useEffect(() => {
        document.title = "Política de Privacidad - Lazzyfact"
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a1620] to-[#1a2332] py-12 px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#153350]/50 to-[#1f3850]/50 rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-700">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <div className="bg-[#077eeb]/20 rounded-full p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-[#077eeb]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.11L8.29 9.885c1.15.8 1.15 2.4 0 3.2L3.598 16.86A11.959 11.959 0 006 21.75h12a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H6a11.959 11.959 0 00-2.402 1.14l4.692 3.775c1.15.8 1.15 2.4 0 3.2l-4.692 3.775A11.959 11.959 0 016 21.75h12a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H6z" />
                            </svg>
                        </div>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
                        Política de Privacidad
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Lazzyfact - Sistema de Facturación Electrónica
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Información de la aplicación y entidad */}
                <div className="bg-[#05121f]/60 rounded-2xl p-6 mb-8 border border-[#061727]">
                    <h2 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        Información de la Aplicación y Entidad Legal
                    </h2>
                    <div className="space-y-2 text-gray-300">
                        <p><span className="font-semibold">Nombre de la Aplicación:</span> Lazzyfact</p>
                        <p><span className="font-semibold">Tipo de Servicio:</span> Sistema de Facturación Electrónica</p>
                        <p><span className="font-semibold">Descripción:</span> Plataforma web y móvil para la gestión, emisión y autorización de facturas electrónicas en Ecuador, cumpliendo con las normativas del Servicio de Rentas Internas (SRI).</p>
                        <p><span className="font-semibold">Entidad Legal / Desarrollador:</span> Lazzyfact</p>
                    </div>
                </div>

                {/* Contenido de la política */}
                <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
                    
                    {/* 1. Introducción */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">1. Introducción</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Lazzyfact ("nosotros", "nuestro" o "la aplicación") se compromete a proteger la privacidad de los usuarios de nuestra aplicación móvil y plataforma web. Esta Política de Privacidad describe cómo Lazzyfact recopila, utiliza, almacena y protege la información personal de los usuarios que utilizan nuestro Sistema de Facturación Electrónica.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            Al utilizar Lazzyfact, usted acepta las prácticas descritas en esta política. Si no está de acuerdo con esta política, le recomendamos que no utilice nuestros servicios.
                        </p>
                    </section>

                    {/* 2. Información que recopilamos */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">2. Información que Recopilamos</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Lazzyfact recopila la siguiente información para proporcionar y mejorar nuestros servicios:
                        </p>
                        <div className="space-y-3">
                            <div className="bg-[#05121f]/40 rounded-lg p-4 border border-[#061727]">
                                <h3 className="font-semibold text-gray-200 mb-2">2.1. Información de Cuenta</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300 ml-2">
                                    <li>Nombre completo</li>
                                    <li>Dirección de correo electrónico</li>
                                    <li>Contraseña (encriptada)</li>
                                    <li>Rol y permisos de usuario</li>
                                </ul>
                            </div>
                            <div className="bg-[#05121f]/40 rounded-lg p-4 border border-[#061727]">
                                <h3 className="font-semibold text-gray-200 mb-2">2.2. Información de Empresa</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300 ml-2">
                                    <li>Razón social</li>
                                    <li>Número de RUC (Registro Único de Contribuyentes)</li>
                                    <li>Dirección fiscal</li>
                                    <li>Teléfono de contacto</li>
                                    <li>Información de sucursales y puntos de emisión</li>
                                </ul>
                            </div>
                            <div className="bg-[#05121f]/40 rounded-lg p-4 border border-[#061727]">
                                <h3 className="font-semibold text-gray-200 mb-2">2.3. Información de Facturación</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300 ml-2">
                                    <li>Datos de clientes (RUC, razón social, dirección)</li>
                                    <li>Productos y servicios facturados</li>
                                    <li>Archivos de certificados digitales (.p12)</li>
                                    <li>Documentos XML y PDF de facturas</li>
                                    <li>Historial de transacciones</li>
                                </ul>
                            </div>
                            <div className="bg-[#05121f]/40 rounded-lg p-4 border border-[#061727]">
                                <h3 className="font-semibold text-gray-200 mb-2">2.4. Información Técnica</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300 ml-2">
                                    <li>Dirección IP</li>
                                    <li>Tipo de dispositivo y sistema operativo</li>
                                    <li>Registros de uso de la aplicación</li>
                                    <li>Tokens de autenticación</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 3. Cómo utilizamos la información */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">3. Cómo Utilizamos la Información</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Lazzyfact utiliza la información recopilada para los siguientes propósitos:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>Proporcionar y mantener el servicio de facturación electrónica</li>
                            <li>Autenticar usuarios y gestionar sesiones</li>
                            <li>Generar, firmar y autorizar facturas electrónicas según normativas del SRI</li>
                            <li>Almacenar y gestionar documentos fiscales (XML, PDF)</li>
                            <li>Procesar solicitudes y proporcionar soporte técnico</li>
                            <li>Mejorar la funcionalidad y seguridad de la aplicación</li>
                            <li>Cumplir con obligaciones legales y fiscales</li>
                            <li>Enviar notificaciones importantes sobre el servicio</li>
                        </ul>
                    </section>

                    {/* 4. Compartir información */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">4. Compartir Información</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Lazzyfact no vende, alquila ni comparte información personal con terceros, excepto en las siguientes circunstancias:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li><strong>Servicio de Rentas Internas (SRI):</strong> Lazzyfact puede transmitir información de facturas electrónicas al SRI según lo requerido por la normativa ecuatoriana.</li>
                            <li><strong>Proveedores de Servicios:</strong> Podemos compartir información con proveedores de servicios que nos ayudan a operar la aplicación (hosting, seguridad), bajo estrictos acuerdos de confidencialidad.</li>
                            <li><strong>Requisitos Legales:</strong> Podemos divulgar información si es requerido por ley, orden judicial o proceso legal.</li>
                            <li><strong>Con su Consentimiento:</strong> Compartiremos información con terceros cuando usted nos dé su consentimiento explícito.</li>
                        </ul>
                    </section>

                    {/* 5. Seguridad de los datos */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">5. Seguridad de los Datos</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Lazzyfact implementa medidas de seguridad técnicas y organizativas para proteger su información:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li>Encriptación de datos en tránsito (HTTPS/TLS)</li>
                            <li>Encriptación de datos sensibles almacenados</li>
                            <li>Autenticación mediante tokens seguros</li>
                            <li>Acceso restringido a información personal solo para personal autorizado</li>
                            <li>Monitoreo regular de sistemas para detectar vulnerabilidades</li>
                            <li>Copias de seguridad regulares de los datos</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro. Aunque nos esforzamos por proteger su información, no podemos garantizar seguridad absoluta.
                        </p>
                    </section>

                    {/* 6. Retención de datos */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">6. Retención de Datos</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Lazzyfact conserva su información personal mientras su cuenta esté activa y durante el tiempo necesario para cumplir con nuestras obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos. Los documentos fiscales (facturas electrónicas) se conservan según los plazos establecidos por la normativa ecuatoriana del SRI, que generalmente requiere conservación por un período mínimo de 7 años.
                        </p>
                    </section>

                    {/* 7. Sus derechos */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">7. Sus Derechos</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Como usuario de Lazzyfact, usted tiene los siguientes derechos:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            <li><strong>Acceso:</strong> Puede solicitar una copia de la información personal que tenemos sobre usted.</li>
                            <li><strong>Rectificación:</strong> Puede corregir información inexacta o incompleta.</li>
                            <li><strong>Eliminación:</strong> Puede solicitar la eliminación de su cuenta y datos personales, sujeto a obligaciones legales de retención.</li>
                            <li><strong>Portabilidad:</strong> Puede solicitar una copia de sus datos en formato estructurado.</li>
                            <li><strong>Oposición:</strong> Puede oponerse al procesamiento de sus datos personales en ciertas circunstancias.</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            Para ejercer estos derechos, puede contactarnos a través de la aplicación o visitar nuestra página de <a href="/eliminar-cuenta" className="text-[#077eeb] hover:underline">eliminación de cuenta</a>.
                        </p>
                    </section>

                    {/* 8. Cookies y tecnologías similares */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">8. Cookies y Tecnologías Similares</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Lazzyfact utiliza cookies y tecnologías similares para mantener sesiones de usuario, mejorar la experiencia y analizar el uso de la aplicación. Puede gestionar las preferencias de cookies a través de la configuración de su navegador o dispositivo.
                        </p>
                    </section>

                    {/* 9. Menores de edad */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">9. Menores de Edad</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Lazzyfact no está dirigido a menores de 18 años. No recopilamos intencionalmente información personal de menores. Si descubrimos que hemos recopilado información de un menor, tomaremos medidas para eliminar esa información de nuestros sistemas.
                        </p>
                    </section>

                    {/* 10. Cambios a esta política */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">10. Cambios a esta Política</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Lazzyfact puede actualizar esta Política de Privacidad ocasionalmente. Le notificaremos sobre cambios significativos publicando la nueva política en esta página y actualizando la fecha de "Última actualización". Le recomendamos revisar esta política periódicamente.
                        </p>
                    </section>

                    {/* 11. Contacto */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">11. Contacto</h2>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Si tiene preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el manejo de sus datos personales por parte de Lazzyfact, puede contactarnos:
                        </p>
                        <div className="bg-[#05121f]/40 rounded-lg p-4 border border-[#061727]">
                            <p className="text-gray-300"><strong>Aplicación:</strong> Lazzyfact</p>
                            <p className="text-gray-300"><strong>Servicio:</strong> Sistema de Facturación Electrónica</p>
                            <p className="text-gray-300"><strong>Contacto:</strong> A través de la aplicación Lazzyfact o visitando nuestra página de <a href="/eliminar-cuenta" className="text-[#077eeb] hover:underline">eliminación de cuenta</a> para solicitudes de eliminación de datos.</p>
                        </div>
                    </section>

                </div>

                {/* Footer */}
                <div className="mt-10 pt-6 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-500">
                        Lazzyfact - Sistema de Facturación Electrónica
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Esta política de privacidad cumple con los requisitos de Google Play Store y las normativas de protección de datos aplicables.
                    </p>
                </div>
            </div>
        </div>
    )
}

