import { motion } from 'framer-motion';
import { fadeIn, textVariant, staggerContainer } from '../../utils/motion';

export default function BlogPost({ post, coverImage, date, categories }) {
  return (
    <motion.article
      className="relative w-full max-w-4xl mx-auto mb-16 font-eudoxus"
      variants={staggerContainer(0.15, 0.1)}
      initial="hidden"
      animate="show"
    >
      {/* Imagen principal animada */}
      <motion.div
        className="relative w-full h-[220px] md:h-[320px] overflow-hidden rounded-t-[32px]"
        variants={fadeIn('up', 'spring', 0, 0.7)}
      >
        <img src={coverImage} alt={post.title} className="object-cover w-full h-full transition-transform duration-700 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </motion.div>
      {/* Contenido animado */}
      <motion.div
        className="relative z-10 flex flex-col gap-4 p-6 md:p-10 bg-transparent"
        variants={staggerContainer(0.12, 0.2)}
      >
        <motion.div className="flex items-center text-sm text-white/70 mb-2 gap-2 flex-wrap" variants={fadeIn('up', 'spring', 0.1, 0.5)}>
          <span>{new Date(date).toLocaleDateString()}</span>
          {categories && categories.length > 0 && <span className="mx-2">·</span>}
          {categories && categories.map((cat, i) => (
            <span key={cat} className="mr-2 px-2 py-1 bg-purple-600/20 text-purple-200 rounded-full text-xs font-semibold">{cat}</span>
          ))}
        </motion.div>
        <motion.h1
          className="font-black text-3xl md:text-4xl text-white mb-2 drop-shadow-lg font-eudoxus"
          variants={textVariant(0.2)}
        >
          {post.title}
        </motion.h1>
        <motion.div
          className="prose prose-invert max-w-none text-white/90 prose-headings:text-white prose-a:text-purple-400 prose-a:underline-offset-2 prose-strong:text-white prose-blockquote:border-purple-400 font-eudoxus"
          variants={fadeIn('up', 'spring', 0.25, 0.7)}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></motion.div>
      </motion.div>
    </motion.article>
  );
}
