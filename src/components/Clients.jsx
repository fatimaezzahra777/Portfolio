const skills = [
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Bootstrap',
  'UI / UX',
  'Figma',
  'JavaScript',
  'React',
  'PHP',
  'Laravel',
  'MySQL',
  'PostgreSQL',
  'Git / GitHub',
  'UML',
  'Jira',
  'Trello',
  'Scrum',
  'Docker',
  'C',
]

function Clients() {
  return (
    <section className="about page-content" id="about">
      <div className="about-intro">
        <p className="eyebrow">À propos de moi</p>
        <h2>
          Du code propre.
          <span>Des interfaces</span>
          <span>qui ont du caractère.</span>
        </h2>
        <p className="lead">
          Je suis Fatima Ezzahra Belissaoui, développeuse Full Stack. Après un
          diplôme en développement digital à l&apos;OFPPT, je poursuis mon
          parcours à YouCode. J&apos;allie conception, développement et méthode
          agile pour construire des solutions web fiables.
        </p>

        <div className="about-details">
          <div>
            <small>Formation actuelle</small>
            <strong>YouCode Safi · UM6P</strong>
          </div>
          <div>
            <small>Expérience</small>
            <strong>Stage Full Stack · Ebru Immo</strong>
          </div>
        </div>
      </div>

      <div className="skills-panel">
        <div className="skills-panel-heading">
          <span>Mon expertise</span>
          <strong>Technologies & outils</strong>
        </div>
        <div className="skill-list">
          {skills.map((skill, index) => (
            <span key={skill}>
              <small>{String(index + 1).padStart(2, '0')}</small>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Clients
