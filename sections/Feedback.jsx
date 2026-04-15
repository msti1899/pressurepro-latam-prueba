'use client';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer, zoomIn } from '../utils/motion';
import { LanguageContext } from '../context/LanguageContext';
import { TitleText, TypingText } from '../components/CustomTexts';
import PhoneInput from 'react-phone-input-2';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const Feedback = () => {
  const { translations } = useContext(LanguageContext);
  const fb = translations?.feedback || {};
  const cm = fb.contactModal || {};

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', message: '' });
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const emailInvalid = emailTouched && form.email.length > 0 && !EMAIL_RE.test(form.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed || !phoneValid) return;
    if (!EMAIL_RE.test(form.email)) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setForm({ name: '', company: '', phone: '', email: '', message: '' });
    setPhoneValid(true);
    setEmailTouched(false);
    setAgreed(false);
    setStatus(null);
  };

  const isValid = agreed && phoneValid && form.name.trim() && EMAIL_RE.test(form.email) && form.message.trim();

  return (
    <section id='feedback' className='sm:px-16 xs:px-8 px-6 py-16 md:py-24 relative z-10'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
        className='2xl:max-w-[1280px] w-full mx-auto flex flex-col'
      >
        {/* TÃ­tulo de secciÃ³n â€” patrÃ³n estÃ¡ndar de la home */}
        <TypingText title={`| ${fb.sectionLabel || 'Contacto'}`} textStyles='text-center' />
        <TitleText title={fb.title} textStyles='text-center' as='h2' />

        {/* Columnas */}
        <div className='mt-10 flex lg:flex-row flex-col gap-6'>
          <motion.div
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className='flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4
            rounded-[32px] border-[1px] border-[#6a6a6a] relative'
          >
            <div className='feedback-gradient' />
            <p className='font-normal sm:text-[16px] text-[12px] sm:leading-[20px] leading-[16px] text-white/80'>
              {fb.subtitle}
            </p>
            <p className='mt-[24px] font-normal sm:text-[19px] text-[16px] sm:leading-[32px] leading-[28px] text-white/90'>
              {fb.text}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className='mt-6 self-start px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-md hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300 hover:-translate-y-0.5'
            >
              {fb.contactButton || 'Contacto'}
            </button>
          </motion.div>

          <motion.div
            variants={fadeIn('left', 'tween', 0.2, 1)}
            className='relative flex-1 flex justify-center items-center min-h-[300px] lg:min-h-[450px]'
          >
            <Image
              src='/planet-09.png'
              alt='Contacto PressurePro LATAM - Solicitar cotizaciÃ³n sistema TPMS para flotas comerciales y minerÃ­a'
              fill
              loading='lazy'
              quality={85}
              sizes='(max-width: 1024px) 100vw, 50vw'
              className='object-cover rounded-[40px]'
            />
            <motion.div
              variants={zoomIn(0.4, 1)}
              className='lg:block hidden absolute -left-[10%] top-[3%] w-[155px] h-[155px] z-10 hover:scale-110 hover:rotate-3 transition-transform duration-500 cursor-pointer drop-shadow-2xl'
            >
              <Image
                src='/stamp.png'
                alt='Sello certificaciÃ³n PressurePro TPMS - LÃ­der en sistemas de monitoreo'
                width={155}
                height={155}
                loading='lazy'
                quality={90}
                className='object-contain'
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal de contacto */}
      <AnimatePresence>
        {showModal && (
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
              className='bg-primary-black/95 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md flex flex-col pointer-events-auto backdrop-blur-md max-h-[90vh] overflow-y-auto'
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
                  <div className='mb-2'>
                    <h3 className='text-white font-bold text-xl leading-tight'>{cm.title}</h3>
                    <p className='text-gray-400 text-sm mt-1'>{cm.subtitle}</p>
                  </div>

                  {/* Nombre */}
                  <input
                    name='name' value={form.name} onChange={handleChange} required
                    placeholder={cm.namePlaceholder || 'Tu nombre'}
                    className='w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                  />

                  {/* Empresa */}
                  <input
                    name='company' value={form.company} onChange={handleChange}
                    placeholder={cm.companyPlaceholder || 'Empresa'}
                    className='w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                  />

                  {/* TelÃ©fono con selector de paÃ­s */}
                  <div>
                    <PhoneInput
                      country='uy'
                      value={form.phone}
                      onChange={(value, _data, _e, formattedValue) => {
                        setForm(prev => ({ ...prev, phone: formattedValue }));
                      }}
                      isValid={(value, country) => {
                        if (!value || value === country.dialCode) {
                          setPhoneValid(true);
                          return true;
                        }
                        const digits = value.replace(/\D/g, '');
                        const valid = digits.length >= 7;
                        setPhoneValid(valid);
                        return valid || cm.phoneError || 'NÃºmero invÃ¡lido';
                      }}
                      inputStyle={{
                        width: '100%',
                        background: 'rgba(0,0,0,0.3)',
                        border: `1px solid ${phoneValid ? 'rgba(255,255,255,0.1)' : 'rgb(248,113,113)'}`,
                        borderRadius: '0.75rem',
                        color: '#fff',
                        fontSize: '0.875rem',
                        height: '42px',
                        paddingLeft: '52px',
                      }}
                      buttonStyle={{
                        background: 'rgba(0,0,0,0.4)',
                        border: `1px solid ${phoneValid ? 'rgba(255,255,255,0.1)' : 'rgb(248,113,113)'}`,
                        borderRight: 'none',
                        borderRadius: '0.75rem 0 0 0.75rem',
                      }}
                      dropdownStyle={{
                        background: '#1a1a2e',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '0.75rem',
                      }}
                      searchStyle={{
                        background: 'rgba(0,0,0,0.5)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '0.5rem',
                        width: '90%',
                      }}
                      placeholder={cm.phonePlaceholder || 'TelÃ©fono'}
                      enableSearch
                      specialLabel=''
                    />
                    {!phoneValid && (
                      <p className='text-red-400 text-xs mt-1 pl-1'>{cm.phoneError || 'NÃºmero de telÃ©fono invÃ¡lido'}</p>
                    )}
                  </div>

                  {/* Email con validaciÃ³n */}
                  <div>
                    <input
                      name='email' type='email' value={form.email}
                      onChange={handleChange}
                      onBlur={() => setEmailTouched(true)}
                      required
                      placeholder={cm.emailPlaceholder || 'Email'}
                      className={`w-full bg-black/30 border rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${emailInvalid ? 'border-red-400' : 'border-white/10'}`}
                    />
                    {emailInvalid && (
                      <p className='text-red-400 text-xs mt-1 pl-1'>{cm.emailError || 'Email invÃ¡lido'}</p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <textarea
                    name='message' value={form.message} onChange={handleChange} required
                    rows={4} maxLength={500}
                    placeholder={cm.messagePlaceholder || 'Mensaje'}
                    className='w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                  />

                  {/* Checkbox polÃ­tica */}
                  <label className='flex items-start gap-2 cursor-pointer mt-1'>
                    <input
                      type='checkbox' checked={agreed} onChange={e => setAgreed(e.target.checked)}
                      className='mt-0.5 accent-purple-500 w-4 h-4 shrink-0'
                    />
                    <span className='text-xs text-gray-400 leading-relaxed'>
                      {cm.policyText || 'Acepto la'}{' '}
                      <span className='text-purple-400 underline underline-offset-2 hover:text-purple-300'>
                        {cm.policyLink || 'PolÃ­tica de privacidad'}
                      </span>
                    </span>
                  </label>

                  {status === 'error' && (
                    <p className='text-red-400 text-xs text-center'>{cm.error}</p>
                  )}

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
    </section>
  );
};

export default Feedback;
