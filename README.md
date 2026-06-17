# Paul Legal Associates — Website

Production-ready **React TypeScript** + **Tailwind CSS** website for Paul Legal Associates (Advocates), Navi Mumbai.

---

## 🏛️ About This Site

Built for **Paul Legal Associates (Advocates)** — a full-service law firm based in Panvel, Navi Mumbai, practicing before the Bombay High Court and Supreme Court of India.

**Brand**: `#174171` navy blue + `#c8a951` gold  
**Tagline**: *Enduring Values. Delivering Results.*

---

## 🗂 Project Structure

```
paul-legal-associates/
├── public/
│   ├── index.html              # Full SEO meta, JSON-LD LegalService schema
│   ├── logo.png                # Paul Legal Associates logo
│   └── images/
│       ├── polachan.jpg        # Adv. P. P. Polachan
│       ├── sojan.jpg           # Adv. Sojan Paul
│       └── sonam.jpg           # Adv. Sonam Paul
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx       # Outlet wrapper
│   │   │   ├── Navbar.tsx       # Fixed nav with logo, active links, mobile menu
│   │   │   └── Footer.tsx       # 4-column footer with all real details
│   │   └── ui/
│   │       ├── AnimateIn.tsx    # IntersectionObserver scroll reveal
│   │       ├── SectionHeader.tsx# Reusable eyebrow + title + subtitle
│   │       └── CredentialsBar.tsx # Bottom credentials strip
│   │
│   ├── pages/
│   │   ├── Home.tsx             # Hero · Stats · Who We Are · Practice Areas · Why Us · Testimonials · CTA
│   │   ├── About.tsx            # Story · Highlights · Philosophy · Values · Timeline · CTA
│   │   ├── Expertise.tsx        # Interactive explorer · Full grid · CTA
│   │   ├── Team.tsx             # Photo cards · Interactive profile panel
│   │   ├── Contact.tsx          # Form · Office info · Hours · FAQ
│   │   └── NotFound.tsx         # 404
│   │
│   ├── hooks/
│   │   ├── useInView.ts
│   │   └── useScrollPosition.ts
│   │
│   ├── data/index.ts            # ALL real content (team, practice areas, contact, etc.)
│   ├── types/index.ts           # TypeScript interfaces
│   ├── App.tsx                  # Router with lazy-loaded pages
│   ├── index.tsx                # Entry point
│   └── index.css                # Tailwind directives + @layer components/utilities
│
├── tailwind.config.js           # Brand colors, fonts, keyframes
├── postcss.config.js
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm start
# → http://localhost:3000

# Production build
npm run build
```

---

## 🛣 Routes

| Path          | Page       | Content |
|---------------|------------|---------|
| `/`           | Home       | Hero with logo, firm headline, stats, who we are (with team photos), practice areas grid, why choose us, testimonials, CTA |
| `/about`      | About Us   | Story, highlights, aim & philosophy, values, firm timeline |
| `/expertise`  | Expertise  | Interactive sidebar explorer + full 6-area grid |
| `/team`       | Our Team   | Photo cards (Polachan, Sojan, Sonam) + interactive profile detail panel |
| `/contact`    | Contact    | Validated form, real address/phone/email, office hours, FAQ |
| `*`           | 404        | Custom not-found page |

---

## 🎨 Brand Colors

From logo extraction (`#174171` = RGB 23, 65, 113):

```js
navy: {
  DEFAULT: "#174171",   // Primary brand navy
  mid:     "#1a4d85",   // Slightly lighter
  light:   "#1e5a9a",   // Hover states
  deep:    "#0d2743",   // Dark sections
  darker:  "#0a1f35",   // Deepest backgrounds
}
gold: {
  DEFAULT: "#c8a951",   // Primary accent
  light:   "#dfc278",   // Light accent
  pale:    "#f3e6c0",   // Background tint
}
cream: "#f8f6f0"         // Light page sections
```

---

## 👥 Real Team Data

| Advocate              | Title            | Specialisation |
|-----------------------|------------------|----------------|
| Adv. P. P. Polachan  | Partner          | Property Law & Commercial Practice, 30+ yrs |
| Adv. Sojan Paul       | Managing Partner | Property Law, RERA & Land Acquisitions |
| Adv. Sonam Paul       | Partner          | Legal Compliance, Labour Law & Audit, 8+ yrs |

---

## 📍 Real Contact Details

```
Paul Legal Associates (Advocates)
Office No. 301, 3rd Floor, Om Sai Building,
Plot No.101/3, Swami Nityanand Road,
Near Garden Hotel, Panvel,
Navi Mumbai, Maharashtra 410 206.

Mobile:  +91 7977063567
Email:   info@paullegalassociates.com
Website: www.paullegalassociates.com
```

---

## ⚖️ Practice Areas

1. Property & Real Estate
2. Commercial Litigation & Arbitration
3. Legal Compliance & Audit
4. Banking Laws
5. Corporate & Commercial Advisory
6. Land Acquisitions

---

## 🔧 Customisation

All content lives in `src/data/index.ts`. To update:
- **Team**: Edit `TEAM_MEMBERS` array (photo paths reference `public/images/`)
- **Practice areas**: Edit `PRACTICE_AREAS`
- **Contact**: Edit `CONTACT_INFO`
- **Colors**: Edit `tailwind.config.js` → `theme.extend.colors`

---

## 🌐 Deployment

```bash
npm run build
```

**Netlify**: Add `public/_redirects`:
```
/*  /index.html  200
```

**Vercel**: Zero-config (`vercel --prod`)
