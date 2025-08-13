import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import { stripHtml, formatDate, type WordPressPost } from '../lib/wordpress';

interface PostsPageProps {
  posts: WordPressPost[];
}

export default function PostsPage({ posts }: PostsPageProps) {

  // Calculate read time based on content length
  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const wordCount = stripHtml(content).split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog Posts
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover insights, tutorials, and guides from our WordPress-powered blog.
            </p>
          </div>
        </div>
      </header>

      {/* Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {post.categories?.nodes[0]?.name || 'Uncategorized'}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {calculateReadTime(post.content)}
                    </div>
                  </div>
                                  <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                  <a href={`/post/${post.slug}`} className="block">
                    {post.title}
                  </a>
                </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt ? stripHtml(post.excerpt) : stripHtml(post.content).substring(0, 150) + '...'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author?.node?.name || 'Unknown Author'}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date ? formatDate(post.date) : 'No date'}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`/post/${post.slug}`}>
                      Read More
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Show total posts count */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Showing {posts.length} posts
          </p>
        </div>
      </main>
    </div>
  );
}
