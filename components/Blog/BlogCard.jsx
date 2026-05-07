import Link from 'next/link';

export default function BlogCard({ post, language, readMoreLabel }) {
  const content = post[language] || post['es'];
  return (
    <div className="group relative flex flex-col rounded-[24px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#0d1a24] via-[#0f1e2a] to-[#121f30] hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(0,119,185,0.15)] transition-all duration-500 font-eudoxus shadow-xl">
      {/* Imagen separada del texto */}
      <div className="relative overflow-hidden h-[200px] flex-shrink-0">
        <img
          src={post.coverImage}
          alt={content.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        {/* Categorías sobre la imagen */}
        {post.categories && post.categories.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
            {post.categories.map(cat => (
              <span key={cat} className="px-2 py-1 bg-brand-red-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Contenido de texto */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <p className="text-white/40 text-xs">
          {new Date(post.date).toLocaleDateString()}
        </p>
        <h3 className="font-bold text-[18px] md:text-[20px] text-white leading-snug">
          {content.title}
        </h3>
        <p className="text-white/60 text-[14px] leading-relaxed line-clamp-3 flex-1">
          {content.excerpt}
        </p>
        <div className="mt-2 inline-flex items-center gap-2 text-purple-400 group-hover:text-purple-300 font-semibold text-[14px] transition-colors pointer-events-none">
          <span>{readMoreLabel || 'Leer más'}</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={content.title} />
      </div>
    </div>
  );
}
