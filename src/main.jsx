import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Menu, X, Sun, Moon, Code2, Github, Linkedin, Mail, MessageCircle, Download, ExternalLink } from 'lucide-react';
import { copy } from './i18n/translations';
import { projects, skills, timeline } from './data/portfolio';
import portrait from './assets/fatima-portrait.png';
import './styles/global.css';
import './styles/responsive.css';

function ProjectTile({ project, lang, t, copyIndex = 0 }) {
    const duplicate = copyIndex > 0;
    return <article className="project-tile" style={{ '--project-accent': project.accent }}>
        <a className={`project-cover ${project.image ? 'has-screenshot' : ''}`} href={project.repository} target="_blank" rel="noreferrer" tabIndex={duplicate ? -1 : 0} aria-label={`${project.title[lang]} — ${t.github}`}>
            <span className="project-cover-kicker">{project.category[lang]} <span>/{project.number}</span></span>
            {project.image ? <img className="project-cover-image" src={project.image} alt="" /> : <span className="project-cover-mark" aria-hidden="true">{project.mark}</span>}
            <ArrowUpRight className="project-cover-arrow" size={18} aria-hidden="true" />
            <span className="project-cover-glow" aria-hidden="true" />
        </a>
        <div className="project-tile-content">
            <h3>{project.title[lang]}</h3>
            <p>{project.description[lang]}</p>
            <div className="project-tile-bottom">
                <div className="project-tile-tags">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
                {project.demo && <a className="project-live-link" href={project.demo} target="_blank" rel="noreferrer" tabIndex={duplicate ? -1 : 0} aria-label={`${project.title[lang]} — ${t.demo}`}><ExternalLink size={15} /></a>}
            </div>
        </div>
    </article>;
}

