import { useEffect, useState } from 'react'
import { ArrowDownToLine, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import { site } from '../../data/site'
import { cx } from '../lib/cx'

export function useLocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: site.timezone }).format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

export function Nav() {
  const time = useLocalTime()
  const location = useLocation()
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 120)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  
  return (
    <header className={cx('fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]', hidden && !menuOpen && '-translate-y-full')}>
      <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="flex h-12 w-12 items-center justify-center border border-[var(--portfolio-red)] text-[var(--portfolio-red)] font-display text-lg font-bold">
              JG
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold text-white tracking-tight">{site.name}</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">{site.role}</span>
            </div>
          </Link>
        </div>

        {/* Center Section - Nav Links */}
        <nav className={cx('nav-scrollbar hidden lg:flex items-center gap-8', menuOpen && 'is-open')}>
          <a href="/#highlights" onClick={closeMenu} className="nav-link">Highlights</a>
          <a href="/#education" onClick={closeMenu} className="nav-link">Education</a>
          <a href="/#experience" onClick={closeMenu} className="nav-link">Experience</a>
          <a href="/#certifications" onClick={closeMenu} className="nav-link">Certifications</a>
          <a href="/#contact" onClick={closeMenu} className="nav-link">Contact</a>
          <Link to="/about" onClick={closeMenu} className="nav-link">About</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <a 
            className="hidden sm:flex items-center gap-2 border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white hover:border-[var(--portfolio-red)] hover:text-[var(--portfolio-red)] transition-colors" 
            href="/jyothicharan-garapati-resume.pdf" 
            download 
            onClick={closeMenu}
          >
            Resume <ArrowDownToLine size={12}/>
          </a>
          <div className="hidden xl:flex items-center gap-3">
            <span className="text-xs text-white/70">{site.location.split(',')[0]}, {site.location.split(',')[1]?.trim()}</span>
            <span className="h-2 w-2 rounded-full bg-[var(--portfolio-red)] animate-pulse"></span>
            <span className="text-xs text-white/70">{time} IST</span>
          </div>
          <div className="hidden xl:flex items-center gap-2 border border-[var(--portfolio-red)]/60 px-4 py-2">
            <span className="text-xs uppercase tracking-[0.15em] text-[var(--portfolio-red)]">Available For Opportunities</span>
            <span className="text-[var(--portfolio-red)]">+</span>
          </div>
          <button className="menu-toggle lg:hidden" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21}/> : <Menu size={21}/>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10">
          <nav className="flex flex-col px-4 py-6 gap-4">
            <a href="/#highlights" onClick={closeMenu} className="nav-link-mobile">Highlights</a>
            <a href="/#education" onClick={closeMenu} className="nav-link-mobile">Education</a>
            <a href="/#experience" onClick={closeMenu} className="nav-link-mobile">Experience</a>
            <a href="/#certifications" onClick={closeMenu} className="nav-link-mobile">Certifications</a>
            <a href="/#contact" onClick={closeMenu} className="nav-link-mobile">Contact</a>
            <Link to="/about" onClick={closeMenu} className="nav-link-mobile">About</Link>
            <a className="flex items-center gap-2 border border-white/30 px-4 py-3 text-xs uppercase tracking-[0.15em] text-white w-fit" href="/jyothicharan-garapati-resume.pdf" download onClick={closeMenu}>
              Resume <ArrowDownToLine size={12}/>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
