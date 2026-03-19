import { useEffect } from 'react';
import { blogPosts, type BlogPost } from '../data/blogPosts';

export default function BlogPage(): JSX.Element {
  useEffect((): void => {
    document.title = 'Tech Blog | JunhKi';
  }, []);

  return (
    <div className="container pb-4">
      <div className="mb-4">
        <h2 className="mb-1">Tech Blog</h2>
        <p className="text-secondary mb-0">Sporadic notes on backend engineering, web development, and delivery practices.</p>
      </div>
      <div className="row g-3">
        {blogPosts.map((blogPost: BlogPost) => (
          <div key={blogPost.slug} className="col-lg-4 col-md-6">
            <article className="blog-card h-100 p-3 border rounded-3 bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-secondary">{new Date(blogPost.publishedAt).toLocaleDateString()}</small>
                <small className="text-secondary">{blogPost.readTime}</small>
              </div>
              <h5>{blogPost.title}</h5>
              <p className="text-secondary mb-3">{blogPost.excerpt}</p>
              <div className="d-flex flex-wrap gap-1 mb-3">
                {blogPost.tags.map((tag: string) => (
                  <span key={tag} className="badge rounded-pill text-bg-light border">
                    {tag}
                  </span>
                ))}
              </div>
              {blogPost.url ? (
                <a className="btn btn-outline-dark btn-sm" href={blogPost.url} target="_blank" rel="noreferrer">
                  Read post
                </a>
              ) : (
                <button className="btn btn-outline-dark btn-sm" disabled>
                  Coming soon
                </button>
              )}
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

