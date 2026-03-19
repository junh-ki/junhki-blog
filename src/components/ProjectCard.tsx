import type { Project } from '../data/Project';

type ProjectCardProps = {
  project: Project;
  onViewMore: () => void;
};

export default function ProjectCard({ project, onViewMore }: ProjectCardProps): JSX.Element {
  return (
    <div className="card shadow text-center" style={{ maxWidth: 350, minWidth: 350 }}>
      <div className="card-body">
        <h5 className="card-title">{project.name}</h5>
        <p className="card-text">{project.summary}</p>
        <button className="btn btn-primary" onClick={onViewMore}>
          View More
        </button>
      </div>

      <div className="card-footer">
        <div className="d-flex flex-wrap justify-content-center">
          {project.tags.map((tag) => (
            <div key={tag.key} className="tag me-2 mb-1" style={{ backgroundColor: tag.color }}>
              {tag.key}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

