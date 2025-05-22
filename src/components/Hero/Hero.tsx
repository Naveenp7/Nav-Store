'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Project } from '@/types';
import { listenToFeaturedProjects } from '@/services/projectService';

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [featuredApp, setFeaturedApp] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Create a placeholder featured app
  const placeholderApp: Project = {
    id: 'featured-placeholder',
    title: 'Featured App Coming Soon',
    slug: 'featured-app-coming-soon',
    description: 'A new exciting featured application is being prepared for you.',
    image: '/project-placeholder.jpg',
    category: 'Featured',
    technologies: ['New', 'Featured', 'Upcoming'],
    createdAt: new Date().toISOString(),
    featured: true
  };

  // Set up real-time listener for featured app
  useEffect(() => {
    const unsubscribe = listenToFeaturedProjects(1, (projects) => {
      if (projects.length > 0) {
        setFeaturedApp(projects[0]);
      } else {
        // Use placeholder if no featured app is available
        setFeaturedApp(placeholderApp);
      }
      setLoading(false);
    });

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-light z-0">
        {/* Mobile background pattern */}
        <div className="absolute inset-0 pattern-bg"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 pt-16 md:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            {/* Featured App Recommendation */}
            {!loading && featuredApp && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-5 bg-white rounded-lg shadow-md p-3 border-l-4 border-primary flex items-center"
              >
                <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                  <img 
                    src={featuredApp.image || '/project-placeholder.jpg'} 
                    alt={featuredApp.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-dark text-base sm:text-lg">{featuredApp.title}</h3>
                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full font-medium">Featured</span>
                  </div>
                  <Link 
                    href={featuredApp.id === 'featured-placeholder' ? '#' : `/projects/${featuredApp.slug}`}
                    className="text-primary text-sm sm:text-base font-medium hover:underline"
                  >
                    Get it now
                  </Link>
                </div>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mb-3 px-4 py-1 bg-primary-light text-primary rounded-full text-sm font-medium"
            >
              App Store Platform
            </motion.div>
            
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="block text-primary"
              >
                Discover
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Amazing Apps
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-8 text-base sm:text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0"
            >
              Your one-stop destination for high-quality mobile and web applications. Find the perfect apps for your needs.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link href="/projects" className="btn-primary text-center py-3 px-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                Browse Apps
              </Link>
              <Link href="#" className="btn border border-primary text-primary hover:bg-primary-light text-center py-3 px-6 transform hover:-translate-y-1 transition-all">
                Popular Categories
              </Link>
            </motion.div>
          </motion.div>

          {/* Image - Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <img
              src="/hero-image.svg"
              alt="App Store"
              className="w-full h-auto max-w-md mx-auto animate-float"
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile image (shown only on mobile) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-0 right-0 w-64 h-64 md:hidden z-0"
      >
        <img
          src="/hero-image.svg"
          alt="App Store"
          className="w-full h-full object-contain animate-float"
        />
      </motion.div>

      {/* Mobile floating elements */}
      {isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -50, y: -20 }}
            animate={{ opacity: 0.5, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-20 left-5 w-12 h-12 rounded-full bg-primary opacity-20 z-0"
          />
          <motion.div
            initial={{ opacity: 0, x: 30, y: 50 }}
            animate={{ opacity: 0.4, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute top-32 right-10 w-8 h-8 rounded-full bg-secondary opacity-20 z-0"
          />
          <motion.div
            initial={{ opacity: 0, x: -20, y: 30 }}
            animate={{ opacity: 0.3, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="absolute bottom-40 left-10 w-10 h-10 rounded-lg bg-primary opacity-20 z-0"
          />
        </>
      )}

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-light to-transparent z-0"></div>
    </section>
  );
}; 