'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Modal de contacto reutilizable.
 * Props:
 *   isOpen   {boolean}
 *   onClose  {() => void}
 *   type     {'contact' | 'quote' | 'demo'}  — cambia título/subtítulo/tema del email
 */
const ContactModal = ({ isOpen, onClose, type = 'contact' }) => {
  const { translations } = useContext(LanguageContext);
  const cm = translations?.feedback?.contactModal || {};
  const ctaTexts = translations?.cta || {};

  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', message: '' });
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const emailInvalid = emailTouched && form.email.length > 0 && !EMAIL_RE.test(form.email);
  const isValid = agreed && phoneValid && form.name.trim() && EMAIL_RE.test(form.email) && form.message.trim();

  const titleMap = {
    quote: ctaTexts.quoteModalTitle || cm.title,
    demo:  ctaTexts.demoModalTitle  || cm.title,
    contact: cm.title,
  };
  const subtitleMap = {
    quote: ctaTexts.quoteModalSubtitle || cm.subtitle,
    demo:  ctaTexts.demoModalSubtitle  || cm.subtitle,
    contact: cm.subtitle,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: type }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const handleClose = () => {
    onClose();
    setForm({ name: '', company: '', phone: '', email: '', message: '' });
    setPhoneValid(true);
    setEmailTouched(false);
    setAgreed(false);
    setStatus(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className='fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4'
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
            className='bg-primary-black/95 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md flex flex-col pointer-events-auto backdrop-blur-md max-h-[90vh] overflow-y-auto modal-scrollbar'
          >
            {status === 'success' ? (
              <div className='flex flex-col items-center gap-4 py-6'>
                <svg className='w-14 h-14 text-green-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <p className='text-white font-semibold text-center text-lg'>{cm.success}</p>
                <button onClick={handleClose} className='mt-2 text-xs text-secondary-white hover:text-white underline underline-offset-2'>
                  {cm.close || 'Cerrar'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                {/* Indicador de tipo */}
                {type !== 'contact' && (
                  <div className='flex items-center gap-2 mb-1'>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${type === 'quote' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'}`}>
                      {type === 'quote' ? (ctaTexts.quoteBadge || 'Cotización') : (ctaTexts.demoBadge || 'Demo gratuita')}
                    </span>
                  </div>
                )}
                <div className='mb-2'>
                  <h3 className='text-white font-bold text-xl leading-tight'>{titleMap[type]}</h3>
                  <p className='text-gray-400 text-sm mt-1'>{subtitleMap[type]}</p>
                </div>

                <input
                  name='name' value={form.name} onChange={handleChange} required
                  placeholder={cm.namePlaceholder || 'Tu nombre'}
                  className='w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                />
                <input
                  name='company' value={form.company} onChange={handleChange}
                  placeholder={cm.companyPlaceholder || 'Empresa'}
                  className='w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                />

                <div>
                  <PhoneInput
                    country='uy'
                    value={form.phone}
                    onChange={(value, _data, _e, formattedValue) => {
                      setForm(prev => ({ ...prev, phone: formattedValue }));
                    }}
                    isValid={(value, country) => {
                      if (!value || value === country.dialCode) { setPhoneValid(true); return true; }
                      const digits = value.replace(/\D/g, '');
                      const valid = digits.length >= 7;
                      setPhoneValid(valid);
                      return valid || cm.phoneError || 'Número inválido';
                    }}
                    inputStyle={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: `1px solid ${phoneValid ? 'rgba(255,255,255,0.1)' : 'rgb(248,113,113)'}`, borderRadius: '0.75rem', color: '#fff', fontSize: '0.875rem', height: '42px', paddingLeft: '52px' }}
                    buttonStyle={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${phoneValid ? 'rgba(255,255,255,0.1)' : 'rgb(248,113,113)'}`, borderRight: 'none', borderRadius: '0.75rem 0 0 0.75rem' }}
                    dropdownStyle={{ background: '#1a1a2e', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem' }}
                    searchStyle={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', width: '90%' }}
                    placeholder={cm.phonePlaceholder || 'Teléfono'}
                    enableSearch specialLabel=''
                  />
                  {!phoneValid && <p className='text-red-400 text-xs mt-1 pl-1'>{cm.phoneError || 'Número de teléfono inválido'}</p>}
                </div>

                <div>
                  <input
                    name='email' type='email' value={form.email}
                    onChange={handleChange}
                    onBlur={() => setEmailTouched(true)}
                    required
                    placeholder={cm.emailPlaceholder || 'Email'}
                    className={`w-full bg-black/30 border rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${emailInvalid ? 'border-red-400' : 'border-white/10'}`}
                  />
                  {emailInvalid && <p className='text-red-400 text-xs mt-1 pl-1'>{cm.emailError || 'Email inválido'}</p>}
                </div>

                <textarea
                  name='message' value={form.message} onChange={handleChange} required
                  rows={4} maxLength={500}
                  placeholder={cm.messagePlaceholder || 'Mensaje'}
                  className='w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                />

                <label className='flex items-start gap-2 cursor-pointer mt-1'>
                  <input type='checkbox' checked={agreed} onChange={e => setAgreed(e.target.checked)} className='mt-0.5 accent-purple-500 w-4 h-4 shrink-0' />
                  <span className='text-xs text-gray-400 leading-relaxed'>
                    {cm.policyText || 'Acepto la'}{' '}
                    <span className='text-purple-400 underline underline-offset-2 hover:text-purple-300'>{cm.policyLink || 'Política de privacidad'}</span>
                  </span>
                </label>

                {status === 'error' && <p className='text-red-400 text-xs text-center'>{cm.error}</p>}

                <button
                  type='submit'
                  disabled={!isValid || status === 'sending'}
                  className='mt-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2.5 rounded-xl shadow-md hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {status === 'sending' ? (cm.sending || 'Enviando...') : (cm.send || 'Enviar')}
                </button>
                <button type='button' onClick={handleClose} className='text-xs text-secondary-white hover:text-white underline underline-offset-2 tracking-tight'>
                  {cm.close || 'Cerrar'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
