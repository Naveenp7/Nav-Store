import { Project } from '../../data/projects';
import { motion } from 'framer-motion';
import ImageGallery from 'react-image-gallery';
import { FaGithub, FaGlobe, FaDownload, FaPlayCircle, FaApple } from 'react-icons/fa';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  const images = project.screenshots.map(screenshot => ({
    original: screenshot,
    thumbnail: screenshot,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-primary-light rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-primary-light z-10">
          <div className="flex items-center">
            {project.icon && (
              <img 
                src={project.icon} 
                alt={`${project.name} icon`} 
                className="w-12 h-12 rounded-xl mr-4"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-secondary">{project.name}</h2>
              <p className="text-light/70">{project.tagline}</p>
            </div>
          </div>
          <button 
            className="text-light/50 hover:text-light p-2 rounded-full hover:bg-primary transition-colors"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Screenshots Gallery */}
          {project.screenshots.length > 0 && (
            <div className="mb-8">
              <ImageGallery 
                items={images}
                showPlayButton={false}
                showFullscreenButton={true}
                showThumbnails={true}
                showNav={true}
              />
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-secondary mb-4">About</h3>
            <p className="text-light/80">{project.description}</p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-secondary mb-4">Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="text-light/80">{feature}</li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-secondary mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="bg-primary px-3 py-1 rounded-md text-secondary-light"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4">Project Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-light/60">Type:</span>
                  <span className="text-light capitalize">{project.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light/60">Status:</span>
                  <span className="text-light capitalize">{project.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light/60">Created:</span>
                  <span className="text-light">{new Date(project.dateCreated).toLocaleDateString()}</span>
                </div>
                {project.version && (
                  <div className="flex justify-between">
                    <span className="text-light/60">Version:</span>
                    <span className="text-light">{project.version}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-light/60">Complexity:</span>
                  <span className="text-light capitalize">{project.complexity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold text-secondary mb-4">Links</h3>
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <FaGithub /> GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <FaGlobe /> Live Demo
                </a>
              )}
              {project.downloadUrls?.playStore && (
                <a 
                  href={project.downloadUrls.playStore} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                >
                  <FaPlayCircle /> Google Play
                </a>
              )}
              {project.downloadUrls?.appStore && (
                <a 
                  href={project.downloadUrls.appStore} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2"
                >
                  <FaApple /> App Store
                </a>
              )}
              {project.downloadUrls?.apk && (
                <a 
                  href={project.downloadUrls.apk} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn bg-primary-light text-white hover:bg-primary flex items-center gap-2"
                >
                  <FaDownload /> Download APK
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}; 