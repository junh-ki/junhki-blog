import { JSX, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { labPosts, type LabPost, type LabSection } from '../data/labPosts';
import TagList from '../components/TagList';

function SectionBody({ body }: { body: string }): JSX.Element {
  const paragraphs = body.split('\n\n');
  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i} className="text-secondary mb-2">
          {para}
        </p>
      ))}
    </>
  );
}

export default function LabPostPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const post: LabPost | undefined = labPosts.find((p) => p.slug === slug);

  useEffect((): void => {
    if (post) {
      document.title = `${post.title} | JunhKi`;
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/lab" replace />;
  }

  return (
    <div className="container pb-4">
      <div className="mb-3">
        <Link to="/lab" className="btn btn-sm btn-outline-secondary">
          ← Lab &amp; Notes
        </Link>
      </div>

      <div className="shadow-sm border rounded-3 p-4 p-md-5 bg-white mb-4">
        <div className="mb-3">
          <small className="text-secondary">
            {new Date(post.publishedAt).toLocaleDateString()} · {post.readTime}
          </small>
        </div>
        <h2 className="mb-3">{post.title}</h2>
        <TagList tags={post.tags} />

        <hr className="my-4" />

        <p className="lead text-secondary mb-4">{post.content.intro}</p>

        {post.content.sections.map((section: LabSection) => (
          <div key={section.heading} className="mb-4">
            <h5 className="mb-2">{section.heading}</h5>
            <SectionBody body={section.body} />
          </div>
        ))}

        <hr className="my-4" />

        <div className="d-flex flex-wrap gap-2">
          <a
            href={post.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark btn-sm"
          >
            View on GitHub
          </a>
          {post.docUrl && (
            <a
              href={post.docUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-dark btn-sm"
            >
              Documentation
            </a>
          )}
          {post.pubUrl && (
            <a
              href={post.pubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-dark btn-sm"
            >
              Publication
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
