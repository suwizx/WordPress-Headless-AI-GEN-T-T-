import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { formatDate, stripHtml, type WordPressPost } from '../lib/wordpress';

interface SinglePostProps {
  post: WordPressPost;
}

export default function SinglePost({ post }: SinglePostProps) {
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
        </div>
      </header>

      {/* Post Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="mb-8">
          <CardHeader>
            {/* Categories */}
            {post.categories?.nodes && post.categories.nodes.length > 0 && (
              <div className="mb-4">
                {post.categories.nodes.map((category) => (
                  <span
                    key={category.slug}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </CardTitle>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author?.node?.name || 'Unknown Author'}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {post.date ? formatDate(post.date) : 'No date'}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {calculateReadTime(post.content)}
              </div>
            </div>
          </CardHeader>

          {/* Featured Image */}
          {post.featuredImage?.node && (
            <div className="px-6 pb-6">
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <CardContent>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        {/* Back to posts button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Posts
          </Button>
        </div>
      </main>
    </div>
  );
}
