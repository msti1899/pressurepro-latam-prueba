import { BLOG_POSTS } from '../../config/localization/pages/blogPosts';
import { BLOG_CONTENT } from '../../config/localization/pages/blogContent';
import BlogPost from '../../components/Blog/BlogPost';
import BlogHero from '../../components/Blog/BlogHero';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CountryBanner from '../../components/CountryBanner';
import WhatsAppButton from '../../components/WhatsAppButton';

export default function BlogDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { language } = useContext(LanguageContext);
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return <div className="text-white text-center py-20">Not found</div>;
  const postContent = post[language] || post['es'];
  return (
    <div className="bg-primary-black tech-bg min-h-screen overflow-x-hidden">
      <CountryBanner />
      <Navbar />
      <main className="relative min-h-[60vh] pb-12">
        <BlogHero title={BLOG_CONTENT[language]?.heroTitle || BLOG_CONTENT['es'].heroTitle} subtitle={BLOG_CONTENT[language]?.heroSubtitle || BLOG_CONTENT['es'].heroSubtitle} />
        <section className="relative max-w-3xl mx-auto px-4 py-8">
          <div className="gradient-03 z-0 absolute left-0 top-0" />
          <BlogPost post={postContent} coverImage={post.coverImage} date={post.date} categories={post.categories} />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
