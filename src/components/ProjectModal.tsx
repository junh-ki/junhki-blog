import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import type { Project } from '../data/Project';

type ProjectModalProps = {
  project: Project | null;
  show: boolean;
  onHide: () => void;
};

export default function ProjectModal({ project, show, onHide }: ProjectModalProps): JSX.Element | null {
  if (project === null) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <h2 style={{ margin: 0 }}>{project.name}</h2>
      </Modal.Header>
      <Modal.Body>
        {project.pictures.length > 0 ? (
          <Carousel interval={null}>
            {project.pictures.map((picture: string, index: number) => (
              <Carousel.Item key={`${picture}-${index}`}>
                <img src={picture} alt="slide" style={{ display: 'block', width: '100%' }} />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className="p-4 border rounded-3 bg-light text-center text-secondary">
            Visual assets are intentionally omitted for this placeholder case study.
          </div>
        )}
        <h3 className="mt-2">Description</h3>
        <p>{project.description}</p>
        <p>
          You can find this project on GitHub{' '}
          <a href={project.projectLink} target="_blank" rel="noreferrer">
            here
          </a>
        </p>
        <hr />
        <div className="d-flex flex-wrap">
          {project.tags.map((tag) => (
            <div key={tag.key} className="tag me-2 mb-1" style={{ backgroundColor: tag.color }}>
              {tag.key}
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

