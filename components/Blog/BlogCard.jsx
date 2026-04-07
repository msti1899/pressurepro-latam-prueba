import Link from 'next/link';

export default function BlogCard({ post, language }) {
  const content = post[language] || post['es'];
  return (
    <div className="relative overflow-hidden rounded-[24px] h-[340px] group shadow-xl border border-white/10 bg-gradient-to-br from-primary-black via-[#18162c] to-[#232046] flex flex-col font-eudoxus">
      {/* Imagen de fondo con efecto zoom en hover */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={post.coverImage}
          alt={content.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/10 group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500 pointer-events-none" />
      </div>
      {/* Contenido */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6">
        <h3 className="font-bold text-[20px] md:text-[24px] text-white leading-tight mb-2 drop-shadow-lg font-eudoxus">
          {content.title}
        </h3>
        <p className="text-white/80 mb-4 text-[15px] line-clamp-3 flex-1 drop-shadow font-eudoxus">
          {content.excerpt}
        </p>
        <Link href={`/blog/${post.slug}`} legacyBehavior>
          <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-purple-600/80 backdrop-blur-sm border border-white/20 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] text-white font-semibold text-[14px] transition-all duration-300 min-h-[44px] pointer-events-auto transform hover:-translate-y-1 font-eudoxus">
            <span>Leer más</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </Link>
      </div>
      {/* Borde brillante en hover */}
      <div className="absolute inset-0 rounded-[24px] ring-2 ring-purple-500/0 group-hover:ring-purple-500/50 transition-all duration-300 pointer-events-none" />
    </div>
  );
}
