import { GraphQLClient } from 'graphql-request';
import { config } from './config';

// Create GraphQL client
export const wpClient = new GraphQLClient(config.wordpress.graphqlUrl);

// WordPress Post type
export interface WordPressPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  date?: string;
  modified?: string;
  author?: {
    node: {
      name: string;
    };
  };
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

// GraphQL query for posts with pagination
export const GET_POSTS_QUERY = `
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        slug
        title
        content
        excerpt
        date
        modified
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// GraphQL query for all post slugs (for SSG)
export const GET_ALL_POST_SLUGS_QUERY = `
  query GetAllPostSlugs($first: Int = 1000) {
    posts(first: $first) {
      nodes {
        slug
      }
    }
  }
`;

// GraphQL query for single post
export const GET_SINGLE_POST_QUERY = `
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      excerpt
      date
      modified
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// Function to fetch posts
export async function fetchPosts(first: number = 10, after?: string) {
  try {
    const variables = { first, after };
    const data = await wpClient.request(GET_POSTS_QUERY, variables) as {
      posts: {
        nodes: WordPressPost[];
        pageInfo: {
          hasNextPage: boolean;
          endCursor: string;
        };
      };
    };
    return data.posts;
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to WordPress. Please check if the WordPress site is running and accessible.');
      }
      if (error.message.includes('GraphQL')) {
        throw new Error('GraphQL query failed. Please check if the WordPress GraphQL endpoint is working correctly.');
      }
    }
    
    throw new Error('Failed to fetch posts from WordPress.');
  }
}

// Function to fetch all post slugs for SSG
export async function fetchAllPostSlugs() {
  try {
    const data = await wpClient.request(GET_ALL_POST_SLUGS_QUERY, { first: 1000 }) as {
      posts: {
        nodes: Array<{ slug: string }>;
      };
    };
    return data.posts.nodes.map((post) => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    throw new Error('Failed to fetch post slugs from WordPress.');
  }
}

// Function to fetch single post
export async function fetchSinglePost(slug: string) {
  try {
    const data = await wpClient.request(GET_SINGLE_POST_QUERY, { slug }) as {
      post: WordPressPost;
    };
    return data.post;
  } catch (error) {
    console.error('Error fetching single post:', error);
    throw new Error(`Failed to fetch post "${slug}" from WordPress.`);
  }
}

// Function to strip HTML tags from content
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Function to format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Test connection function
export async function testConnection() {
  try {
    const query = `
      query TestQuery {
        posts(first: 1) {
          nodes {
            id
            title
          }
        }
      }
    `;
    const data = await wpClient.request(query);
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
