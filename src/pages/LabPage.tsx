import { JSX, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { labPosts, type LabPost } from '../data/labPosts';
import TagList from '../components/TagList';

export default function LabPage(): JSX.Element {
  useEffect((): void => {
    document.title = 'Lab & Notes | JunhKi';
  }, []);

  return (
    <div className="container pb-4">
      <div className="mb-4">
        <h2 className="mb-1">Lab &amp; Notes</h2>
        <p className="text-secondary mb-0">Project builds, engineering experiments, and notes from hands-on work.</p>
      </div>
      <div className="row g-3">
        {labPosts.map((post: LabPost) => (
          <div key={post.slug} className="col-lg-4 col-md-6">
            <article className="blog-card h-100 border rounded-3 bg-white shadow-sm d-flex flex-column overflow-hidden">
              <Link to={`/lab/${post.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                {post.cardImageUrl ? (
                  <div style={{ height: '160px', overflow: 'hidden', background: '#f8f9fa' }}>
                    <img
                      src={post.cardImageUrl}
                      alt={post.cardImageAlt ?? post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div>
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: '160px', background: 'linear-gradient(135deg, #212529 0%, #343a40 100%)' }}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '2.5rem', fontFamily: 'monospace' }}>
                      {'</>'}
                    </span>
                  </div>
                )}
              </Link>
              <div className="p-3 d-flex flex-column flex-grow-1">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-secondary">{post.publishedAt}</small>
                <small className="text-secondary">{post.readTime}</small>
              </div>
              <h5 className="mb-2">
                <Link to={`/lab/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {post.title}
                </Link>
              </h5>
              <p className="text-secondary mb-3 flex-grow-1">{post.excerpt}</p>
              <TagList tags={post.tags} />
              <div className="mt-3 d-flex gap-2">
                <Link to={`/lab/${post.slug}`} className="btn btn-outline-dark btn-sm">
                  Read post
                </Link>
                <a
                  href={post.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-secondary btn-sm"
                >
                  GitHub
                </a>
              </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
