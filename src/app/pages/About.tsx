import { ArrowDownToLine, ArrowUpRight } from 'lucide-react'

import { experience, site } from '../../data/site'
import { Reveal } from '../components/motion'

export function About() {
  return (
    <article className="about-page mx-auto max-w-[1400px] px-5 pt-28 sm:px-8 sm:pt-36">
      <Reveal><p className="eyebrow">A resume, with a little more context</p><h1 className="about-title">Curious by nature.<br/><span>Data by design.</span></h1></Reveal>
      <div className="about-intro-grid">
        <Reveal><img className="about-portrait" src={site.portrait} alt={`Portrait of ${site.name}`} /></Reveal>
        <div className="about-copy"><Reveal><p className="section-kicker">A practical, people-first approach</p><h2>{site.name}</h2><p>{site.summary}</p><p>{site.intro}</p></Reveal><Reveal delay={.15} className="about-actions"><a className="button-primary" href="/jyothicharan-garapati-resume.pdf" download>Download resume <ArrowDownToLine size={16}/></a><a className="text-link" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a></Reveal><Reveal delay={.2} className="about-facts"><div><span>BASED IN</span><strong>{site.location}</strong></div><div><span>FOCUS</span><strong>Data science</strong></div><div><span>EMAIL</span><a href={`mailto:${site.email}`}>{site.email}</a></div></Reveal><Reveal delay={.25}><h3 className="section-kicker about-experience-kicker">RECENT EXPERIENCE</h3><ol className="about-experience">{experience.map((item) => <li key={item.title}><span>{item.period}</span><div><strong>{item.title}</strong><small>{item.organization} · {item.location}</small></div></li>)}</ol></Reveal></div></div>
    </article>
  )
}
