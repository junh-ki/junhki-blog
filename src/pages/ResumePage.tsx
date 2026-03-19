import { useEffect, useMemo, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import type { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';

function downloadFile(srcFilePath: string, targetFileName: string): void {
  const link: HTMLAnchorElement = document.createElement('a');
  link.target = '_blank';
  link.href = srcFilePath;
  link.download = targetFileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function ResumePage(): JSX.Element {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect((): void => {
    document.title = 'Resume | JunhKi';
  }, []);

  const handleSelect = (eventKey: AccordionEventKey | null): void => {
    if (eventKey === null) {
      return;
    }
    const eventKeyString: string = String(eventKey);
    setActiveKeys((previousActiveKeys: string[]): string[] => {
      if (previousActiveKeys.includes(eventKeyString)) {
        return previousActiveKeys.filter((previousKey: string): boolean => previousKey !== eventKeyString);
      }
      return [...previousActiveKeys, eventKeyString];
    });
  };

  const isWorkExperienceOpen: boolean = useMemo((): boolean => activeKeys.includes('work'), [activeKeys]);
  const isEducationOpen: boolean = useMemo((): boolean => activeKeys.includes('education'), [activeKeys]);
  const isCertificationsOpen: boolean = useMemo((): boolean => activeKeys.includes('certifications'), [activeKeys]);
  const isSkillsOpen: boolean = useMemo((): boolean => activeKeys.includes('skills'), [activeKeys]);

  return (
    <div className="container text-center">
      <button
        className="btn btn-primary mb-5 shadow border"
        onClick={() => downloadFile('assets/pdf/resume.pdf', 'resume.pdf')}
      >
        Download PDF Resume
      </button>
      <div className="pb-2">
        <Accordion alwaysOpen activeKey={activeKeys} onSelect={handleSelect} className="shadow resume-accordion">
          <Accordion.Item eventKey="work">
            <Accordion.Header>
              <div style={{ visibility: 'hidden' }}>&gt;</div>
              <div className="btn-link">Work Experience</div>
              <div style={{ width: 10.95 }}>
                {!isWorkExperienceOpen ? <div style={{ color: 'white' }}>&gt;</div> : <div style={{ color: 'white' }}>v</div>}
              </div>
            </Accordion.Header>
            <Accordion.Body style={{ textAlign: 'left' }}>
              <h2 className="mb-0">Full Stack Developer</h2>
              <h3 className="text-primary">HDI AG</h3>
              <ul>
                <li>Development of cloud-based and service-oriented solutions for international use in the industrial insurance business</li>
                <li>
                  <a href="https://www.hdi.de" target="_blank" rel="noreferrer">
                    hdi.de
                  </a>
                </li>
              </ul>
              <hr />
              <div style={{ textAlign: 'left' }}>
                <h2 className="mb-0">Backend Developer</h2>
                <h3 className="text-primary">Holidu GmbH</h3>
                <ul>
                  <li>
                    Development of:
                    <ul>
                      <li>Search Engine Optimization (SEO) Content Management System (CMS) Tools</li>
                      <li>Backend APIs and Processes for Client Services</li>
                      <li>M&amp;A Data Import API</li>
                      <li>GeoTools</li>
                    </ul>
                  </li>
                  <li>
                    <a href="https://www.holidu.com" target="_blank" rel="noreferrer">
                      holidu.com
                    </a>
                  </li>
                </ul>
              </div>
              <hr />
              <div style={{ textAlign: 'left' }}>
                <h2 className="mb-0">Master's' Thesis Intern</h2>
                <h3 className="text-primary">Robert Bosch GmbH</h3>
                <ul>
                  <li>
                    Development of:
                    <ul>
                      <li>Connected container ecosystem for the anti-tampering vehicle emission diagnostic system</li>
                      <li>Raspberry Pi-based in-vehicle CAN data acquisition and MQTT message transmitter for Bosch IoT-Hub</li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="https://dias-kuksa-doc.readthedocs.io/en/latest/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Documentation Page
                    </a>
                  </li>
                </ul>
              </div>
              <hr />
              <div style={{ textAlign: 'left' }}>
                <h2 className="mb-0">Research Assistant</h2>
                <h3 className="text-primary">Fachhochschule Dortmund</h3>
                <ul>
                  <li>
                    Development of:
                    <ul>
                      <li>E2E Response Time Analyzer for Modern Automotive Heterogenous Systems</li>
                      <li>ECU Task Chain Latency Analyzer based on NVIDIA Jetson TX2 with Eclipse APP4MC</li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="https://summerofcode.withgoogle.com/archive/2019/projects/6207209711599616"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GSoC 2019 Contribution Page
                    </a>
                  </li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="education">
            <Accordion.Header>
              <div style={{ visibility: 'hidden' }}>&gt;</div>
              <div className="btn-link">Education</div>
              <div style={{ width: 10.95 }}>
                {!isEducationOpen ? <div style={{ color: 'white' }}>&gt;</div> : <div style={{ color: 'white' }}>v</div>}
              </div>
            </Accordion.Header>
            <Accordion.Body style={{ textAlign: 'left' }}>
              <h2 className="mb-0">Master of Engineering in Embedded Systems for Mechatronics</h2>
              <h3 className="text-primary">Dortmund University of Applied Sciences and Arts</h3>
              <ul>
                <li>Graduated from Dortmund University of Applied Sciences and Arts in 05.2021</li>
                <li>CGPA 1,6 (German Scale)</li>
              </ul>
              <div style={{ textAlign: 'left' }}>
                <h2 className="mb-0">Bachelor of Science in Mechatronics Engineering</h2>
                <h3 className="text-primary">Korea Polytechnic University</h3>
                <ul>
                  <li>Graduated from Korea Polytechnic University in 02.2018</li>
                  <li>CGPA 3,53 (Korean Scale)</li>
                </ul>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="certifications">
            <Accordion.Header>
              <div style={{ visibility: 'hidden' }}>&gt;</div>
              <div className="btn-link">Certifications</div>
              <div style={{ width: 10.95 }}>
                {!isCertificationsOpen ? <div style={{ color: 'white' }}>&gt;</div> : <div style={{ color: 'white' }}>v</div>}
              </div>
            </Accordion.Header>
            <Accordion.Body style={{ textAlign: 'left' }}>
              <h3>Goethe Certificate B1 (German)</h3>
              <ul>
                <li>Obtained in 12.2024</li>
              </ul>
              <button
                className="btn btn-primary mb-5 shadow border"
                onClick={() => downloadFile('assets/pdf/goethe-zertifikat-b1.pdf', 'goethe-zertifikat-b1.pdf')}
              >
                Download PDF Certificate
              </button>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="skills">
            <Accordion.Header>
              <div style={{ visibility: 'hidden' }}>&gt;</div>
              <div className="btn-link">Skills</div>
              <div style={{ width: 10.95 }}>
                {!isSkillsOpen ? <div style={{ color: 'white' }}>&gt;</div> : <div style={{ color: 'white' }}>v</div>}
              </div>
            </Accordion.Header>
            <Accordion.Body style={{ textAlign: 'left' }}>
              <div className="row" style={{ textAlign: 'left' }}>
                <div className="col">
                  <h3>Programming Languages:</h3>
                  <ul>
                    <li>Java</li>
                    <li>Go</li>
                    <li>Python</li>
                    <li>TypeScript</li>
                  </ul>
                </div>
                <div className="col">
                  <h3>Frameworks:</h3>
                  <ul>
                    <li>Spring Framework</li>
                    <li>Play Framework</li>
                    <li>Angular</li>
                    <li>Clean Architecture</li>
                  </ul>
                </div>
                <div className="col">
                  <h3>DB/Caching:</h3>
                  <ul>
                    <li>JPA</li>
                    <li>SQL</li>
                    <li>NoSQL</li>
                    <li>PostgreSQL</li>
                    <li>Redis</li>
                    <li>Elasticsearch</li>
                  </ul>
                </div>
                <div className="col">
                  <h3>DevOps:</h3>
                  <ul>
                    <li>Git</li>
                    <li>Jenkins</li>
                    <li>Docker</li>
                    <li>Kubernetes</li>
                    <li>AWS</li>
                    <li>Microsoft Azure</li>
                  </ul>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}


