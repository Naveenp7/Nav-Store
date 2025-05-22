import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { DeveloperBadge } from '@/components/Developer/DeveloperBadge';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group"
    >
      {/* Project Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={project.image || '/project-placeholder.jpg'}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading={index < 6 ? "eager" : "lazy"}
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
        
        {/* Developer Badge */}
        {project.developerId && (
          <div className="mb-3">
            <DeveloperBadge developerId={project.developerId} size="small" />
          </div>
        )}
        
        <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base">{project.description}</p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
          {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
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
            href={`/projects/${project.slug}`} 
            className="text-primary font-medium hover:underline text-sm sm:text-base"
          >
            View Details
          </Link>
          
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary text-xs sm:text-sm py-1 px-2 sm:px-3"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}; 