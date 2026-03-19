import { useEffect, useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import type { Project } from '../data/Project';
import { Tag, type TagModel } from '../data/Tag';
import { getProjects, getProjectsByFilter } from '../data/projectService';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

export default function PortfolioPage(): JSX.Element {
  const allProjects: Project[] = useMemo((): Project[] => getProjects(), []);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect((): void => {
    document.title = 'Portfolio | JunhKi';
  }, []);

  const projects: Project[] = useMemo((): Project[] => {
    if (selectedTags.length === 0) {
      return allProjects;
    }
    return getProjectsByFilter(selectedTags);
  }, [allProjects, selectedTags]);

  const toggleTag = (tag: TagModel): void => {
    setSelectedTags((previousSelectedTags: TagModel[]): TagModel[] => {
      if (previousSelectedTags.includes(tag)) {
        return previousSelectedTags.filter((previousTag: TagModel): boolean => previousTag !== tag);
      }
      return [...previousSelectedTags, tag];
    });
  };

  const resetFilters = (): void => {
    setSelectedTags([]);
  };

  return (
    <div className="container">
      <div className="mb-2">
        <div>
          <Button variant="outline-primary" className="mb-2 me-2" onClick={() => setIsCollapsed((previous: boolean): boolean => !previous)}>
            Filter
          </Button>
          {!isCollapsed && (
            <Button variant="outline-secondary" className="mb-2" onClick={resetFilters}>
              Reset
            </Button>
          )}
        </div>
        <Collapse in={!isCollapsed}>
          <div className="border mb-2 shadow-sm" style={{ width: 250 }}>
            <form>
              <div className="row mx-0">
                <div className="col">
                  <small>
                    <b>Languages:</b>
                  </small>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.JAVASCRIPT)}
                        onChange={() => toggleTag(Tag.JAVASCRIPT)}
                        name="JavaScript"
                      />
                      <label className="form-check-label small">JavaScript</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.TYPESCRIPT)}
                        onChange={() => toggleTag(Tag.TYPESCRIPT)}
                        name="TypeScript"
                      />
                      <label className="form-check-label small">TypeScript</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.JAVA)}
                        onChange={() => toggleTag(Tag.JAVA)}
                        name="Java"
                      />
                      <label className="form-check-label small">Java</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.GO)}
                        onChange={() => toggleTag(Tag.GO)}
                        name="Go"
                      />
                      <label className="form-check-label small">Go</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.PYTHON)}
                        onChange={() => toggleTag(Tag.PYTHON)}
                        name="Python"
                      />
                      <label className="form-check-label small">Python</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.NODEJS)}
                        onChange={() => toggleTag(Tag.NODEJS)}
                        name="NodeJS"
                      />
                      <label className="form-check-label small">NodeJS</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.CSHARP)}
                        onChange={() => toggleTag(Tag.CSHARP)}
                        name="C#"
                      />
                      <label className="form-check-label small">C#</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.ASPNET)}
                        onChange={() => toggleTag(Tag.ASPNET)}
                        name="ASP.NET"
                      />
                      <label className="form-check-label small">ASP.NET</label>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <small>
                    <b>Frameworks:</b>
                  </small>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.ANGULAR)}
                        onChange={() => toggleTag(Tag.ANGULAR)}
                        name="Angular"
                      />
                      <label className="form-check-label small">Angular</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.REACT)}
                        onChange={() => toggleTag(Tag.REACT)}
                        name="React"
                      />
                      <label className="form-check-label small">React</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.VUE)}
                        onChange={() => toggleTag(Tag.VUE)}
                        name="Vue"
                      />
                      <label className="form-check-label small">Vue</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.SPRING)}
                        onChange={() => toggleTag(Tag.SPRING)}
                        name="Spring"
                      />
                      <label className="form-check-label small">Spring</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-static me-2"
                        checked={selectedTags.includes(Tag.DJANGO)}
                        onChange={() => toggleTag(Tag.DJANGO)}
                        name="Django"
                      />
                      <label className="form-check-label small">Django</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Collapse>
      </div>
      <div className="row">
        {projects.map((project: Project) => (
          <div
            key={project.id}
            className="col-lg-4 col-md-6 mb-4"
            style={{ maxWidth: 380, minWidth: 380 }}
          >
            <ProjectCard project={project} onViewMore={() => setSelectedProject(project)} />
          </div>
        ))}
      </div>
      <ProjectModal project={selectedProject} show={selectedProject !== null} onHide={() => setSelectedProject(null)} />
    </div>
  );
}


