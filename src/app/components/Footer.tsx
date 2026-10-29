import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../../data/site'

export function Footer() {
  return (
    <footer id="contact" className="contact-section mt-24 border-t border-line sm:mt-32">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="contact-grid"><div><p className="section-kicker">HAVE A QUESTION OR OPPORTUNITY?</p><h2>Let’s talk about<br/><span>what’s next.</span></h2><p className="contact-intro">I’m always glad to connect with people working on interesting ideas, data challenges, and opportunities to learn.</p><a className="button-primary" href={`mailto:${site.email}`}>Start a conversation <ArrowUpRight size={17}/></a></div><div className="contact-details"><a href={`mailto:${site.email}`}><span><Mail size={17}/></span><div><small>EMAIL</small><strong>{site.email}</strong></div><ArrowUpRight size={16}/></a><a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}><span><Phone size={17}/></span><div><small>PHONE</small><strong>{site.phone}</strong></div><ArrowUpRight size={16}/></a><div className="location-row"><span><MapPin size={17}/></span><div><small>BASED IN</small><strong>{site.location}</strong></div></div><a href={site.linkedin} target="_blank" rel="noreferrer"><span className="linkedin-letter">in</span><div><small>LET’S CONNECT</small><strong>LinkedIn profile</strong></div><ArrowUpRight size={16}/></a></div></div>
        <div className="footer-bottom"><a className="brand-lockup" href="#top"><span className="brand-mark">JG</span><span>{site.name}<small>{site.role}</small></span></a><p>© {new Date().getFullYear()} {site.name} · Built with curiosity.</p><a href="/jyothicharan-garapati-resume.pdf" download>Download resume ↓</a></div>
      </div>
    </footer>
  )
}
