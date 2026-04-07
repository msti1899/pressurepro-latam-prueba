import BlogCard from './BlogCard';

export default function BlogList({ posts, language }) {
  return (
    <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 font-eudoxus">
      {posts.map(post => (
        <BlogCard key={post.slug} post={post} language={language} />
      ))}
    </div>
  );
}
