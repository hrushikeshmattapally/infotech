import { useRef } from "react";
import projects from "../data/projects";

function ProjectsCarousel() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const amount = direction === "left" ? -320 : 320;
    sliderRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="projects-section">
      <div className="projects-header">
        <h2>Our Tools</h2>

        <div className="arrows">
          <button onClick={() => scroll("left")}>&lt;</button>
          <button onClick={() => scroll("right")}>&gt;</button>
        </div>
      </div>

      <div className="projects-slider" ref={sliderRef}>
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            onClick={() => window.open(project.link, "_blank")}
          >
            <img src={project.image} alt={project.title} />
            <h4>{project.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsCarousel;
