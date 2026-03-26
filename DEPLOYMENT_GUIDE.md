# Portfolio Deployment & Hosting Guide

Your Java Full Stack Developer portfolio is now updated and ready to deploy! Here are multiple ways to host it.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deployment Options](#deployment-options)
3. [Building for Production](#building-for-production)
4. [Hosting Platforms](#hosting-platforms)

---

## Prerequisites

Make sure you have:

- Node.js v16+ installed
- Git installed
- Account on hosting platform (Vercel, Netlify, or GitHub Pages)

```bash
# Verify Node.js installation
node --version
npm --version
```

---

## Building for Production

Run these commands to build your portfolio:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Verify build output
ls -la dist/
```

The `dist/` folder contains your production-ready files.

---

## Hosting Platforms

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**

- Free tier with generous limits
- Automatic deployments from Git
- Fast global CDN
- One-click deployment

#### Steps:

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Your site is live! 🎉

3. **Custom Domain** (Optional)
   - In Vercel Dashboard → Settings → Domains
   - Add your custom domain (e.g., archityadav.dev)
   - Follow DNS configuration steps

#### Environment Variables (if needed)

Create `.env.local`:

```
VITE_API_URL=https://your-api.com
```

---

### Option 2: Netlify

**Why Netlify?**

- Excellent free tier
- Continuous deployment
- Built-in form handling (for contact form)
- Preview deployments

#### Steps:

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect GitHub
   - Select your repository

2. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy"

3. **Form Submissions** (Optional)
   - Update Contact.jsx to use Netlify Forms
   - Add `netlify` attribute to form element

#### Contact Form Setup (Netlify):

```jsx
<form name="contact" method="POST" netlify onSubmit={handleSubmit}>
  {/* form fields */}
</form>
```

---

### Option 3: GitHub Pages (Free)

**Why GitHub Pages?**

- Completely free
- Integrated with GitHub
- Good for static sites

#### Steps:

1. **Update vite.config.js**

   ```javascript
   export default {
     base: "/portfolio/", // if using user.github.io/portfolio
     // OR
     base: "/", // if using custom domain or username.github.io
   };
   ```

2. **Create GitHub Action** (`.github/workflows/deploy.yml`)

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: "18"
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Pages → Source → Deploy from branch
   - Select `gh-pages` branch
   - Your site will be at: `https://USERNAME.github.io/portfolio`

---

## Custom Domain Setup

### For Vercel:

1. Go to Vercel Dashboard
2. Project → Settings → Domains
3. Add your domain
4. Update your domain's DNS records as instructed

### For Netlify:

1. Domain settings in Netlify
2. Add custom domain
3. Update DNS records (A, CNAME, or nameservers)

### Popular Domain Registrars:

- **Namecheap** (Affordable, good support)
- **GoDaddy** (Popular, beginner-friendly)
- **Google Domains** (Simple DNS management)
- **Hostinger** (Good prices)

---

## Production Checklist

Before deploying, verify:

- [ ] All personal information updated
- [ ] Links to GitHub and LinkedIn are correct
- [ ] Resume PDF accessible (place in `public/resume.pdf`)
- [ ] Email address in Contact section is correct
- [ ] Projects showcase real work
- [ ] No console errors: `npm run build`
- [ ] Performance: `npm run preview` then check Lighthouse

---

## Performance Optimization

Your Vite + React + Tailwind setup is already optimized, but:

1. **Compress Images**: Use tools like [TinyPNG](https://tinypng.com)
2. **Add Resume PDF**: Place your resume in `public/` folder
3. **SEO Optimization**: Update meta tags in `index.html`
4. **Analytics**: Add Google Analytics or Vercel Analytics

---

## Post-Deployment Tasks

### 1. Test Everything

```bash
npm run preview  # Test production build locally
```

### 2. Enable SSL (HTTPS)

- Vercel/Netlify: Automatic
- GitHub Pages: Automatic for GitHub.io domains

### 3. Setup Analytics

- Vercel Analytics: Dashboard → Analytics
- Google Analytics: Add to `index.html`

### 4. Monitor Performance

- Vercel: Dashboard shows analytics
- Netlify: Analytics tab
- Google Lighthouse: Check regularly

---

## Continuous Deployment

Your git-based deployment automatically:

- Builds on every push to main
- Deploys when build succeeds
- Creates preview for pull requests (Vercel/Netlify)

```bash
# Deploy a new version
git add .
git commit -m "Update portfolio with new projects"
git push origin main
# Wait ~1-2 minutes for automatic deployment
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Site Shows 404

- Check `base` path in vite.config.js
- Verify dist folder exists and has content
- Check build command in deployment settings

### Custom Domain Not Working

- Wait 24-48 hours for DNS propagation
- Verify DNS records at [MXToolbox](https://mxtoolbox.com)
- Check domain settings in hosting platform

---

## Recommended Next Steps

1. **Add Resume PDF**
   - Create professional resume PDF
   - Place in `public/resume.pdf`
   - Update download link in Hero section

2. **Connect Contact Form**
   - Integrate with EmailJS or Netlify Forms
   - Test form submissions

3. **Add More Projects**
   - Update `src/data/projects.js`
   - Add screenshots/GIFs
   - Link to live demos and GitHub repos

4. **SEO Optimization**
   - Update `index.html` meta tags
   - Add Open Graph tags
   - Submit to Google Search Console

5. **Add Blog** (Optional)
   - Create `/blog` route
   - Use markdown for articles
   - SEO boost from fresh content

---

## My Recommendations

**For Beginners:** Use **Vercel** or **Netlify** (easiest, best UI)
**For Full Control:** Use **GitHub Pages** with custom domain
**For Maximum Features:** Use **Netlify** (form handling, CMS options)

All three options are free and excellent for developer portfolios!

---

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev
- React Docs: https://react.dev

---

Good luck with your portfolio! 🚀

**Questions?** Update your portfolio regularly with new projects and skills to keep it fresh!
