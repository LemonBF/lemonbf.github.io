# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal resume/CV website for Dmytro Holota, hosted on GitHub Pages at lemonbf.github.io. The site is a single-page application that presents professional experience, skills, education, and contact information in a clean, responsive layout.

**Target audience**: HR professionals and recruiters looking for detailed information about the resume owner.

**Key Features**:
- Multi-language support (Spanish, English, Catalan, Ukrainian)
- Dark mode with theme persistence
- Fully responsive design
- No build system required (except SCSS compilation)

## Architecture

### Single-Page Static Site
- **Main file**: `index.html` - Contains all content and structure
- **Styling**: SCSS compiled to CSS, using Bootstrap 5 framework
- **Icons**: Font Awesome (loaded via local assets)
- **JavaScript**: Vanilla JS for i18n and dark mode functionality
- **No build system**: CSS must be compiled manually from SCSS when making style changes

### Directory Structure
```
.
├── index.html              # Main resume page (all content here)
├── translations.json       # i18n translation strings for all languages
├── CNAME                   # GitHub Pages custom domain config
├── assets/
│   ├── css/
│   │   ├── style.css      # Compiled Bootstrap CSS (do not edit directly)
│   │   ├── i18n.css       # Language switcher styles
│   │   └── dark-mode.css  # Dark mode theme styles
│   ├── scss/
│   │   ├── style.scss     # Main stylesheet (edit this)
│   │   └── bootstrap/     # Bootstrap 5 source files
│   ├── js/
│   │   ├── i18n.js        # Internationalization system
│   │   └── dark-mode.js   # Dark mode toggle logic
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

## Internationalization (i18n)

### Supported Languages
- **Spanish (ES)** 🇪🇸 - Default language
- **English (EN)** 🇬🇧
- **Catalan (CA)** 🌐
- **Ukrainian (UK)** 🇺🇦

### How It Works
1. **Translation File**: All translations are stored in `translations.json` at the root
2. **HTML Attributes**: Elements use `data-i18n` attributes to reference translation keys
   ```html
   <h2 data-i18n="experience.title">Experiencia laboral</h2>
   ```
3. **JavaScript**: `assets/js/i18n.js` handles language switching and DOM updates
4. **Persistence**: User's language choice is saved in localStorage
5. **Auto-detection**: Browser language is detected on first visit

### Language Switcher UI
- **Desktop**: 4 buttons with flag emojis and language codes (in header, secondary-info section)
- **Mobile**: Dropdown select with all language options
- **Location**: Inside the header's `secondary-info` section, below the LinkedIn link

### Adding/Editing Translations
1. Edit `translations.json` - structured as `{ "language": { "section.key": "value" } }`
2. Add `data-i18n="section.key"` attribute to HTML elements
3. JavaScript automatically updates content when language changes

## Dark Mode

### Theme System
- **Default**: Light mode
- **Toggle**: Sun/moon switch button in header (secondary-info section)
- **Persistence**: Theme choice saved in localStorage
- **CSS Variables**: Themes defined using CSS custom properties in `assets/css/dark-mode.css`

### Color Schemes
**Light Mode** (default):
- Background: `#fff`
- Text: `#212529`
- Header: `#434E5E`

**Dark Mode**:
- Background: `#1a1a1a`
- Text: `#e4e4e4`
- Header: `#2d2d2d`

### Implementation
1. **HTML**: Toggle button with id `darkModeToggle` in the header
2. **CSS**: Theme-specific styles using `[data-theme="dark"]` selector
3. **JavaScript**: `assets/js/dark-mode.js` manages theme switching
4. **State**: Applied via `data-theme` attribute on `<html>` element

### Customizing Dark Mode
- Edit color variables in `assets/css/dark-mode.css` under `[data-theme="dark"]`
- All theme colors use CSS custom properties (e.g., `var(--bg-primary)`)

## Content Updates

### Editing Resume Content
All resume content is in `index.html`. The page uses semantic HTML5 structure:

**Important**: Most text content uses `data-i18n` attributes for multi-language support. To update content:
1. Edit the text in `index.html` (this will be the fallback/default)
2. Update corresponding translations in `translations.json` for all languages

**Main sections**:
1. **Header section**: Name, title, contact info, social links, language switcher, dark mode toggle
2. **Summary section**: Professional summary paragraph
3. **Experience section**: Work history with timeline visualization
4. **Skills section**: Technical skills with progress bars
5. **Education section**: Academic background
6. **Languages section**: Language proficiencies
7. **Interests section**: Personal interests

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

## Multi-Language Content

The site supports 4 languages with Spanish as the default:

- **Default language**: Spanish (ES) - `lang="es"` on `<html>` element
- **Available languages**: ES, EN, CA, UK
- **Content source**: Primary content in `index.html`, translations in `translations.json`

**When updating content**:
1. Update the Spanish text in `index.html` (default/fallback)
2. Add/update the `data-i18n` attribute with the translation key
3. Update all language versions in `translations.json`
4. Test all language versions to ensure consistency

**Dynamic `lang` attribute**: The i18n system automatically updates the `<html lang>` attribute based on the selected language.
