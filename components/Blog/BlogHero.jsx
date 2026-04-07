export default function BlogHero({ title, subtitle }) {
  return (
    <section className="relative w-full py-16 mb-10 text-white text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-primary-black/90 to-[#18162c] pointer-events-none" />
      <div className="absolute inset-0 tech-bg opacity-60 pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <h1 className="font-black text-4xl md:text-5xl mb-4 drop-shadow-lg tracking-tight font-eudoxus">{title}</h1>
        <p className="text-lg md:text-2xl opacity-90 font-light mb-2 font-eudoxus">{subtitle}</p>
      </div>
    </section>
  );
}
