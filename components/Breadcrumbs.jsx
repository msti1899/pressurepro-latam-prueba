import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

/**
 * Componente de breadcrumbs para navegación y SEO
 * @param {Array} items - Array de objetos con {label, href}
 * @example
 * <Breadcrumbs items={[
 *   {label: 'Inicio', href: '/'},
 *   {label: 'Industrias', href: '/#mercados'},
 *   {label: 'Minería', href: null} // último sin href
 * ]} />
 */
const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <motion.nav 
      variants={fadeIn('down', 'tween', 0.1, 0.5)}
      initial="hidden"
      animate="show"
      aria-label="Breadcrumb" 
      className="py-4 px-6 sm:px-16 bg-primary-black/50 backdrop-blur-sm"
    >
      <ol className="flex items-center flex-wrap gap-2 text-sm max-w-[1280px] mx-auto">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-secondary-white/60">›</span>
              )}
              
              {!isLast && item.href ? (
                <Link 
                  href={item.href}
                  className="text-secondary-white hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-semibold">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumbs;
