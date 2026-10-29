import resume from './resume.json'

// Keep personal details and resume sections in src/data/resume.json so the site
// can be updated without changing page components.
export const site = {
  ...resume,
  timezone: 'Asia/Kolkata',
  socials: [{ label: 'LinkedIn', href: resume.linkedin }],
}

export type Resume = typeof resume

export const education = resume.education
export const experience = resume.experience
export const certifications = resume.certifications
export const achievements = resume.achievements
