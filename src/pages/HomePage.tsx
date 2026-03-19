import { useEffect, useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { getProjectById } from '../data/projectService';
import type { Project } from '../data/Project';

export default function HomePage(): JSX.Element {
  useEffect((): void => {
    document.title = 'Home | JunhKi';
  }, []);

  const featuredProject: Project = useMemo((): Project => getProjectById(0), []);

  return (
    <div className="container pb-4">
      <div className="hero-card shadow-sm border mb-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-8 p-4 p-lg-5">
            <h2 className="display-6 fw-semibold mb-3">Building reliable backend systems and modern web experiences</h2>
            <p className="lead text-secondary mb-4">
              I am a software engineer with 5+ years of experience across insurance, travel, automotive, and startup domains. I focus on scalable Java backend systems, cloud-native architecture, and pragmatic frontend delivery with React and TypeScript.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <Link to="/portfolio" className="btn btn-dark">
                View Projects
              </Link>
              <Link to="/contact" className="btn btn-outline-dark">
                Contact Me
              </Link>
            </div>
          </div>
          <div className="col-lg-4 text-center p-4">
            <img src="assets/jun.png" alt="profile" width={220} height={220} className="rounded-circle border" />
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="p-3 border rounded-3 h-100 bg-white shadow-sm">
            <h5 className="mb-2">Backend Engineering</h5>
            <p className="mb-0 text-secondary">Java, Spring Boot, APIs, service design, and production-focused backend development.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 border rounded-3 h-100 bg-white shadow-sm">
            <h5 className="mb-2">Cloud and DevOps</h5>
            <p className="mb-0 text-secondary">Docker, Kubernetes, CI/CD, and cloud-native workflows for scalable systems.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 border rounded-3 h-100 bg-white shadow-sm">
            <h5 className="mb-2">Frontend Delivery</h5>
            <p className="mb-0 text-secondary">React + TypeScript interfaces that are maintainable, fast, and user-friendly.</p>
          </div>
        </div>
      </div>

      <div className="shadow-sm border rounded-3 p-3 p-md-4 bg-white">
        <div className="text-center mb-3">
          <h3 className="mb-1">Featured Project</h3>
          <p className="text-secondary mb-0">{featuredProject.name}</p>
        </div>
        <div className="mx-auto featured-carousel">
          {featuredProject.pictures.length > 0 ? (
            <Carousel interval={null}>
              {featuredProject.pictures.map((picture: string, index: number) => (
                <Carousel.Item key={`${picture}-${index}`}>
                  <img src={picture} alt="slide" style={{ display: 'block', width: '100%' }} />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className="p-4 border rounded-3 bg-light text-center text-secondary">
              Case-study visuals will be added later.
            </div>
          )}
        </div>
        <p className="mt-3 mb-1 text-center">{featuredProject.summary}</p>
        <p className="text-center mb-0">
          Explore the complete portfolio for details on architecture, technologies, and implementation.
        </p>
      </div>

      <div className="mt-4 shadow-sm border rounded-3 p-3 p-md-4 bg-white">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div>
            <h3 className="mb-1">Sporadic Tech Blog Posts</h3>
            <p className="text-secondary mb-0">Notes from real projects, migration work, and engineering learnings.</p>
          </div>
          <Link to="/blog" className="btn btn-outline-dark btn-sm">
            View all posts
          </Link>
        </div>
        <div className="row g-3">
          {blogPosts.slice(0, 2).map((blogPost) => (
            <div key={blogPost.slug} className="col-md-6">
              <article className="blog-card p-3 border rounded-3 h-100">
                <small className="text-secondary d-block mb-2">
                  {new Date(blogPost.publishedAt).toLocaleDateString()} - {blogPost.readTime}
                </small>
                <h5>{blogPost.title}</h5>
                <p className="text-secondary mb-0">{blogPost.excerpt}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

