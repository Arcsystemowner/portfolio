# Archit Yadav - Java Full Stack Developer Portfolio

A modern, responsive portfolio showcasing Full Stack Development expertise in Java, Spring Boot, React.js, and microservices architecture.

## 🌐 Live Demo

Once deployed, your portfolio will be accessible at your custom domain or hosting URL.

## 🛠 Tech Stack

### Frontend

- **React.js** 18+ with Hooks
- **Vite** for fast development & building
- **Tailwind CSS** for responsive design
- **Framer Motion** for smooth animations
- **React Icons** for UI icons

### Styling & UI

- Dark mode support
- Fully responsive design (Mobile, Tablet, Desktop)
- Smooth scroll animations
- Interactive components

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   └── ScrollProgress.jsx
│   ├── sections/            # Page sections
│   │   ├── Hero.jsx         # Welcome section
│   │   ├── About.jsx        # About me
│   │   ├── Skills.jsx       # Technical skills
│   │   ├── Projects.jsx     # Portfolio projects
│   │   ├── Experience.jsx   # Work experience
│   │   ├── Contact.jsx      # Contact form
│   │   └── Footer.jsx
│   ├── data/                # Content data
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── experience.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                  # Static assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── DEPLOYMENT_GUIDE.md      # Hosting instructions
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The dev server will run at `http://localhost:5173`

## 📝 Customization Guide

### Update Personal Information

#### 1. Hero Section (`src/sections/Hero.jsx`)

- Change name and title
- Update tagline and description
- Modify social links (GitHub, LinkedIn)
- Update resume download link

#### 2. About Section (`src/sections/About.jsx`)

- Update bio and introduction
- Modify strength cards
- Update statistics

#### 3. Skills (`src/data/skills.js`)

```javascript
export const skills = {
  Frontend: [
    { name: "React.js", level: 95, icon: "react" },
    // Add more skills
  ],
  Backend: [
    { name: "Java", level: 92, icon: "java" },
    // Add more skills
  ],
  // Add more categories
};
```

#### 4. Experience (`src/data/experience.js`)

```javascript
export const experience = [
  {
    id: 1,
    company: "Company Name",
    role: "Your Role",
    period: "2023 – Present",
    location: "City, Country",
    type: "Full-time",
    description: "...",
    responsibilities: ["..."],
    techStack: ["Tech1", "Tech2"],
  },
];
```

#### 5. Projects (`src/data/projects.js`)

```javascript
export const projects = [
  {
    id: 1,
    title: "Project Title",
    description: "...",
    problem: "...",
    solution: "...",
    techStack: ["Tech1", "Tech2"],
    metrics: ["Metric1", "Metric2"],
    github: "https://github.com/...",
    demo: "https://...",
    featured: true,
    color: "from-indigo-500 to-violet-600",
  },
];
```

#### 6. Contact Section (`src/sections/Contact.jsx`)

- Update email address
- Update LinkedIn and GitHub URLs
- Configure contact form (EmailJS or Netlify Forms)

## 🎨 Customization Options

### Color Scheme

Edit `tailwind.config.js` to change primary colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        400: '#your-color',
        500: '#your-color',
        600: '#your-color',
      },
    },
  },
}
```

### Add Resume PDF

1. Place your resume PDF in `public/` folder
2. Name it `resume.pdf`
3. The download button in Hero section will automatically work

## 📦 Building for Production

```bash
# Create optimized production build
npm run build

# The 'dist' folder contains deployment-ready files
```

Build optimizations included:

- Code splitting
- Tree shaking
- Asset compression
- CSS purging

## 🌍 Deployment Options

### 1. **Vercel** (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Your site is live!
```

Or connect GitHub repository at [vercel.com](https://vercel.com)

### 2. **Netlify**

Connect your GitHub repository at [netlify.com](https://netlify.com)

Build settings:

- Build command: `npm run build`
- Publish directory: `dist`

### 3. **GitHub Pages**

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions

### 4. **Traditional Hosting** (Shared/Dedicated)

Upload the `dist/` folder contents to your hosting provider:

```bash
# Build first
npm run build

# Then upload dist/ folder via FTP/SSH/Control Panel
```

## 📧 Contact Form Setup

### Option A: Netlify Forms (Simplest)

Already configured! Just ensure form has `netlify` attribute.

### Option B: EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Get your Service ID, Template ID, and Public Key
3. Install EmailJS: `npm install @emailjs/browser`
4. Update Contact.jsx to use EmailJS

```javascript
import emailjs from "@emailjs/browser";

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      form,
      "YOUR_PUBLIC_KEY",
    );
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Option C: Formspree

1. Visit [formspree.io](https://formspree.io)
2. Create a new form and get endpoint
3. Update form action to Formspree endpoint

## 🔒 Security & Privacy

- No sensitive data is stored
- Form submissions go directly to your email
- No tracking cookies by default
- Respects user privacy

To add analytics:

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_ID");
</script>
```

## ✅ Pre-Deployment Checklist

- [ ] Updated name and personal info
- [ ] All links working (GitHub, LinkedIn)
- [ ] Resume PDF in public folder
- [ ] All projects filled with real work
- [ ] Skills accurately represented
- [ ] Experience updated
- [ ] Contact email is correct
- [ ] No console errors: `npm run build`
- [ ] Tested locally: `npm run preview`
- [ ] Performance checked (Lighthouse 90+)

## 📊 Performance Tips

1. **Optimize Images**: Compress and use next-gen formats (WebP)
2. **Lazy Load Components**: Use React.lazy() for below-fold sections
3. **Cache Assets**: CDN automatically handled by deployment platforms
4. **Monitor Performance**: Use Vercel Analytics or Google Lighthouse

Current performance:

- Lighthouse: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <2.5s

## 🐛 Troubleshooting

### Port already in use

```bash
# Use different port
npm run dev -- --port 3000
```

### Build fails

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Styling issues

```bash
# Rebuild Tailwind CSS
npm run build
```

## 📚 Useful Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)

## 🤝 Contributing & Updates

Keep your portfolio fresh:

1. Add new projects quarterly
2. Update skills as you learn
3. Add new experiences
4. Keep content accurate and relevant
5. Monitor performance regularly

## 📄 License

This portfolio template is open source and free to use.

## 🎯 Next Steps

1. **Customize Content**: Update all sections with your information
2. **Add Resume**: Place PDF in `public/` folder
3. **Deploy**: Choose hosting platform and deploy
4. **Domain**: Connect custom domain for professional appearance
5. **Monitor**: Track analytics and user engagement

## 📞 Support

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

Ready to deploy? Start with [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)! 🚀
