import { useRef } from 'react'

function Navbar({ pages, activePage, onNavigate }) {
  const dragStart = useRef(null)
  const wheelLocked = useRef(false)

  const handleWheel = (event) => {
    if (wheelLocked.current || Math.abs(event.deltaY) < 8) return
    wheelLocked.current = true
    onNavigate(activePage + (event.deltaY > 0 ? 1 : -1))
    window.setTimeout(() => {
      wheelLocked.current = false
    }, 500)
  }

  const handlePointerDown = (event) => {
    dragStart.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerUp = (event) => {
    if (!dragStart.current) return
    const delta = event.clientX - dragStart.current.x
    if (Math.abs(delta) > 35) {
      onNavigate(activePage + (delta < 0 ? 1 : -1))
    }
    dragStart.current = null
  }

  const handleKeyDown = (event) => {
    if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
      event.preventDefault()
      onNavigate(activePage + 1)
    }
    if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
      event.preventDefault()
      onNavigate(activePage - 1)
    }
  }

  return (
    <nav
      className="wheel-nav"
      aria-label="Navigation principale"
      tabIndex="0"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <div
        className="navigation-wheel"
        style={{ '--rotation': `${activePage * -90}deg` }}
      >
        <span className="wheel-orbit wheel-orbit-outer" />
        <span className="wheel-orbit wheel-orbit-inner" />
        {pages.map((page, index) => (
          <button
            className={`wheel-item wheel-item-${index} ${
              activePage === index ? 'is-active' : ''
            }`}
            type="button"
            key={page.id}
            onClick={() => onNavigate(index)}
            aria-current={activePage === index ? 'page' : undefined}
            aria-label={`Afficher la page ${page.label}`}
          >
            <span className="wheel-number">{page.number}</span>
            <span className="wheel-label">{page.label}</span>
          </button>
        ))}
      </div>

      <div className="wheel-center">
        <small>Tournez</small>
        <span>{pages[activePage].label}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 9l-3 3 3 3M17 9l3 3-3 3M4 12h16" />
        </svg>
      </div>

      <div className="wheel-hint">
        <span>Glisser</span>
        <span>Molette</span>
        <span>Flèches</span>
      </div>
    </nav>
  )
}

export default Navbar