function MarqueeRow({ items, direction, paused, lang, t }) {
    const trackRef = useRef(null);
    const pausedRef = useRef(paused);
    useEffect(() => { pausedRef.current = paused; }, [paused]);
    useEffect(() => {
        const track = trackRef.current;
        if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let frame = 0;
        let lastTime = 0;
        let offset = 0;
        let cycleWidth = 0;
        let initialized = false;
        const measure = () => {
            cycleWidth = track.scrollWidth / 2;
            if (!initialized && cycleWidth > 0) {
                offset = direction < 0 ? cycleWidth : 0;
                track.style.transform = `translate3d(${-offset}px, 0, 0)`;
                initialized = true;
            }
        };
        const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
        resizeObserver?.observe(track);
        window.addEventListener('resize', measure);
        measure();

        const tick = time => {
            if (lastTime && !pausedRef.current && !document.hidden && cycleWidth > 0) {
                const delta = Math.min((time - lastTime) / 1000, 0.06);
                offset = (offset + direction * 42 * delta + cycleWidth) % cycleWidth;
                track.style.transform = `translate3d(${-offset}px, 0, 0)`;
            }
            lastTime = time;
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(frame);
            resizeObserver?.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [direction]);

    return <div className="project-marquee-row">
        <div className="project-marquee-track" ref={trackRef}>
            {[0, 1].map(copyIndex => <div className="project-marquee-group" key={copyIndex} aria-hidden={copyIndex === 1}>
                {items.map(project => <ProjectTile key={project.number} project={project} lang={lang} t={t} copyIndex={copyIndex} />)}
            </div>)}
        </div>
    </div>;
}

function App() {
    const [lang, setLang] = useState(() => {
        const savedLanguage = localStorage.getItem('portfolio-language');
        if (savedLanguage === 'en') return 'en';
        if (savedLanguage && savedLanguage !== 'fr') localStorage.setItem('portfolio-language', 'fr');
        return 'fr';
    });
    const [dark, setDark] = useState(() => localStorage.getItem('portfolio-theme') === 'dark');
    const [open, setOpen] = useState(false); const [sent, setSent] = useState(false);
    const [projectsPaused, setProjectsPaused] = useState(false);
    const [error, setError] = useState(false); const reduced = useReducedMotion();
    const t = copy[lang];
    useEffect(() => {
        const closeOnEscape = event => { if (event.key === 'Escape') setOpen(false) };
        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, []);
    const changeLang = e => { setLang(e.target.value); localStorage.setItem('portfolio-language', e.target.value) };
    const toggleTheme = () => { setDark(v => { localStorage.setItem('portfolio-theme', !v ? 'dark' : 'light'); return !v }) };
    const reveal = { initial: { opacity: 0, y: reduced ? 0 : 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .16 }, transition: { duration: reduced ? 0 : .65, ease: [.2, .7, .2, 1] } };
    const submit = e => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        if ([...f.values()].some(value => !String(value).trim())) { setError(true); return; }
        setError(false);
        setSent(true);
        const message = `Bonjour Fatima,\n\n${f.get('subject')}\n${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`;
        const whatsappUrl = `https://wa.me/212633697284?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return <div className={dark ? 'app dark' : 'app'} dir="ltr" lang={lang}>
        <header className="nav-wrap"><nav className="nav container" aria-label="Main navigation"><a className="brand" href="#home" aria-label="Fatima Ezzahra Belissaoui home"><span className="brand-mark">F<span>.</span></span><span className="brand-name">Fatima Ezzahra<br /><small>Belissaoui</small></span></a><div className={`nav-links ${open ? 'is-open' : ''}`} id="primary-navigation">{t.nav.map((x, i) => <a href={['#home', '#about', '#skills', '#projects', '#experience', '#contact'][i]} onClick={() => setOpen(false)} key={x}>{x}</a>)}</div><div className="nav-actions"><label className="sr-only" htmlFor="language">Language</label><select id="language" className="language" value={lang} onChange={changeLang} aria-label="Language"><option value="fr">FR</option><option value="en">EN</option></select><button className="icon-button" onClick={toggleTheme} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button><button className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-navigation">{open ? <X size={18} /> : <Menu size={18} />}</button></div></nav></header>
        <main><section className="hero container" id="home"><div className="hero-copy"><motion.p className="eyebrow" {...reveal}><span className="eyebrow-line" />{t.eyebrow}</motion.p><motion.h1 {...reveal} transition={{ duration: .7, delay: .08 }}>Fatima Ezzahra<br /><em>Belissaoui</em></motion.h1><motion.p className="hero-role" {...reveal}>{t.role}<span> · </span>Morocco</motion.p><motion.p className="hero-intro" {...reveal}>{t.intro}</motion.p><motion.div className="hero-ctas" {...reveal}><a className="button button-dark" href="#projects">{t.work}<ArrowUpRight size={16} /></a><a className="button button-outline" href="#contact">{t.contact}</a></motion.div><motion.a className="button cv-link" {...reveal} href="/cv-fatimaezzahra-belissaoui.pdf" download><Download size={16} aria-hidden="true" />{t.cv}</motion.a></div><motion.div className="hero-art" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9 }}><div className="art-frame"><div className="art-top"><span>PORTFOLIO</span><span>MMXXV</span></div><div className="portrait-placeholder"><div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" /><img className="portrait-photo" src={portrait} alt="Portrait de Fatima Ezzahra Belissaoui" /><div className="portrait-sun" /></div><div className="art-bottom"><span className="art-caption">{t.role}</span><Code2 size={19} /></div></div><span className="art-index">01 — 05</span></motion.div><a className="scroll-cue" href="#about"><span>{t.scroll}</span><ArrowDown size={15} /></a></section>
            <section className="section container about" id="about">
                <motion.div className="section-label" {...reveal}>{t.aboutNo}</motion.div>
                <div className="about-grid">
                    <motion.h2 {...reveal}>{t.aboutTitle}</motion.h2>
                    <motion.div className="about-text" {...reveal}>
                        <p>{t.aboutBody}</p>
                        <div className="approach">
                            <span className="mini-label">{t.approach}</span>
                            <p>{t.approachBody}</p></div></motion.div>
                            </div>
                            </section>
            <section className="section skills-section" id="skills"><div className="container"><motion.div className="section-label" {...reveal}>{t.skillsNo}</motion.div><motion.h2 className="section-heading" {...reveal}>{t.skillsTitle}</motion.h2><div className="skill-grid">{skills[lang].map((group, i) => <motion.article className="skill-card" key={group.title} {...reveal} transition={{ duration: .55, delay: i * .06 }}><span className="skill-count">0{i + 1}</span><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></motion.article>)}</div></div></section>
            <section className="section projects-section" id="projects">
                <div className="container">
                    <motion.div className="section-label" {...reveal}>{t.projectsNo}</motion.div>
                    <div className="section-title-row">
                        <motion.h2 className="section-heading" {...reveal}>{t.projectsTitle}</motion.h2>
                        <motion.p {...reveal}>{t.projectsIntro}</motion.p>
                    </div>
                </div>
                <div className="projects-marquee" onPointerEnter={() => setProjectsPaused(true)} onPointerLeave={() => setProjectsPaused(false)} onFocusCapture={() => setProjectsPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setProjectsPaused(false); }}>
                    <MarqueeRow items={projects.filter((_, index) => index % 2 === 0)} direction={-1} paused={projectsPaused} lang={lang} t={t} />
                    <MarqueeRow items={projects.filter((_, index) => index % 2 === 1)} direction={1} paused={projectsPaused} lang={lang} t={t} />
                </div>
            </section>
            <section className="section journey-section" id="experience"><div className="container"><motion.div className="section-label" {...reveal}>{t.timelineNo}</motion.div><motion.h2 className="section-heading" {...reveal}>{t.timelineTitle}</motion.h2><div className="timeline">{timeline.map((item, i) => <motion.article className="timeline-item" key={i} {...reveal}><span className="timeline-dot" /><span className="timeline-period">{item.period[lang]}</span><div><h3>{item.title[lang]}</h3><p>{item.detail[lang]}</p></div></motion.article>)}</div></div></section>
            <section className="section container contact-section" id="contact"><div className="contact-intro"><motion.div className="section-label" {...reveal}>{t.contactNo}</motion.div><motion.h2 {...reveal}>{t.contactTitle}</motion.h2><motion.p {...reveal}>{t.contactIntro}</motion.p><motion.div className="social-links" {...reveal}><a href="mailto:fatimaezzahrabel777@gmail.com"><Mail size={16} />{t.mailto}<ArrowUpRight size={14} /></a><a href="https://wa.me/212633697284" target="_blank" rel="noreferrer"><MessageCircle size={16} />WhatsApp<ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/fatimaezzahra-belissaoui-a64668367" target="_blank" rel="noreferrer"><Linkedin size={16} />{t.linkedin}<ArrowUpRight size={14} /></a><a href="https://github.com/fatimaezzahra777" target="_blank" rel="noreferrer"><Github size={16} />{t.githubLink}<ArrowUpRight size={14} /></a></motion.div></div><motion.form className="contact-form" onSubmit={submit} {...reveal}><div className="form-row"><label>{t.name}<input name="name" autoComplete="name" /></label><label>{t.email}<input type="email" name="email" autoComplete="email" /></label></div><label>{t.subject}<input name="subject" /></label><label>{t.message}<textarea name="message" rows="4" /></label><p className="form-note">{t.formNote}</p>{error && <p className="form-feedback error" role="alert">{t.required}</p>}{sent && <p className="form-feedback" role="status">{t.sent}</p>}<button className="button button-dark submit-button" type="submit">{t.send}<ArrowUpRight size={16} /></button></motion.form></section>
        </main><footer className="footer"><div className="container footer-inner"><a className="brand" href="#home"><span className="brand-mark">F<span>.</span></span><span className="brand-name">Fatima Ezzahra<br /><small>Belissaoui</small></span></a><span>© {new Date().getFullYear()} Fatima Ezzahra Belissaoui</span><span>{t.footer}</span><a className="back-top" href="#home" aria-label="Back to top"><ArrowUpRight size={17} /></a></div></footer>
    </div>
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
