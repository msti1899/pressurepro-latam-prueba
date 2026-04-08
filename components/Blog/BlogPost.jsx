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
              <span key={cat} className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
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
          className="
            prose prose-invert max-w-none font-eudoxus text-white
            prose-p:text-white/80 prose-p:leading-relaxed prose-p:text-[16px] md:prose-p:text-[17px]
            prose-headings:text-white prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-4
            prose-h2:text-[22px] md:prose-h2:text-[28px] prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
            prose-h3:text-[18px] md:prose-h3:text-[22px] prose-h3:text-purple-300
            prose-ul:text-white/80 prose-ul:mt-2 prose-li:my-1
            prose-strong:text-white
            prose-a:text-purple-400 prose-a:underline-offset-2 prose-a:hover:text-purple-300
            [&_.lead]:text-white/70 [&_.lead]:text-[18px] [&_.lead]:leading-relaxed [&_.lead]:mb-6 [&_.lead]:block [&_.lead]:border-l-4 [&_.lead]:border-purple-500 [&_.lead]:pl-4
            [&_.data-box]:grid [&_.data-box]:sm:grid-cols-2 [&_.data-box]:gap-4 [&_.data-box]:my-8
            [&_.data-item]:bg-white/5 [&_.data-item]:border [&_.data-item]:border-white/10 [&_.data-item]:rounded-2xl [&_.data-item]:p-5 [&_.data-item]:flex [&_.data-item]:flex-col [&_.data-item]:gap-1
            [&_.data-item.highlight]:border-purple-500/40 [&_.data-item.highlight]:bg-purple-900/20
            [&_.data-label]:text-white/50 [&_.data-label]:text-sm [&_.data-label]:font-medium
            [&_.data-value]:text-white [&_.data-value]:text-[28px] [&_.data-value]:font-black
            [&_.data-delta]:text-green-400 [&_.data-delta]:font-semibold [&_.data-delta]:text-sm
            [&_.data-item.highlight_.data-delta]:text-red-400
            [&_.calc-box]:bg-white/5 [&_.calc-box]:border [&_.calc-box]:border-white/10 [&_.calc-box]:rounded-2xl [&_.calc-box]:p-6 [&_.calc-box]:my-8
            [&_.calc-box_ul]:list-none [&_.calc-box_ul]:p-0 [&_.calc-box_ul]:space-y-2
            [&_.calc-box_li]:text-white/80 [&_.calc-box_li]:py-1 [&_.calc-box_li]:border-b [&_.calc-box_li]:border-white/5
            [&_.calc-box_p]:text-white/50 [&_.calc-box_p]:text-sm [&_.calc-box_p]:mt-4 [&_.calc-box_p]:italic
          "
          variants={fadeIn('up', 'spring', 0.25, 0.7)}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></motion.div>
      </motion.div>
    </motion.article>
  );
}
