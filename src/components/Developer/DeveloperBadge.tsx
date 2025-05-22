'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getDeveloperById } from '@/services/developerService';
import { Developer } from '@/types';

interface DeveloperBadgeProps {
  developerId: string;
  size?: 'small' | 'medium' | 'large';
}

export const DeveloperBadge = ({ developerId, size = 'small' }: DeveloperBadgeProps) => {
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        if (!developerId) {
          setLoading(false);
          return;
        }
        
        const developerData = await getDeveloperById(developerId);
        setDeveloper(developerData);
      } catch (error) {
        console.error('Error fetching developer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [developerId]);

  if (loading) {
    return (
      <div className="flex items-center">
        <div className="animate-pulse bg-gray-200 rounded-full h-6 w-6"></div>
        <div className="animate-pulse bg-gray-200 h-4 w-24 ml-2 rounded"></div>
      </div>
    );
  }

  if (!developer) {
    return null;
  }

  // Size classes
  const avatarSizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-10 h-10'
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  return (
    <Link 
      href={`/developers/${developer.slug}`} 
      className="flex items-center group"
    >
      {/* Developer Avatar */}
      <div className={`relative ${avatarSizeClasses[size]} rounded-full overflow-hidden mr-2 border border-gray-200`}>
        {developer.avatar ? (
          <Image
            src={developer.avatar}
            alt={developer.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary-light flex items-center justify-center text-primary font-bold">
            {developer.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      {/* Developer Name */}
      <span className={`${textSizeClasses[size]} text-gray-600 group-hover:text-primary transition-colors`}>
        {developer.name}
      </span>
    </Link>
  );
}; 