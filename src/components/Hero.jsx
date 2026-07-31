import heroImage from '../assets/hero.png'

function Hero({ onExplore }) {
  return (
    <section className="hero page-content" id="home">
      <div className="hero-description">
        <p className="eyebrow">Développeuse Full Stack & créatrice digitale</p>
        <h1>
          Je crée des
          <span>expériences digitales</span>
          <span>remarquables.</span>
        </h1>
        <p className="hero-copy">
          Développeuse Full Stack formée à l&apos;OFPPT et actuellement à
          YouCode, je transforme des besoins concrets en applications web
          modernes, utiles et faciles à utiliser.
        </p>

        <div className="hero-actions">
          <button className="primary-button" type="button" onClick={onExplore}>
            Voir mes projets
            <span aria-hidden="true">↗</span>
          </button>
          <a
            className="text-link"
            href="/CV-FatimaEzzahra-Belissaoui.pdf"
            download
          >
            Télécharger mon CV
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>10+</strong>
            <span>Projets réalisés</span>
          </div>
          <div>
            <strong>2025</strong>
            <span>Stage Full Stack</span>
          </div>
        </div>
      </div>

      <div className="hero-panel">
        <div className="hero-panel-heading">
          <span>Mon univers</span>
          <strong>Design · Code · Créativité</strong>
        </div>
        <div className="hero-portrait" aria-label="Portrait de Fatima Ezzahra">
          <span className="portrait-ring" />
          <span className="portrait-label">Full Stack Developer</span>
          <img src={heroImage} alt="Fatima Ezzahra" />
        </div>
      </div>
    </section>
  )
}

export default Hero
