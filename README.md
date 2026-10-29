# Jyothicharan Garapati — Data Science Portfolio

A responsive, animated personal portfolio built from the Freebuff Portfolio starter and styled in the black-and-red editorial direction of the supplied design reference. It presents the supplied resume, portrait, education, skills, certifications, mentorship experience, and competition achievements.

## Run it

```sh
bun install
bun run dev        # http://localhost:5173
bun run typecheck
bun run build
```

## Update the portfolio

- Edit **`src/data/resume.json`** to update the name, role, contact links, skills, education, experience, certifications, awards, intro, and other portfolio content. The home and about pages render these sections from the same structured JSON.
- Replace **`public/images/jyothicharan.png`** with a new portrait, keeping its path or updating the `portrait` value in the resume JSON.
- Replace **`public/jyothicharan-garapati-resume.pdf`** when the resume PDF changes; the navigation, about page, and footer all link to it.
- Adjust responsive layouts, colors, animations, reduced-motion handling, and component styles in **`src/styles.css`**. The site uses the existing React, Vite, Tailwind CSS, and Motion dependencies.
- The contact details use email, phone, and LinkedIn links. The resume download is a static PDF. The template's contact-form endpoint was not retained.

## Deploy with Freebuff Sites

`deploy.json` points at the build output. Build locally with `bun run build` before deploying with the `sites_deploy` tool.
