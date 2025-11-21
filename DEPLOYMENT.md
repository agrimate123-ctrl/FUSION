# 🚀 Production Deployment Guide

## ✅ Pre-Deployment Checklist

### Security
- [x] API keys moved to environment variables
- [x] .env files added to .gitignore
- [x] CORS properly configured for production domains
- [x] Removed hardcoded localhost URLs

### Configuration
- [x] Backend uses `process.env.PORT`
- [x] Backend listens on `0.0.0.0`
- [x] Frontend uses `VITE_BACKEND_URL` env variable
- [x] Build scripts configured

## 🌐 Deployment Steps

### 1. Backend Deployment (Render)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as root directory

3. **Configure Service**
   ```
   Name: graphorax-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy your backend URL (e.g., `https://graphorax-backend.onrender.com`)

### 2. Frontend Deployment (Vercel)

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Root Directory: `.` (root)
   - Framework Preset: Vite

3. **Environment Variables**
   ```
   VITE_BACKEND_URL=https://graphorax-backend.onrender.com
   ```

4. **Build Settings** (Auto-detected)
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build
   - Get your production URL

### 3. Update CORS

After frontend deploys, update backend env:
```
ALLOWED_ORIGINS=https://your-actual-frontend.vercel.app
```

## 🔧 Alternative Platforms

### Backend Options
- **Railway** - Similar to Render
- **Heroku** - Classic PaaS
- **DigitalOcean App Platform**
- **AWS Elastic Beanstalk**

### Frontend Options
- **Netlify** - Alternative to Vercel
- **Cloudflare Pages**
- **GitHub Pages** (static only)

## 📊 Post-Deployment

### Test Your App
1. Visit your frontend URL
2. Try a query in Agriculture domain
3. Check if causal graph generates
4. Verify backend connection in DevTools Network tab

### Monitor
- Render Dashboard → Logs
- Vercel Dashboard → Deployment logs
- Set up error tracking (optional): Sentry

## 🐛 Common Issues

### CORS Error
```
Access-Control-Allow-Origin error
```
**Fix:** Add frontend URL to `ALLOWED_ORIGINS` in backend env

### Backend Not Responding
**Fix:** Check Render logs, verify PORT is not hardcoded

### Graph Not Showing
**Fix:** Verify `VITE_BACKEND_URL` points to correct backend

### Build Fails
**Fix:** Run `npm run build` locally to check for errors

## 💰 Cost Estimate

### Free Tier
- **Render:** Free tier available (sleeps after 15min inactive)
- **Vercel:** Generous free tier for personal projects
- **Gemini API:** Free tier with rate limits

### Paid (if needed)
- **Render:** $7/month for always-on
- **Vercel Pro:** $20/month for team features
- **Gemini API:** Pay per use after free tier

## 🔒 Security Best Practices

1. **Never commit .env files**
2. **Rotate API keys regularly**
3. **Set up rate limiting** (if high traffic)
4. **Enable HTTPS only** (both platforms enforce this)
5. **Monitor API usage** to avoid unexpected charges

## 📱 Mobile Optimization

Already included:
- Responsive design with Tailwind
- Touch-friendly graph interactions
- Mobile viewport meta tags

## ✨ Production Optimizations Applied

- [x] Environment-based URLs
- [x] CORS whitelist configuration  
- [x] Production build optimization (Vite)
- [x] Code splitting (automatic with Vite)
- [x] Asset optimization (automatic with Vite)
- [x] Error boundaries (consider adding Sentry)

## 🎯 Next Steps

1. Deploy backend to Render
2. Get backend URL
3. Deploy frontend to Vercel with backend URL
4. Update CORS in backend
5. Test production app
6. Set up custom domain (optional)

---

**Your app is production-ready! 🎉**
