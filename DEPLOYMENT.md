# LegalEase Frame Deployment Guide

This guide covers deploying LegalEase Frame to production environments.

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account
- OpenAI API key
- OnchainKit API key

### Steps

1. **Fork the Repository**
   ```bash
   # Fork this repository to your GitHub account
   # Then clone your fork
   git clone https://github.com/YOUR_USERNAME/legalease-frame.git
   cd legalease-frame
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your forked repository
   - Select "Next.js" framework preset

3. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   
   **Required:**
   ```
   OPENAI_API_KEY=sk-your-openai-api-key
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-onchainkit-api-key
   ```
   
   **Optional:**
   ```
   NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
   NEXT_PUBLIC_BASE_CHAIN_ID=8453
   UPSTASH_REDIS_REST_URL=your-redis-url
   UPSTASH_REDIS_REST_TOKEN=your-redis-token
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-app-name.vercel.app`

## 🔧 Manual Deployment

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   
   COPY package.json package-lock.json* ./
   RUN npm ci
   
   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   
   RUN npm run build
   
   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app
   
   ENV NODE_ENV production
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   
   EXPOSE 3000
   
   ENV PORT 3000
   ENV HOSTNAME "0.0.0.0"
   
   CMD ["node", "server.js"]
   ```

2. **Build and Run**
   ```bash
   # Build the Docker image
   docker build -t legalease-frame .
   
   # Run the container
   docker run -p 3000:3000 \
     -e OPENAI_API_KEY=your-key \
     -e NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-key \
     legalease-frame
   ```

### VPS Deployment

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   
   # Install Nginx for reverse proxy
   sudo apt install nginx -y
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/YOUR_USERNAME/legalease-frame.git
   cd legalease-frame
   
   # Install dependencies
   npm install
   
   # Create environment file
   cp .env.example .env.local
   # Edit .env.local with your API keys
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "legalease-frame" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/legalease-frame
   server {
       listen 80;
       server_name your-domain.com;
   
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   # Enable site
   sudo ln -s /etc/nginx/sites-available/legalease-frame /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. **SSL Certificate (Let's Encrypt)**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx -y
   
   # Get certificate
   sudo certbot --nginx -d your-domain.com
   ```

## 🔐 Environment Configuration

### Production Environment Variables

```bash
# Required
OPENAI_API_KEY=sk-your-production-openai-key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-production-onchainkit-key

# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production

# Base Network (Mainnet)
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_CHAIN_ID=8453

# Optional: Redis for caching
UPSTASH_REDIS_REST_URL=your-production-redis-url
UPSTASH_REDIS_REST_TOKEN=your-production-redis-token

# Optional: Database
DATABASE_URL=postgresql://user:pass@host:5432/legalease_prod

# Optional: Monitoring
SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=your-public-sentry-dsn
```

### Security Considerations

1. **API Keys**
   - Use production API keys
   - Rotate keys regularly
   - Monitor API usage

2. **HTTPS**
   - Always use HTTPS in production
   - Configure proper SSL certificates
   - Set secure headers

3. **Rate Limiting**
   - Implement rate limiting for API endpoints
   - Monitor for abuse
   - Set appropriate limits

4. **Error Handling**
   - Don't expose sensitive information in errors
   - Log errors securely
   - Monitor error rates

## 📊 Monitoring & Analytics

### Health Checks

Create a health check endpoint:

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database connection
    // Check external API availability
    // Check Redis connection
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version,
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: 'Service unavailable' },
      { status: 503 }
    );
  }
}
```

### Monitoring Setup

1. **Uptime Monitoring**
   - Use services like Uptime Robot or Pingdom
   - Monitor `/api/health` endpoint
   - Set up alerts for downtime

2. **Performance Monitoring**
   - Use Vercel Analytics or Google Analytics
   - Monitor Core Web Vitals
   - Track user interactions

3. **Error Tracking**
   - Integrate Sentry for error tracking
   - Monitor API error rates
   - Set up error alerts

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          NEXT_PUBLIC_ONCHAINKIT_API_KEY: ${{ secrets.NEXT_PUBLIC_ONCHAINKIT_API_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check Node.js version
   node --version  # Should be 18+
   
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **API Key Issues**
   ```bash
   # Verify environment variables
   echo $OPENAI_API_KEY
   echo $NEXT_PUBLIC_ONCHAINKIT_API_KEY
   
   # Test API connectivity
   curl -H "Authorization: Bearer $OPENAI_API_KEY" \
        https://api.openai.com/v1/models
   ```

3. **Memory Issues**
   ```bash
   # Increase Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

### Performance Optimization

1. **Caching**
   - Enable Redis caching
   - Use CDN for static assets
   - Implement API response caching

2. **Bundle Optimization**
   - Analyze bundle size: `npm run analyze`
   - Use dynamic imports for large components
   - Optimize images and assets

3. **Database Optimization**
   - Use connection pooling
   - Implement query optimization
   - Add appropriate indexes

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review logs for error messages
3. Create an issue on GitHub
4. Contact support team

---

**Happy Deploying! 🚀**
