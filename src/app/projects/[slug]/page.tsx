'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project, Developer } from '@/types';
import { getProjectBySlug, getRelatedProjects } from '@/services/projectService';
import { getDeveloperById } from '@/services/developerService';
import { StarRating } from '@/components/Rating/StarRating';
import { RatingSummary } from '@/components/Rating/RatingSummary';
import { CommentForm } from '@/components/Comments/CommentForm';
import { CommentList } from '@/components/Comments/CommentList';
import { DeveloperCard } from '@/components/Developer/DeveloperCard';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/Auth/AuthModal';
import { DeveloperBadge } from '@/components/Developer/DeveloperBadge';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const foundProject = await getProjectBySlug(params.slug);
        
        if (foundProject) {
          setProject(foundProject);
          
          // Fetch developer information
          if (foundProject.developerId) {
            const developerData = await getDeveloperById(foundProject.developerId);
            setDeveloper(developerData);
          }
          
          // Fetch related projects
          const related = await getRelatedProjects(foundProject.id, foundProject.category);
          setRelatedProjects(related);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  // Show 404 if project not found
  if (!loading && !project) {
    notFound();
  }

  if (loading || !project) {
    return (
      <div className="container mx-auto px-4 mobile-pt">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-bg"></div>
      
      <div className="container mx-auto mobile-pt pb-12 md:pb-24 relative z-10">
        {/* Back button */}
        <Link 
          href="/projects" 
          className="inline-flex items-center text-primary hover:underline mb-6 md:mb-8 px-4 sm:px-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Apps
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 px-4 sm:px-0">
          {/* Left column - App info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                  {project.category}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                  Released: {new Date(project.createdAt).toLocaleDateString()}
                </span>
                {project.updatedAt && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                    Updated: {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              {/* Rating display */}
              {project.averageRating !== undefined && (
                <div className="flex items-center">
                  <StarRating 
                    initialRating={project.averageRating} 
                    readOnly 
                    size={20} 
                  />
                  <span className="ml-2 text-gray-700">
                    {project.averageRating.toFixed(1)} ({project.totalRatings} {project.totalRatings === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}
            </div>

            {/* App image */}
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-6 md:mb-8">
              <Image
                src={project.image || '/project-placeholder.jpg'}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>

            {/* App description */}
            <div className="prose max-w-none mb-8 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">About the App</h2>
              <p className="text-gray-700 mb-6 text-sm sm:text-base md:text-lg">{project.description}</p>
              
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">Key Features</h2>
              <ul className="list-disc pl-5 space-y-1 sm:space-y-2 mb-6 text-sm sm:text-base">
                {project.features?.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
            
            {/* Developer Information */}
            {developer && (
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Developer</h2>
                <DeveloperCard developer={developer} />
              </div>
            )}
            
            {/* Ratings and Reviews Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Ratings & Reviews</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Rating Summary */}
                <div className="md:col-span-1">
                  <RatingSummary 
                    averageRating={project.averageRating || 0} 
                    totalRatings={project.totalRatings || 0} 
                  />
                </div>
                
                {/* Comment Form */}
                <div className="md:col-span-2">
                  {user ? (
                    <CommentForm 
                      projectId={project.id} 
                      onCommentAdded={() => {
                        // The real-time listener will update the comments
                      }} 
                    />
                  ) : (
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                      <h3 className="text-lg font-bold mb-3">Leave a Review</h3>
                      <p className="text-gray-600 mb-4">Sign in to leave a review for this app.</p>
                      <button
                        className="btn-primary w-full py-2 px-4 rounded-md"
                        onClick={() => setIsAuthModalOpen(true)}
                      >
                        Sign In to Review
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Comments List */}
              <div>
                <h3 className="text-lg font-bold mb-4">User Reviews</h3>
                <CommentList projectId={project.id} />
              </div>
            </div>
          </motion.div>

          {/* Right column - App details */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card sticky top-20 md:top-24">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-primary">App Details</h2>
                
                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 sm:mb-3 text-gray-700 text-sm sm:text-base">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-primary-light text-primary px-2 py-1 rounded-md text-xs sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Links */}
                <div className="space-y-3 sm:space-y-4">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex justify-center items-center py-2 sm:py-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download App
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex justify-center items-center py-2 sm:py-3"
                    >
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      View Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Similar Apps */}
        <div className="mt-12 md:mt-16 px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 md:mb-8">Similar Apps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {relatedProjects.length > 0 ? (
              relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Link 
                    href={`/projects/${relatedProject.slug}`}
                    className="card group block h-full"
                  >
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <Image
                        src={relatedProject.image || '/project-placeholder.jpg'}
                        alt={relatedProject.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                      <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs">
                        {relatedProject.category}
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-dark">{relatedProject.title}</h3>
                      
                      {/* Add Developer Badge */}
                      {relatedProject.developerId && (
                        <div className="mb-3">
                          <DeveloperBadge developerId={relatedProject.developerId} size="small" />
                        </div>
                      )}
                      
                      <p className="text-gray-600 line-clamp-2 text-sm sm:text-base">{relatedProject.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 bg-white rounded-xl">
                <p className="text-gray-600">No similar apps found at the moment.</p>
                <Link href="/projects" className="text-primary font-medium hover:underline mt-2 inline-block">
                  Browse all apps
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
} 