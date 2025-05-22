'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { Project } from '@/types';
import { getAllProjects } from '@/services/projectService';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="relative">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-bg"></div>
      
      <div className="container mx-auto mobile-pt pb-12 md:pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Browse Apps</h1>
          <p className="text-gray-600 max-w-2xl mx-auto px-4 text-sm sm:text-base">
            Explore our collection of high-quality applications. Filter by category to find exactly what you're looking for.
          </p>
        </motion.div>
        
        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-4"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 lg:px-0">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-16 bg-white rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-2">No apps found</h3>
                <p className="text-gray-600 mb-4">There are no apps in this category yet.</p>
                <button 
                  onClick={() => setSelectedCategory('All')} 
                  className="btn-primary py-2 px-6"
                >
                  View All Apps
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 