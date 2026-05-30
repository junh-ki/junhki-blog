import { JSX, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { labPosts, type LabPost } from '../data/labPosts';
import TagList from '../components/TagList';
import junImg from '../assets/jun.png';

export default function HomePage(): JSX.Element {
  useEffect((): void => {
    document.title = 'Home | JunhKi';
  }, []);

  return (
    <div className="container pb-4">
      <div className="hero-card shadow-sm border mb-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-8 p-4 p-lg-5">
            <h2 className="display-6 fw-semibold mb-3">Building reliable backend systems and modern web experiences</h2>
            <p className="lead text-secondary mb-4">
              I am a software engineer with 6+ years of experience across insurance, travel, automotive, and startup domains. My primary focus is scalable Java backend systems (Quarkus and Spring Boot) with multi-tenant cloud-native architecture and React/TypeScript frontend delivery. Lately I have also been building with Python and FastAPI, drawn to its ergonomics for async API design and the richness of its ecosystem.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <Link to="/portfolio" className="btn btn-dark">
                View Portfolio
              </Link>
              <Link to="/contact" className="btn btn-outline-dark">
                Contact Me
              </Link>
            </div>
          </div>
          <div className="col-lg-4 text-center p-4">
            <img src={junImg} alt="profile" width={220} height={220} className="rounded-circle border" />
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="p-3 border rounded-3 h-100 bg-white shadow-sm">
            <h5 className="mb-2">Backend Engineering</h5>
            <p className="mb-0 text-secondary">Java and Python backend systems (Spring Boot, Quarkus, FastAPI), REST API design, and production-focused backend development with jOOQ and PostgreSQL.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 border rounded-3 h-100 bg-white shadow-sm">
            <h5 className="mb-2">Cloud and DevOps</h5>
            <p className="mb-0 text-secondary">Docker, Kubernetes, AWS CDK, CI/CD, and cloud-native workflows for scalable systems.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 border rounded-3 h-100 bg-white shadow-sm">
            <h5 className="mb-2">Frontend Delivery</h5>
            <p className="mb-0 text-secondary">React + TypeScript interfaces, with Playwright and Cypress for reliable UI and integration testing.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 shadow-sm border rounded-3 p-3 p-md-4 bg-white">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div>
            <h3 className="mb-1">Lab &amp; Notes</h3>
            <p className="text-secondary mb-0">Project builds, engineering experiments, and notes from hands-on work.</p>
          </div>
          <Link to="/lab" className="btn btn-outline-dark btn-sm">
            View all posts
          </Link>
        </div>
        <div className="row g-3">
          {labPosts.slice(0, 2).map((post: LabPost) => (
            <div key={post.slug} className="col-md-6">
              <article className="blog-card p-3 border rounded-3 h-100 d-flex flex-column">
                <small className="text-secondary d-block mb-2">
                  {new Date(post.publishedAt).toLocaleDateString()} · {post.readTime}
                </small>
                <h5 className="mb-2">{post.title}</h5>
                <p className="text-secondary mb-3 flex-grow-1">{post.excerpt}</p>
                <TagList tags={post.tags} />
                <div className="mt-3">
                  <Link to={`/lab/${post.slug}`} className="btn btn-outline-dark btn-sm">
                    Read post
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
