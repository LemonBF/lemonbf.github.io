# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal resume/CV website for Dmytro Holota, hosted on GitHub Pages at lemonbf.github.io. The site is a single-page application that presents professional experience, skills, education, and contact information in a clean, responsive layout.

**Target audience**: HR professionals and recruiters looking for detailed information about the resume owner.

## Architecture

### Single-Page Static Site
- **Main file**: `index.html` - Contains all content and structure (no JavaScript application logic)
- **Styling**: SCSS compiled to CSS, using Bootstrap 5 framework
- **Icons**: Font Awesome (loaded via local assets)
- **No build system**: CSS must be compiled manually from SCSS when making style changes

### Directory Structure
```
.
├── index.html              # Main resume page (all content here)
├── CNAME                   # GitHub Pages custom domain config
├── assets/
│   ├── css/
│   │   └── style.css      # Compiled CSS (do not edit directly)
│   ├── scss/
│   │   ├── style.scss     # Main stylesheet (edit this)
│   │   └── bootstrap/     # Bootstrap 5 source files
│   ├── fontawesome/       # Font Awesome library (local)
│   └── images/
│       └── perfil.jpg     # Profile picture
```

## Styling System

### Theme Customization
All visual customization is done through SCSS variables in `assets/scss/style.scss`:

- **Primary color**: `$theme-color-primary: #434E5E` (dark blue-gray)
- **Text colors**: `$theme-text-color-primary`, `$theme-text-color-secondary`, `$theme-text-color-light`
- **Background**: `$theme-bg-light: #F7F8FA`

### SCSS to CSS Compilation
After editing SCSS files, compile to CSS using a SASS compiler:
```bash
# Example using sass CLI (if available)
sass assets/scss/style.scss assets/css/style.css
```

Note: No automated build system is configured. Manual compilation is required.

## Content Updates

### Editing Resume Content
All resume content is in `index.html`. The page uses semantic HTML5 structure:

1. **Header section** (lines 26-50): Name, title, contact info, social links
2. **Summary section** (lines 52-58): Professional summary paragraph
3. **Experience section** (lines 61-161): Work history with timeline visualization
4. **Skills section** (lines 164-247): Technical skills with progress bars
5. **Education section** (lines 248-269): Academic background
6. **Languages section** (lines 270-281): Language proficiencies
7. **Interests section** (lines 282-291): Personal interests

### Experience Items Structure
Each job follows this pattern:
```html
<article class="resume-timeline-item position-relative pb-5">
  <div class="resume-timeline-item-header mb-2">
    <h3 class="resume-position-title">Job Title</h3>
    <div class="resume-company-name">Company Name</div>
    <div class="resume-position-time">YYYY - Present</div>
  </div>
  <div class="resume-timeline-item-desc">
    <p>Job description</p>
    <h4>Funciones y logros destacados:</h4>
    <ul><li>Achievement 1</li></ul>
    <h4>Tecnologías utilizadas:</h4>
    <ul class="list-inline">
      <li class="list-inline-item"><span class="badge bg-secondary badge-pill">Tech</span></li>
    </ul>
  </div>
</article>
```

### Skills Progress Bars
Skills use Bootstrap progress bars. To adjust skill levels, change the `style="width: XX%"` value:
```html
<div class="progress-bar theme-progress-bar-dark" role="progressbar" style="width: 90%"></div>
```

## Dependencies

- **Bootstrap 5**: Included locally in `assets/scss/bootstrap/`
- **Font Awesome**: Included locally in `assets/fontawesome/`
- **Google Fonts**: Roboto font loaded from CDN (see `index.html:12`)

All major dependencies are vendored locally except for Google Fonts.

## Deployment

This site is deployed via GitHub Pages. Changes pushed to the `main` branch are automatically published.

**Custom domain**: Configured via `CNAME` file (currently not set up with a domain)

To deploy changes:
1. Edit content in `index.html` or styles in `assets/scss/style.scss`
2. If SCSS was edited, compile to CSS
3. Commit and push to `main` branch
4. GitHub Pages will automatically deploy

## Language

The resume content is in Spanish (lang="es"). When updating content, maintain Spanish language throughout.
