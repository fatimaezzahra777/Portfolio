function Footer({ activePage, total }) {
  return (
    <footer>
      <p>© 2026 Fatima Ezzahra</p>
      <div className="pagination" aria-label={`Page ${activePage + 1} sur ${total}`}>
        {Array.from({ length: total }, (_, index) => (
          <span key={index} className={index === activePage ? 'active' : ''} />
        ))}
      </div>
      <div className="social-links">
        <a href="#linkedin" aria-label="LinkedIn">in</a>
        <a href="#github" aria-label="GitHub">gh</a>
        <a href="#instagram" aria-label="Instagram">ig</a>
      </div>
    </footer>
  )
}

export default Footer
