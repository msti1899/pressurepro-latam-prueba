import { motion } from 'framer-motion';
import { fadeIn, textVariant, staggerContainer } from '../../utils/motion';

export default function BlogPost({ post, coverImage, date, categories }) {
  return (
    <motion.article
      className="relative w-full font-eudoxus"
      variants={staggerContainer(0.15, 0.1)}
      initial="hidden"
      animate="show"
    >
      {/* Hero imagen full-width — sin trucos de posición, el article ya ocupa 100% */}
      <motion.div
        className="relative w-full h-[320px] md:h-[500px] lg:h-[600px] overflow-hidden"
        variants={fadeIn('up', 'spring', 0, 0.8)}
      >
        <img
          src={coverImage}
          alt={post.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1a] via-black/40 to-transparent" />
        {/* Categorías sobre la imagen */}
        {categories && categories.length > 0 && (
          <motion.div
            className="absolute bottom-6 left-0 w-full px-6 sm:px-16 flex gap-2 flex-wrap"
            variants={fadeIn('up', 'spring', 0.2, 0.6)}
          >
            {categories.map(cat => (
              <span key={cat} className="px-3 py-1 bg-brand-red-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                {cat}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Contenido del artículo */}
      <motion.div
        className="relative z-10 px-6 sm:px-16 2xl:max-w-[1280px] mx-auto pt-10 pb-20"
        variants={staggerContainer(0.12, 0.2)}
      >
        <motion.p
          className="text-white/40 text-sm mb-4"
          variants={fadeIn('up', 'spring', 0.1, 0.5)}
        >
          {new Date(date).toLocaleDateString()}
        </motion.p>

        <motion.h1
          className="font-black text-3xl md:text-[42px] lg:text-[52px] text-white leading-tight mb-8 max-w-[900px]"
          variants={textVariant(0.2)}
        >
          {post.title}
        </motion.h1>

        <motion.div
          className="blog-prose"
          variants={fadeIn('up', 'spring', 0.25, 0.7)}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></motion.div>
      </motion.div>
    </motion.article>
  );
}
