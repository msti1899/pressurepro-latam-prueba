import BlogCard from './BlogCard';

export default function BlogList({ posts, language, readMoreLabel }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 font-eudoxus">
      {posts.map(post => (
        <BlogCard key={post.slug} post={post} language={language} readMoreLabel={readMoreLabel} />
      ))}
    </div>
  );
}
