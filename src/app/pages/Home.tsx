import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { achievements, certifications, education, experience, site } from '../../data/site'

const ease = [0.22, 1, 0.36, 1] as const

function LiveTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: site.timezone }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span>{time} IST</span>
}

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <>
      {/* Hero Section - Template Style */}
      <section ref={containerRef} id="top" className="hero-template relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
        {/* Live Time - Top Right */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 right-0 z-20 px-5 py-6 sm:px-8 lg:px-12"
        >
          <div className="glass-pill text-[10px] uppercase tracking-[0.2em] text-white/80">
            <LiveTime />
          </div>
        </motion.div>

        {/* Big PORTFOLIO Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease }}
            className="hero-bg-text font-display"
          >
            PORTFOLIO
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-12 lg:px-12">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="order-2 flex flex-col gap-6 lg:order-1"
          >
            <div>
              <p className="hero-script mb-2">Hello, I'm</p>
              <h1 className="hero-name font-display">
                <span className="block">{site.firstName.toUpperCase()}</span>
                <span className="block text-[var(--portfolio-red)]">{site.name.split(' ').slice(1).join(' ').toUpperCase()}</span>
              </h1>
              <p className="mt-4 text-lg uppercase tracking-[0.15em] text-[var(--portfolio-red)] font-medium">
                Data Science Undergraduate
              </p>
            </div>
            <p className="max-w-md text-base leading-relaxed text-white/70">
              {site.intro}
            </p>
            <div className="glass-card inline-flex items-center gap-2 self-start">
              <MapPin size={14} className="text-[var(--portfolio-red)]" />
              <span className="text-xs uppercase tracking-[0.15em]">Available Worldwide</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="button-primary glass-button" href={`mailto:${site.email}`}>
                Let's Connect <ArrowUpRight size={17} />
              </a>
              <a className="button-text glass-button" href="#education">
                Explore My Resume <ArrowDown size={15} />
              </a>
            </div>
          </motion.div>

          {/* Center - Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            style={{ rotateX, rotateY }}
            className="order-1 relative flex justify-center lg:order-2"
          >
            <div className="portrait-container relative">
              <div className="portrait-glow absolute inset-0 -z-10"></div>
              <div className="portrait-frame">
                <img 
                  className="portrait-image" 
                  src={site.portrait} 
                  alt={`Portrait of ${site.name}`} 
                  fetchPriority="high" 
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="glass-card absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <span className="text-xs uppercase tracking-[0.15em] flex items-center gap-2">
                  <span className="status-dot animate-pulse"></span>
                  Based in {site.location.split(',')[0]}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="order-3 flex flex-col items-start gap-8 lg:items-end"
          >
            <div className="glass-card max-w-xs">
              <p className="text-sm leading-relaxed">
                <span className="text-[var(--portfolio-red)] text-lg">+</span> Turning questions into clarity through data-driven solutions.
              </p>
            </div>
            <div className="flex flex-col gap-6 text-right">
              <motion.div 
                whileHover={{ scale: 1.05, x: -10 }}
                className="glass-stat"
              >
                <div className="text-4xl font-display font-bold text-[var(--portfolio-red)] lg:text-5xl">
                  {achievements.length}+
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/70">
                  Achievements
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, x: -10 }}
                className="glass-stat"
              >
                <div className="text-4xl font-display font-bold text-[var(--portfolio-red)] lg:text-5xl">
                  {certifications.length}+
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/70">
                  Certifications
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, x: -10 }}
                className="glass-stat"
              >
                <div className="text-4xl font-display font-bold text-[var(--portfolio-red)] lg:text-5xl">
                  100%
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/70">
                  Dedication
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.a 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          href="#achievements" 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-[var(--portfolio-red)] transition-colors"
        >
          <span>Scroll to explore</span>
          <ArrowDown size={16} className="animate-bounce" />
        </motion.a>
      </section>

      {/* Marquee */}
      <div className="marquee overflow-hidden border-y border-white/10 py-4 backdrop-blur-sm" aria-label="Areas of focus">
        <ul className="font-display flex w-max animate-marquee items-center gap-8 whitespace-nowrap text-[21px] sm:text-[28px]">
          {[...site.marquee, ...site.marquee].map((item, i) => (
            <li key={i} className="flex items-center gap-8 text-white/90">{item}<span className="marquee-star text-[var(--portfolio-red)]">✳</span></li>
          ))}
        </ul>
      </div>

      <section id="achievements" className="content-section mx-auto max-w-[1400px] px-5 pt-24 sm:px-8 sm:pt-32">
        <SectionHeading label="Achievements & Recognition" title="Proof in the details." index="01" />
        <div className="highlight-grid">
          {achievements.map((item, i) => (
            <motion.article 
              whileHover={{ scale: 1.02, y: -5 }}
              className="highlight-card glass-card-dynamic" 
              key={item.title}
            >
              <span className="highlight-number text-[var(--portfolio-red)]">{item.rank}</span>
              <div>
                <p className="highlight-kicker text-[var(--portfolio-red)]">{item.event}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <span className="highlight-mark">0{i + 1}</span>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="education" className="content-section mx-auto max-w-[1400px] px-5 pt-24 sm:px-8 sm:pt-32">
        <SectionHeading label="The learning behind the work" title="Education & Skills." index="02" />
        <div className="education-grid">
          <div className="education-list">
            {education.map((item, i) => (
              <motion.article 
                whileHover={{ x: 10 }}
                className="education-item glass-card-dynamic" 
                key={item.institution}
              >
                <span className="education-index text-[var(--portfolio-red)]">0{i + 1}</span>
                <div>
                  <h3>{item.qualification}</h3>
                  <p className="education-specialization">{item.specialization}</p>
                  <p>{item.institution} · {item.location}</p>
                </div>
                <div className="education-result">
                  <span>{item.period}</span>
                  <strong className="text-[var(--portfolio-red)]">{item.result}</strong>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="skills-panel glass-card-dynamic">
            <p className="section-kicker text-[var(--portfolio-red)]">TOOLS & STRENGTHS</p>
            <div className="skill-cloud">
              {site.skills.map((skill) => (
                <motion.span 
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
                  className="skill-chip" 
                  key={skill.name}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
            <p className="skills-note">Curiosity first. Clear thinking always.</p>
          </div>
        </div>
      </section>

      <section id="experience" className="content-section process-section mx-auto max-w-[1400px] px-5 pt-24 sm:px-8 sm:pt-32">
        <SectionHeading label="Experience, with people at the center" title="Mentor. Encourage. Improve." index="03" />
        <div className="process-grid">
          <div className="experience-list">
            {experience.map((item) => (
              <motion.article 
                whileHover={{ scale: 1.01 }}
                className="experience-card glass-card-dynamic" 
                key={item.title}
              >
                <div className="experience-topline">
                  <span className="status-dot" />{item.period}
                </div>
                <h3>{item.title}</h3>
                <p className="experience-place text-[var(--portfolio-red)]">{item.organization} · {item.location}</p>
                <ul>
                  {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </motion.article>
            ))}
          </div>
          <aside className="process-quote glass-card-dynamic">
            <span className="quote-mark text-[var(--portfolio-red)]">"</span>
            <blockquote>Good analysis starts with better questions—and ends with insights people can act on.</blockquote>
            <p>Jyothicharan Garapati</p>
            <span className="quote-caption">DATA · DISCOVERY · DIRECTION</span>
          </aside>
        </div>
      </section>

      <section id="certifications" className="content-section mx-auto max-w-[1400px] px-5 pt-24 sm:px-8 sm:pt-32">
        <SectionHeading label="Always learning" title="Certificates & Credentials." index="04" />
        <div className="cert-grid">
          {certifications.map((item, i) => (
            <motion.article 
              whileHover={{ scale: 1.02, x: 5 }}
              className="cert-card glass-card-dynamic" 
              key={item.name}
            >
              <span className="cert-index text-[var(--portfolio-red)]">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{item.name}</h3>
                <p>{item.issuer}</p>
              </div>
              <ArrowUpRight className="cert-arrow" size={18} />
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section story-section mx-auto max-w-[1400px] px-5 pt-24 sm:px-8 sm:pt-32 pb-24">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="story-card glass-card-dynamic relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <img src="/images/jyothicharan-outdoor.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <p className="section-kicker text-[var(--portfolio-red)]">THE WAY I THINK</p>
            <h2>"Stay curious.<br />Make it make sense."</h2>
            <p className="story-signature">JYOTHICHARAN</p>
          </div>
          <span className="story-orbit orbit-one"/>
          <span className="story-orbit orbit-two"/>
        </motion.div>
        <div className="story-copy">
          <p className="eyebrow text-[var(--portfolio-red)]">A little about me</p>
          <h2>Turning questions into clarity.</h2>
          <p>{site.summary}</p>
          <p>From precision debugging to peer mentoring, I value patient thinking, clear communication, and work that helps people move forward.</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a className="button-primary glass-button" href={site.linkedin} target="_blank" rel="noreferrer">
              Connect on LinkedIn <ArrowUpRight size={16}/>
            </a>
            <a className="button-text glass-button" href={`mailto:${site.email}`}>
              <Mail size={16} /> Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Contact Footer Section */}
      <section className="contact-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--portfolio-red)]/10 via-transparent to-transparent"></div>
        <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:items-center">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
              >
                Let's Work<br />
                <span className="text-[var(--portfolio-red)]">Together</span>
              </motion.h2>
              <p className="mt-6 max-w-md text-white/70">
                I'm currently open for new opportunities and collaborations. Let's create something amazing together.
              </p>
              <a className="button-primary glass-button mt-8 inline-flex" href={`mailto:${site.email}`}>
                Get In Touch <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="glass-card-dynamic space-y-4">
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-white/80 hover:text-[var(--portfolio-red)] transition-colors">
                <Mail size={18} className="text-[var(--portfolio-red)]" />
                <span>{site.email}</span>
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-[var(--portfolio-red)] transition-colors">
                <ArrowUpRight size={18} className="text-[var(--portfolio-red)]" />
                <span>LinkedIn</span>
              </a>
              <a href={`tel:${site.phone}`} className="flex items-center gap-3 text-white/80 hover:text-[var(--portfolio-red)] transition-colors">
                <Phone size={18} className="text-[var(--portfolio-red)]" />
                <span>{site.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin size={18} className="text-[var(--portfolio-red)]" />
                <span>{site.location}</span>
              </div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="glass-card-dynamic relative overflow-hidden aspect-square"
            >
              <img src="/images/jyothicharan-outdoor.jpg" alt="Jyothicharan" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.15em] text-white/80">
                Data Science • Problem Solving
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

function SectionHeading({ label, title, index }: { label: string; title: string; index: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="section-heading mb-12"
    >
      <div>
        <p className="section-kicker text-[var(--portfolio-red)]">{label}</p>
        <h2>{title}</h2>
      </div>
      <span className="section-index text-[var(--portfolio-red)]">{index} <span>—</span> 05</span>
    </motion.div>
  )
}
