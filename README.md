# Astro WordPress Headless

A modern blog built with Astro, React, and shadcn/ui that connects to WordPress as a headless CMS via GraphQL.

## Features

- 🚀 **Astro** - Fast static site generation (SSG)
- ⚛️ **React** - Interactive components with shadcn/ui
- 📝 **WordPress GraphQL** - Headless CMS integration
- 🎨 **Tailwind CSS** - Modern styling
- 📱 **Responsive Design** - Mobile-first approach
- 📄 **Single Post Pages** - Individual blog post pages
- ⚡ **Performance** - Pre-generated static pages for optimal speed
- 🔍 **SEO Optimized** - Meta tags and structured content

## Setup

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Configure WordPress GraphQL URL:**
   
   Create a `.env` file in the root directory:
   ```env
   WORDPRESS_GRAPHQL_URL=http://headless-cms.wp.local/graphql
   ```
   
   Or set the environment variable:
   ```bash
   export WORDPRESS_GRAPHQL_URL=http://headless-cms.wp.local/graphql
   ```

3. **Start development server:**
   ```bash
   bun run dev
   ```

4. **Test WordPress connection:**
   
   Visit `/debug` to test the GraphQL connection.

## Pages

- `/` - Main posts page with WordPress integration
- `/post/[slug]` - Individual blog post pages (dynamically generated)
- `/debug` - WordPress GraphQL connection test
- `/markdown-page` - Example markdown page

## WordPress Requirements

Make sure your WordPress site has:
- GraphQL plugin installed and activated
- CORS headers configured for your Astro domain
- Posts published and accessible via GraphQL

## Development

This project uses:
- **Bun** as the package manager
- **Astro** for static site generation with SSG
- **React** for interactive components
- **shadcn/ui** for UI components
- **Tailwind CSS** for styling
- **GraphQL** for WordPress data fetching

## Build

To build the static site:

```bash
bun run build
```

This will:
1. Fetch all posts from WordPress at build time
2. Generate static pages for each post
3. Create optimized static assets
4. Output to the `dist/` directory

## Deployment

The built site can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- etc.
