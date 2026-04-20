# Youth Empowerment — Official Website

A complete, production-ready Next.js 14 website for the Youth Empowerment student community.

---

## 🚀 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **React Icons**
- **Formspree** (contact & volunteer forms)
- **Google Forms** (embedded on Join page)
- **LocalStorage** (theme persistence)

---

## 📁 Project Structure

```
youth-empowerment/
├── app/
│   ├── layout.tsx              # Root layout (Navbar, Footer, Chatbot)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles + Tailwind + Google Fonts
│   ├── about/page.tsx          # About page
│   ├── what-we-do/page.tsx     # Programs & initiatives
│   ├── team/page.tsx           # Team grid
│   ├── testimonials/page.tsx   # Student & volunteer testimonials
│   ├── gallery/page.tsx        # Filterable gallery + lightbox
│   ├── join/page.tsx           # Google Form embed + benefits
│   └── contact/page.tsx        # Contact form (Formspree)
│
├── components/
│   ├── Navbar.tsx              # Sticky navbar w/ mobile menu + dark mode
│   ├── Footer.tsx              # Full professional footer
│   ├── FadeIn.tsx              # Reusable scroll-triggered animation
│   ├── Chatbot.tsx             # Floating chatbot widget
│   ├── ThemeProvider.tsx       # Dark/light mode context + localStorage
│   └── sections/
│       ├── HeroSection.tsx     # Home hero with gradient orbs
│       ├── ImpactSection.tsx   # Animated counters
│       ├── WhatWeDoPreview.tsx # 3-card preview
│       └── HomeCtaSection.tsx  # Volunteer form + WhatsApp CTA
│
├── data/
│   ├── team.json               # Team member data
│   └── testimonials.json       # Student & volunteer testimonials
│
├── lib/
│   └── useCounter.ts           # Animated number counter hook
│
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites (Required Software)

- **Node.js** LTS (recommended: v20 or v22)
- **npm** (comes with Node.js)

Optional:
- **VS Code** (or any code editor)

Check installed versions:

```bash
node -v
npm -v
```

### If you received a ZIP (no Git needed)

1. Extract the project folder.
2. Open a terminal inside the extracted `youth-empowerment` folder.

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

If port `3000` is busy, Next.js will use `3001` or another open port automatically.

### 3. Build for production

```bash
npm run build
npm run start
```

---

## 🔧 Configuration

### Formspree (Contact & Volunteer Forms)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your form ID
3. Replace the contact form endpoint in `app/contact/page.tsx` with your Formspree URL

### EmailJS (Optional alternative)
If you prefer EmailJS over Formspree:
1. Sign up at [emailjs.com](https://emailjs.com)
2. Create a service and template
3. Replace Formspree fetch calls with `emailjs.send()`

### Team Data
Edit `data/team.json` to update team members. Each member has:
```json
{
  "id": 1,
  "name": "Name",
  "role": "Role",
  "bio": "Short bio",
  "image": "URL",
  "linkedin": "URL"
}
```

### Gallery Images
Replace Unsplash URLs in `app/gallery/page.tsx` with your actual photos. Store photos in `public/images/gallery/` and update paths.

---

## 🎨 Design System

### Fonts
- **Syne** — Display headings (bold, distinctive)
- **DM Sans** — Body text (clean, readable)

### Colors
- **Primary**: Blue (`#0e9de8` → `#027bc6`)
- **Accent**: Orange (`#f97316`)
- **Dark bg**: `#080f1c`

### Key CSS Classes
```
.gradient-text     — gradient text effect
.card-glass        — glassmorphism card
.btn-primary       — primary CTA button
.btn-outline       — outline button
.section-tag       — section category badge
```

---

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, program preview, CTAs |
| About | `/about` | Story, mission, vision, values, cities |
| What We Do | `/what-we-do` | Technical + leadership programs |
| Team | `/team` | Team member grid with bios |
| Testimonials | `/testimonials` | Student & volunteer feedback |
| Gallery | `/gallery` | Filterable photo grid + lightbox |
| Join | `/join` | Google Form + benefits + social links |
| Contact | `/contact` | Contact form + social channels |

---

## ✨ Features

- ✅ Dark/Light mode with localStorage persistence
- ✅ Smooth Framer Motion animations on all sections
- ✅ Animated number counters (scroll-triggered)
- ✅ Mobile-first responsive design
- ✅ Sticky navbar with active state and scroll effect
- ✅ Lightbox gallery with category filter
- ✅ Floating chatbot widget with FAQ responses
- ✅ Volunteer application modal form
- ✅ Google Form embed on Join page
- ✅ Contact form via Formspree
- ✅ SEO metadata on every page
- ✅ Full professional footer with all links

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload your project through Netlify UI
```

---

## 📦 Dependencies

```json
{
  "next": "^16.1.6",
  "react": "^18",
  "react-dom": "^18",
  "clsx": "^2.1.0",
  "framer-motion": "^11.0.0",
  "react-icons": "^5.0.0",
  "tailwind-merge": "^2.2.0",
  "@emailjs/browser": "^4.3.0"
}
```

---

## 🤝 Contributing

This is the official Youth Empowerment website. For changes, please reach out to the team at yempowerment241@gmail.com.

---

© 2024 Youth Empowerment Community. All rights reserved.
