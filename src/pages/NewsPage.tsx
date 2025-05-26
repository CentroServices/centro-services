import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import newsData from '../data/news.json';

const NewsPage = () => {
  const allPosts = Object.values(newsData.articles);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3;
  
  // Debug logging
  useEffect(() => {
    console.log("News data loaded:", allPosts);
    console.log("Current page:", currentPage);
    console.log("Is expanded:", isExpanded);
  }, [allPosts, currentPage, isExpanded]);
  
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  
  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setVisiblePosts(allPosts.length);
      setIsExpanded(true);
      setIsLoading(false);
    }, 800); // 800ms delay for loading effect
  };
  
  const handlePageClick = (pageIndex: number) => {
    if (pageIndex !== currentPage) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsLoading(false);
      }, 500);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsLoading(false);
      }, 500);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsLoading(false);
      }, 500);
    }
  };
  
  // Get current posts based on pagination
  const getCurrentPosts = () => {
    if (isExpanded) {
      return allPosts;
    } else {
      const startIndex = currentPage * postsPerPage;
      return allPosts.slice(startIndex, startIndex + postsPerPage);
    }
  };
  
  const currentPosts = getCurrentPosts();

  // Fallback if no posts are available
  if (allPosts.length === 0) {
    return (
      <div className="pt-20">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">News & Insights</h1>
            <p className="text-xl text-gray-600">No news articles available at the moment. Please check back later.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: 'News' }]} />
          </div>

          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest News & Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest telecommunications industry news, insights, and updates from Centro Service.
            </p>
          </motion.div>

          {/* Always render the grid, even if empty */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <Link to={`/news/${post.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar size={16} className="mr-2" />
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <Clock size={16} className="mr-2" />
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center text-red-600 group-hover:text-red-700 font-medium">
                      Read More
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {!isExpanded && allPosts.length > 0 && (
            <div className="mt-12 flex flex-col items-center">
              {/* Pagination Controls */}
              <div className="flex items-center justify-center space-x-2 mb-8">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 0 || isLoading}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    currentPage === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageClick(index)}
                      disabled={isLoading}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        currentPage === index
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                      }`}
                      aria-label={`Page ${index + 1}`}
                      aria-current={currentPage === index ? 'page' : undefined}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1 || isLoading}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    currentPage === totalPages - 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              
              {/* Load More Button */}
              <button 
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'View All Articles'
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;