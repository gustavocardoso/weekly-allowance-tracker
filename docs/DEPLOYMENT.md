# 🚀 Deployment Guide

## Build for Production

```bash
# Install dependencies
npm install

# Run production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` folder.

## Deployment Options

### 1. Static Hosting (Recommended)

The app is a static SPA that can be deployed to any static hosting service:

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

#### GitHub Pages
```bash
# Add to package.json:
"homepage": "https://yourusername.github.io/allowance-calculator"

# Build and deploy
npm run build
# Push dist folder to gh-pages branch
```

#### Cloudflare Pages
- Connect GitHub repository
- Set build command: `npm run build`
- Set publish directory: `dist`

### 2. Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|wasm)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Build and run:
```bash
docker build -t allowance-calculator .
docker run -p 80:80 allowance-calculator
```

## Environment Configuration

### Base URL
If deploying to a subdirectory, update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/subdirectory/',
  // ... rest of config
});
```

### Production Optimizations

The build is already optimized with:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Gzip compression
- ✅ Asset optimization

## Post-Deployment Checklist

- [ ] Test the app on production URL
- [ ] Verify database persistence works
- [ ] Test on mobile devices
- [ ] Check all routes work correctly
- [ ] Verify export/import functionality
- [ ] Test performance (Lighthouse)
- [ ] Check browser console for errors
- [ ] Verify responsive design
- [ ] Test accessibility
- [ ] Check that sql.js WASM file loads

## Performance Tips

### 1. Enable HTTPS
Always use HTTPS for security and performance benefits.

### 2. CDN
Use a CDN for static assets to improve loading times globally.

### 3. Caching Headers
Set appropriate cache headers for static assets:
```
Cache-Control: max-age=31536000, immutable  // For JS, CSS with hash
Cache-Control: no-cache                      // For HTML
```

### 4. Compression
Enable Gzip/Brotli compression on your server.

### 5. PWA (Future)
Add service worker for offline support and faster loading.

## Monitoring

### Recommended Tools
- **Google Analytics**: User tracking
- **Sentry**: Error tracking
- **Lighthouse**: Performance monitoring
- **LogRocket**: Session replay

## Backup Strategy

The app stores data locally in the browser:

1. **Users can export** their data as JSON from Settings
2. **Encourage regular exports** as backup
3. **No server-side data** to backup (unless you add sync)

## Troubleshooting

### Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### WASM Loading Issues
Ensure sql.js WASM file is served with correct MIME type:
```
Content-Type: application/wasm
```

### Routing Issues on Server
Configure server to serve `index.html` for all routes (SPA routing).

### IndexedDB Issues
Check browser compatibility and privacy settings (IndexedDB must be enabled).

## Security Considerations

1. **HTTPS Only**: Always deploy with HTTPS
2. **CSP Headers**: Add Content Security Policy headers
3. **No Sensitive Data**: App stores data locally only
4. **XSS Protection**: React provides automatic escaping
5. **Regular Updates**: Keep dependencies updated

## License

MIT License - See LICENSE file for details.
