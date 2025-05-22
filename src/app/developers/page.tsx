'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Developer } from '@/types';
import { getAllDevelopers } from '@/services/developerService';
import { DeveloperCard } from '@/components/Developer/DeveloperCard';

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const data = await getAllDevelopers();
        setDevelopers(data);
      } catch (error) {
        console.error('Error fetching developers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 mobile-pt">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Developers</h1>
        <p className="text-gray-600 max-w-2xl">
          Meet the talented developers behind the amazing apps in our store. Each developer brings unique skills and creativity to their projects.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {developers.length > 0 ? (
            developers.map((developer, index) => (
              <motion.div
                key={developer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <DeveloperCard developer={developer} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600">No developers found at the moment.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 