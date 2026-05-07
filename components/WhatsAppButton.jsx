'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';

/**
 * Botón flotante de WhatsApp - número único centralizado
 */

const WhatsAppButton = ({ message = '' }) => {
  const { translations, getWhatsAppNumber, country, countryConfig } = useLocale();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  // Mensaje predefinido según idioma
  const getDefaultMessage = () => translations?.contact?.whatsappDefaultMessage;
  const whatsappForm = translations?.contact?.whatsappForm;

  const handleOpenForm = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSend = () => {
    if (!userMessage || userMessage.trim().length === 0) return;
    setLoading(true);
    let fullMessage = '';
    const countryName = countryConfig?.name || country;
    if (countryName) fullMessage += `Hola! Soy de ${countryName}\n`;
    if (userMessage && userMessage.trim().length > 0) {
      fullMessage += userMessage.trim();
    }
    // Limpia saltos de línea extra al final
    fullMessage = fullMessage.replace(/\n+$/, '');
    const whatsappUrl = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
    setTimeout(() => {
      setShowForm(false);
      setLoading(false);
      setUserMessage('');
      setSelectedOption(null);
    }, 500);
  };

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        onClick={handleOpenForm}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={translations?.contact?.whatsappButton}
      >
        {/* Icono de WhatsApp */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {/* Texto opcional */}
        <span className="hidden sm:inline font-medium">
          {translations?.contact?.whatsappButton}
        </span>
      </motion.button>

      {/* Modal formulario */}
      {showForm && (
        <div className="fixed inset-0 z-[999] bg-black/40 pointer-events-none">
          {/* Modal absolutamente posicionado sobre el botón flotante SIEMPRE */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-6 bottom-[80px] bg-primary-black/95 border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-7 w-[95vw] max-w-xs flex flex-col items-center pointer-events-auto backdrop-blur-md"
          >
            <span className="text-white text-base font-bold text-center mb-4 tracking-tight">
              {whatsappForm?.title}
            </span>
            {false && (
              <div className="flex flex-col gap-3 w-full">
                {whatsappForm?.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`w-full bg-transparent border border-purple-500 rounded-xl py-2 px-4 font-semibold text-sm transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60 ${selectedOption === opt ? 'bg-purple-600/80 text-white border-purple-400' : 'text-purple-200 hover:bg-purple-600/80 hover:text-white'}`}
                    onClick={() => handleOptionClick(opt)}
                    disabled={loading}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            <div className="w-full flex flex-col gap-1 mt-1">
              <label className="text-xs text-gray-400 font-medium pl-1">
                {whatsappForm?.placeholder || '¿En qué podemos ayudarte?'}
              </label>
              <textarea
                className="w-full rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 transition-all"
                rows={5}
                placeholder="Escribe tu mensaje aquí..."
                value={userMessage}
                onChange={e => setUserMessage(e.target.value)}
                disabled={loading}
                maxLength={300}
                autoFocus
              />
              <span className="text-right text-[10px] text-gray-500 pr-1">{userMessage.length}/300</span>
            </div>
            <button
              type="button"
              className="mt-4 w-full bg-purple-500 text-white font-semibold py-2 rounded-xl shadow-md hover:bg-purple-600 transition-all disabled:opacity-60"
              onClick={handleSend}
              disabled={loading || !userMessage || userMessage.trim().length === 0}
            >
              {translations?.contact?.whatsappForm?.send || 'Enviar'}
            </button>
            <button
              className="mt-6 text-xs text-secondary-white hover:text-white underline underline-offset-2 tracking-tight"
              onClick={handleCloseForm}
              disabled={loading}
            >
              {whatsappForm?.close || 'Cerrar'}
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
