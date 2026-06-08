import { JSX, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { labPosts, type LabPost, type LabSection, type LabTable } from '../data/labPosts';
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

function SectionTable({ table }: { table: LabTable }): JSX.Element {
  return (
    <div className="table-responsive mt-3 mb-2">
      <table className="table table-bordered table-sm small">
        <thead className="table-light">
          <tr>
            {table.headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
            {post.publishedAt} · {post.readTime}
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
            {section.table && <SectionTable table={section.table} />}
            {section.imageUrl && (
              <div className="mt-3">
                <img
                  src={section.imageUrl}
                  alt={section.imageAlt ?? section.heading}
                  className="img-fluid rounded-3 border shadow-sm"
                  style={{ maxWidth: '100%' }}
                />
              </div>
            )}
          </div>
        ))}

        <hr className="my-4" />

        <div className="d-flex flex-wrap gap-2">
          {post.githubUrl && (
            <a
              href={post.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark btn-sm"
            >
              View on GitHub
            </a>
          )}
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
