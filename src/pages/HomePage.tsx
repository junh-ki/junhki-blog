import { useEffect, useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getProjectById } from '../data/projectService';
import type { Project } from '../data/Project';

export default function HomePage(): JSX.Element {
  useEffect((): void => {
    document.title = 'Home | JunhKi';
  }, []);

  const featuredProject: Project = useMemo((): Project => getProjectById(0), []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg shadow border m-1">
          <div className="text-center">
            <h2>About Me</h2>
            <img src="assets/jun.png" alt="profile" width={256} height={256} className="rounded-circle" />
            <p>
              I'm a software developer from Seoul, South Korea, currently based in Hannover, Germany. With a background in Embedded Systems and five years of experience, I specialize in Java Spring Boot and am expanding my skills in GoLang and Angular. Outside of work, I enjoy traveling, fitness, and personal growth, including learning German and exploring creative writing.
            </p>
          </div>
        </div>
        <div className="col-lg shadow border m-1">
          <div className="text-center">
            <h2>Featured Project</h2>
            <h4>{featuredProject.name}</h4>
          </div>
          <Carousel interval={null}>
            {featuredProject.pictures.map((picture: string, index: number) => (
              <Carousel.Item key={`${picture}-${index}`}>
                <img src={picture} alt="slide" style={{ display: 'block', width: '100%' }} />
              </Carousel.Item>
            ))}
          </Carousel>
          <p className="mt-2">{featuredProject.summary}</p>
          <p>Visit the Portfolio section to learn more!</p>
        </div>
      </div>
    </div>
  );
}

