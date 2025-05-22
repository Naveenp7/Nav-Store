'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGlobe, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Developer } from '@/types';

interface DeveloperCardProps {
  developer: Developer;
}

export const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Developer Avatar */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
            {developer.avatar ? (
              <Image
                src={developer.avatar}
                alt={developer.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary-light flex items-center justify-center text-primary text-2xl font-bold">
                {developer.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          {/* Developer Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{developer.name}</h2>
            <p className="text-gray-600 mb-4">{developer.bio}</p>
            
            {/* Skills */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {developer.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-primary-light text-primary px-2 py-1 rounded-md text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3 justify-center sm:justify-start">
              {developer.website && (
                <a 
                  href={developer.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors"
                  aria-label="Website"
                >
                  <FaGlobe size={20} />
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
                  <FaGithub size={20} />
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
                  <FaLinkedin size={20} />
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
                  <FaTwitter size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* View Profile Link */}
        <div className="mt-6 text-center sm:text-right">
          <Link 
            href={`/developers/${developer.slug}`} 
            className="text-primary hover:underline font-medium"
          >
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  );
}; 