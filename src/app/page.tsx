'use client';

import { Hero } from '@/components/Hero/Hero';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Project } from '@/types';
import { listenToFeaturedProjects } from '@/services/projectService';
import { DeveloperBadge } from '@/components/Developer/DeveloperBadge';

export default function Home() {
  // State for featured projects
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState({
    featured: false,
    about: false,
    cta: false
  });

  // Create placeholder projects to ensure we always have 3 items
  const placeholderProjects: Project[] = [
    {
      id: 'placeholder-1',
      title: 'App Coming Soon',
      slug: 'app-coming-soon-1',
      description: 'A new exciting application is being prepared for you.',
      image: '/project-placeholder.jpg',
      category: 'Coming Soon',
      technologies: ['New', 'Upcoming', 'Featured'],
      createdAt: new Date().toISOString(),
      featured: true,
      developerId: ''
    },
    {
      id: 'placeholder-2',
      title: 'App Coming Soon',
      slug: 'app-coming-soon-2',
      description: 'A new exciting application is being prepared for you.',
      image: '/project-placeholder.jpg',
      category: 'Coming Soon',
      technologies: ['New', 'Upcoming', 'Featured'],
      createdAt: new Date().toISOString(),
      featured: true,
      developerId: ''
    },
    {
      id: 'placeholder-3',
      title: 'App Coming Soon',
      slug: 'app-coming-soon-3',
      description: 'A new exciting application is being prepared for you.',
      image: '/project-placeholder.jpg',
      category: 'Coming Soon',
      technologies: ['New', 'Upcoming', 'Featured'],
      createdAt: new Date().toISOString(),
      featured: true,
      developerId: ''
    }
  ];

  // Fetch featured projects with real-time updates
  useEffect(() => {
    // Set up real-time listener for featured projects
    const unsubscribe = listenToFeaturedProjects(3, (projects) => {
      // If we have fewer than 3 projects, fill with placeholders
      if (projects.length < 3) {
        const neededPlaceholders = 3 - projects.length;
        const fillerProjects = placeholderProjects.slice(0, neededPlaceholders);
        setFeaturedProjects([...projects, ...fillerProjects]);
      } else {
        setFeaturedProjects(projects);
      }
      setLoading(false);
    });

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Check if sections are in viewport
      const featuredSection = document.getElementById('featured-section');
      const aboutSection = document.getElementById('about-section');
      const ctaSection = document.getElementById('cta-section');
      
      if (featuredSection && scrollY > featuredSection.offsetTop - windowHeight + 200) {
        setIsVisible(prev => ({ ...prev, featured: true }));
      }
      
      if (aboutSection && scrollY > aboutSection.offsetTop - windowHeight + 200) {
        setIsVisible(prev => ({ ...prev, about: true }));
      }
      
      if (ctaSection && scrollY > ctaSection.offsetTop - windowHeight + 200) {
        setIsVisible(prev => ({ ...prev, cta: true }));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <main className="overflow-hidden">
      <Hero />
      
      {/* Featured Apps Section */}
      <section id="featured-section" className="mobile-py bg-light relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-primary rounded-full opacity-5 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-primary rounded-full opacity-5 translate-y-1/4 -translate-x-1/4"></div>
        <div className="absolute inset-0 pattern-bg"></div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.featured ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Featured Apps</h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              Check out our top-rated applications. These apps deliver exceptional user experiences and functionality.
            </p>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4 sm:px-6 lg:px-0 mb-8 md:mb-12">
              {featuredProjects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  className="card group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible.featured ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {/* Project Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={project.image || '/project-placeholder.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs">
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-dark">{project.title}</h3>
                    
                    {/* Add Developer Badge */}
                    {project.developerId && !project.id.includes('placeholder') && (
                      <div className="mb-3">
                        <DeveloperBadge developerId={project.developerId} size="small" />
                      </div>
                    )}
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">{project.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                      {project.technologies?.slice(0, 3).map((tech, i) => (
                        <span 
                          key={i} 
                          className="bg-primary-light text-primary text-xs px-2 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex justify-between items-center">
                      <Link 
                        href={project.id.includes('placeholder') ? '#' : `/projects/${project.slug}`} 
                        className="text-primary font-medium hover:underline text-sm sm:text-base"
                      >
                        View Details
                      </Link>
                      
                      {project.demoUrl && !project.id.includes('placeholder') && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-primary text-xs sm:text-sm py-1 px-3"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <motion.div 
            className="text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.featured ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link 
              href="/projects" 
              className="btn-primary py-2 sm:py-3 px-6 sm:px-8 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
            >
              View All Apps
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about-section" className="mobile-py bg-white relative">
        {/* Decorative pattern */}
        <div className="absolute inset-0 dots-bg"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6 lg:px-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible.about ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">About Nav Store</h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Nav Store is your destination for discovering high-quality mobile and web applications. 
                We curate the best apps to help you find exactly what you need.
              </p>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Whether you're looking for productivity tools, entertainment, or specialized software, 
                our store provides a seamless experience for browsing, comparing, and downloading apps.
              </p>
              <Link 
                href="#" 
                className="btn-primary inline-block py-2 px-6 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Learn More
              </Link>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible.about ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/about-image.jpg" 
                  alt="About Nav Store" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary rounded-lg opacity-10 hidden sm:block"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Download CTA */}
      <section id="cta-section" className="mobile-py bg-primary relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white opacity-5"></div>
        
        <div className="container mx-auto text-center px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.cta ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">Ready to Download?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
              Browse our collection of apps and find the perfect solutions for your needs. 
              All apps are thoroughly tested for quality and performance.
            </p>
            <Link 
              href="/projects" 
              className="btn bg-white text-primary hover:bg-gray-100 py-2 sm:py-3 px-6 sm:px-8 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
            >
              Explore Apps
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 