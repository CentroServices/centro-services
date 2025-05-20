import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import newsData from '../data/news.json';

const NewsDetailsPage = () => {
  const { id } = useParams();
  const post = newsData.articles[id as keyof typeof newsData.articles];

  if (!post) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
          <Link to="/news" className="text-red-600 hover:text-red-700 mt-4 inline-block">
            Return to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <article className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Breadcrumbs 
              items={[
                { label: 'News', href: '/news' },
                { label: post.title }
              ]} 
            />
          </motion.div>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/news" 
              className="inline-flex items-center text-gray-600 hover:text-red-600 mb-8"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to News
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-6">
              {post.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto mb-12"
          >
            <div className="aspect-video rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-12"
            >
              {/* Social Share Sidebar */}
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-4">
                  <div className="text-gray-600 text-sm font-medium mb-4">
                    <Share2 size={18} className="mb-2" />
                    Share
                  </div>
                  <button className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors">
                    <Facebook size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-red-100 text-red-400 flex items-center justify-center hover:bg-red-200 transition-colors">
                    <Twitter size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center hover:bg-red-200 transition-colors">
                    <Linkedin size={20} />
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="prose prose-lg max-w-none">
                  {post.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Author Box */}
                <div className="mt-12 p-6 bg-red-50 rounded-xl">
                  <div className="flex items-center">
                    <img 
                      src={post.author.image} 
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.author.name}
                      </h3>
                      <p className="text-gray-600">{post.author.role}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Share Buttons */}
                <div className="mt-8 flex justify-center gap-4 lg:hidden">
                  <button className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors">
                    <Facebook size={24} />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-red-100 text-red-400 flex items-center justify-center hover:bg-red-200 transition-colors">
                    <Twitter size={24} />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center hover:bg-red-200 transition-colors">
                    <Linkedin size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetailsPage;