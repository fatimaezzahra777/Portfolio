import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Clients from './components/Clients'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

const pages = [
  { id: 'home', label: 'Accueil', number: '01' },
  { id: 'about', label: 'Profil', number: '02' },
  { id: 'projects', label: 'Projets', number: '03' },
  { id: 'contact', label: 'Contact', number: '04' },
]

function App() {
  const [activePage, setActivePage] = useState(0)

  const goToPage = (index) => {
    setActivePage((index + pages.length) % pages.length)
  }

  const content = [
    <Hero key="home" onExplore={() => goToPage(2)} />,
    <Clients key="about" />,
    <Projects key="projects" />,
    <Contact key="contact" />,
  ]

  return (
    <main className="portfolio-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#home" onClick={() => goToPage(0)}>
          <span>FE</span>
          <strong>Fatima Ezzahra.</strong>
        </a>
        <div className="topbar-note">
          <span className="status-dot" />
          Disponible pour de nouveaux projets
        </div>
      </header>

      <div className="experience">
        <section className="page-stage" aria-live="polite">
          <div className="page-meta">
            <span>{pages[activePage].number}</span>
            <span className="meta-line" />
            <span>{pages[activePage].label}</span>
          </div>
          <div key={activePage} className="page-transition">
            {content[activePage]}
          </div>
        </section>
      </div>

      <Footer activePage={activePage} total={pages.length} />
      <Navbar
        pages={pages}
        activePage={activePage}
        onNavigate={goToPage}
      />
    </main>
  )
}

export default App
