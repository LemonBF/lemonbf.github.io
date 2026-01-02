# Personal Resume Website

A modern, responsive personal resume/CV website built with Bootstrap 5, featuring multi-language support and dark mode.

🔗 **Live Demo**: [lemonbf.github.io](https://lemonbf.github.io)

## ✨ Features

- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🌍 **Multi-language Support** - Available in Spanish, English, Catalan, and Ukrainian
- 🌓 **Dark Mode** - Toggle between light and dark themes with preference persistence
- 🎨 **Clean Design** - Professional layout optimized for recruiters and HR professionals
- ⚡ **Fast & Lightweight** - Static HTML/CSS/JS with no build process required

## 🌐 Language Support

The site includes a custom internationalization (i18n) system supporting:

- **Spanish (ES)** 🇪🇸 - Default language
- **English (EN)** 🇬🇧
- **Catalan (CA)** 🌐
- **Ukrainian (UK)** 🇺🇦

Language selection is:

- Automatically detected from browser preferences
- Saved to localStorage for persistence
- Easily switchable via dropdown (mobile) or buttons (desktop)

## 🌓 Dark Mode

- **Default**: Light mode
- **Toggle**: Sun/moon switch in the header
- **Persistence**: Preference saved in localStorage
- **Smooth Transitions**: Elegant color transitions between themes

## 📁 Project Structure

```
.
├── index.html              # Main resume page
├── CNAME                   # GitHub Pages domain config
├── assets/
│   ├── css/
│   │   ├── style.css       # Compiled Bootstrap styles
│   │   ├── i18n.css        # Language switcher styles
│   │   └── dark-mode.css   # Dark mode styles
│   ├── scss/
│   │   ├── style.scss      # Main SCSS source
│   │   └── bootstrap/      # Bootstrap 5 source
│   ├── js/
│   │   ├── i18n.js         # Internationalization logic
│   │   └── dark-mode.js    # Dark mode logic
│   ├── fontawesome/        # Font Awesome icons (local)
│   └── images/
│       └── perfil.jpg      # Profile picture
├── translations.json       # i18n translation strings
└── README.md
```

## 🛠️ Technologies and Libraries

- **Bootstrap 5** - Complete responsive framework with easy-to-use grid system
- **Font Awesome** - Comprehensive icon library
- **Vanilla JavaScript** - No dependencies, pure JS for i18n and dark mode
- **SCSS** - Customizable styling with variables
- **Google Fonts** - Roboto font family

## 🎨 Visual Design

Inspired by modern CV templates from:

- zety.es
- novoresume.com

## 🎯 Target Audience

This page is designed for HR professionals and recruiters looking for detailed information about the resume owner.

## 🚀 Usage

### Viewing the Site

Simply open `index.html` in a browser or visit the live site.

### Customizing Content

1. **Resume Information**: Edit content directly in `index.html`
2. **Translations**: Update `translations.json` with your content in all languages
3. **Styles**: Modify `assets/scss/style.scss` and compile to CSS
4. **Colors**: Adjust theme colors in SCSS variables

### Compiling SCSS

```bash
sass assets/scss/style.scss assets/css/style.css
```

## 📄 License

Personal project - All rights reserved

## 👤 Author

**Dmytro Holota**

- LinkedIn: [linkedin.com/in/dholota](https://www.linkedin.com/in/dholota)
- Email: <dimaholota@gmail.com>
