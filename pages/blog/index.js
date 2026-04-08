import { BLOG_CONTENT } from '../../config/localization/pages/blogContent';
import { BLOG_POSTS } from '../../config/localization/pages/blogPosts';
import BlogList from '../../components/Blog/BlogList';
import BlogHero from '../../components/Blog/BlogHero';
import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CountryBanner from '../../components/CountryBanner';
import WhatsAppButton from '../../components/WhatsAppButton';

export default function BlogPage() {
  const { language } = useContext(LanguageContext);
  const content = BLOG_CONTENT[language] || BLOG_CONTENT['es'];
  return (
    <div className="bg-primary-black tech-bg min-h-screen overflow-x-hidden">
      <CountryBanner />
      <Navbar />
      <main className="relative min-h-[60vh] pb-12">
        <BlogHero title={content.heroTitle} subtitle={content.heroSubtitle} />
        <section className="relative max-w-6xl mx-auto px-4 py-8">
          <div className="gradient-03 z-0 absolute left-0 top-0" />
          <h2 className="text-2xl font-bold mb-6 text-white drop-shadow">{content.latestPosts}</h2>
          <BlogList posts={BLOG_POSTS} language={language} readMoreLabel={content.readMore} />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
