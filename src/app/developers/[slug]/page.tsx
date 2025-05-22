'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGlobe, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Developer, Project } from '@/types';
import { getDeveloperBySlug, getProjectsByDeveloperId } from '@/services/developerService';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';

export default function DeveloperProfilePage({ params }: { params: { slug: string } }) {
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloperAndProjects = async () => {
      try {
        const developerData = await getDeveloperBySlug(params.slug);
        
        if (developerData) {
          setDeveloper(developerData);
          
          // Fetch developer's projects
          const developerProjects = await getProjectsByDeveloperId(developerData.id);
          setProjects(developerProjects);
        }
      } catch (error) {
        console.error('Error fetching developer profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloperAndProjects();
  }, [params.slug]);

  // Show 404 if developer not found
  if (!loading && !developer) {
    notFound();
  }

  if (loading || !developer) {
    return (
      <div className="container mx-auto px-4 mobile-pt">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 mobile-pt">
      {/* Back button */}
      <Link 
        href="/developers" 
        className="inline-flex items-center text-primary hover:underline mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Developers
      </Link>
      
      {/* Developer Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden mb-10"
      >
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Developer Avatar */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
              {developer.avatar ? (
                <Image
                  src={developer.avatar}
                  alt={developer.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-primary-light flex items-center justify-center text-primary text-4xl font-bold">
                  {developer.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            {/* Developer Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{developer.name}</h1>
              <p className="text-gray-600 text-lg mb-6">{developer.bio}</p>
              
              {/* Skills */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {developer.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-primary-light text-primary px-3 py-1 rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4 justify-center md:justify-start">
                {developer.website && (
                  <a 
                    href={developer.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors"
                    aria-label="Website"
                  >
                    <FaGlobe size={24} />
                  </a>
                )}
                
                {developer.github && (
                  <a 
                    href={developer.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub size={24} />
                  </a>
                )}
                
                {developer.linkedin && (
                  <a 
                    href={developer.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
                
                {developer.twitter && (
                  <a 
                    href={developer.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <FaTwitter size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Developer's Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Apps by {developer.name}</h2>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <p className="text-gray-600">This developer hasn't published any apps yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
} 