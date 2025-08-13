// Environment configuration
export const config = {
  wordpress: {
    graphqlUrl: import.meta.env.WORDPRESS_GRAPHQL_URL || 'http://localhost:8881/graphql',
  },
  app: {
    name: 'Astro WordPress Headless',
    description: 'A modern blog powered by Astro and WordPress',
  },
};
