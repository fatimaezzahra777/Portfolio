import { useState } from 'react'

const projects = [
  {
    number: '01',
    title: 'Second Chance',
    category: 'Accompagnement des personnes en addiction · Laravel 12',
    color: 'project-terracotta',
    url: 'https://github.com/fatimaezzahra777/Second_Chance',
  },
  {
    number: '02',
    title: 'WorkSphere',
    category: 'Gestion des zones et du personnel · JavaScript',
    color: 'project-plum',
  },
  {
    number: '03',
    title: 'Talentia',
    category: 'Plateforme de recrutement · Laravel',
    color: 'project-wine',
  },
  {
    number: '04',
    title: 'EasyColoc',
    category: 'API de gestion de colocation · Laravel',
    color: 'project-rose',
  },
  {
    number: '05',
    title: 'Ebru Immo',
    category: 'Projet réalisé en stage Full Stack · Rabat',
    color: 'project-gold',
  },
]

function Projects() {
  const [currentProject, setCurrentProject] = useState(0)

  const changeProject = (direction) => {
    setCurrentProject(
      (currentProject + direction + projects.length) % projects.length,
    )
  }

  const visibleProjects = [-2, -1, 0, 1, 2].map((offset) => {
    const projectIndex =
      (currentProject + offset + projects.length) % projects.length

    return {
      ...projects[projectIndex],
      offset,
      projectIndex,
    }
  })

  return (
    <section className="projects page-content" id="projects">
      <div className="projects-heading">
        <div>
          <p className="eyebrow">Une sélection de projets</p>
          <h2>Mes projets</h2>
        </div>
        <p>
          Interfaces modernes, applications utiles et expériences pensées
          jusque dans les détails.
        </p>
      </div>

      <div className="project-carousel">
        <button
          className="carousel-button carousel-previous"
          type="button"
          onClick={() => changeProject(-1)}
          aria-label="Afficher les projets précédents"
        >
          ←
        </button>

        <div className="project-window">
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <button
                className={`project-card ${project.color} project-position-${
                  project.offset + 2
                } ${project.offset === 0 ? 'project-featured' : ''}`}
                type="button"
                key={project.title}
                onClick={() => {
                  if (project.offset !== 0) {
                    setCurrentProject(project.projectIndex)
                    return
                  }
                  if (project.url) window.open(project.url, '_blank', 'noopener')
                }}
                aria-label={`${
                  project.offset === 0 && project.url
                    ? 'Découvrir'
                    : 'Afficher'
                } le projet ${project.title}`}
              >
                <span className="project-number">{project.number}</span>
                <div className="project-visual">
                  <span />
                  <span />
                  <span />
                </div>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </div>

        <button
          className="carousel-button carousel-next"
          type="button"
          onClick={() => changeProject(1)}
          aria-label="Afficher les projets suivants"
        >
          →
        </button>
      </div>

      <div className="project-progress">
        <span>{String(currentProject + 1).padStart(2, '0')}</span>
        <div>
          {projects.map((project, index) => (
            <button
              type="button"
              className={index === currentProject ? 'active' : ''}
              key={project.title}
              onClick={() => setCurrentProject(index)}
              aria-label={`Afficher ${project.title}`}
            />
          ))}
        </div>
        <span>{String(projects.length).padStart(2, '0')}</span>
      </div>
    </section>
  )
}

export default Projects
