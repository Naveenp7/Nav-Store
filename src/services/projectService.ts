import { db } from '@/utils/firebase';
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Project } from '@/types';

// Get all projects
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const projectsCollection = collection(db, 'projects');
    const projectSnapshot = await getDocs(projectsCollection);
    
    return projectSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        image: data.image,
        category: data.category,
        technologies: data.technologies,
        demoUrl: data.demoUrl,
        githubUrl: data.githubUrl,
        features: data.features,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        featured: data.featured,
        averageRating: data.averageRating,
        totalRatings: data.totalRatings,
        developerId: data.developerId || ''
      } as Project;
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Get featured projects
export const getFeaturedProjects = async (featuredCount: number = 3): Promise<Project[]> => {
  try {
    const projectsCollection = collection(db, 'projects');
    
    // Try with the composite index first
    try {
      const featuredQuery = query(
        projectsCollection,
        where('featured', '==', true),
        orderBy('createdAt', 'desc'),
        limit(featuredCount)
      );
      
      const projectSnapshot = await getDocs(featuredQuery);
      
      return projectSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          slug: data.slug,
          description: data.description,
          image: data.image,
          category: data.category,
          technologies: data.technologies,
          demoUrl: data.demoUrl,
          githubUrl: data.githubUrl,
          features: data.features,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          featured: data.featured,
          averageRating: data.averageRating,
          totalRatings: data.totalRatings,
          developerId: data.developerId || ''
        } as Project;
      });
    } catch (indexError) {
      console.warn('Index error, falling back to simpler query:', indexError);
      
      // Fallback to a simpler query without ordering if index doesn't exist
      const simpleQuery = query(
        projectsCollection,
        where('featured', '==', true),
        limit(featuredCount)
      );
      
      const projectSnapshot = await getDocs(simpleQuery);
      
      return projectSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          slug: data.slug,
          description: data.description,
          image: data.image,
          category: data.category,
          technologies: data.technologies,
          demoUrl: data.demoUrl,
          githubUrl: data.githubUrl,
          features: data.features,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          featured: data.featured,
          averageRating: data.averageRating,
          totalRatings: data.totalRatings,
          developerId: data.developerId || ''
        } as Project;
      });
    }
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
};

// Get related projects based on category
export const getRelatedProjects = async (currentProjectId: string, category: string, count: number = 3): Promise<Project[]> => {
  try {
    const projectsCollection = collection(db, 'projects');
    
    // First try to get projects with the same category
    const categoryQuery = query(
      projectsCollection,
      where('category', '==', category),
      limit(count + 1) // +1 because we'll filter out the current project
    );
    
    const projectSnapshot = await getDocs(categoryQuery);
    
    // Filter out the current project and map to Project objects
    let relatedProjects = projectSnapshot.docs
      .filter(doc => doc.id !== currentProjectId)
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          slug: data.slug,
          description: data.description,
          image: data.image,
          category: data.category,
          technologies: data.technologies,
          demoUrl: data.demoUrl,
          githubUrl: data.githubUrl,
          features: data.features,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          featured: data.featured,
          averageRating: data.averageRating,
          totalRatings: data.totalRatings,
          developerId: data.developerId || ''
        } as Project;
      });
    
    // If we don't have enough projects from the same category, get some from other categories
    if (relatedProjects.length < count) {
      const remainingCount = count - relatedProjects.length;
      const otherCategoryQuery = query(
        projectsCollection,
        where('category', '!=', category),
        limit(remainingCount)
      );
      
      try {
        const otherProjectSnapshot = await getDocs(otherCategoryQuery);
        
        const otherProjects = otherProjectSnapshot.docs
          .filter(doc => doc.id !== currentProjectId)
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              slug: data.slug,
              description: data.description,
              image: data.image,
              category: data.category,
              technologies: data.technologies,
              demoUrl: data.demoUrl,
              githubUrl: data.githubUrl,
              features: data.features,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              featured: data.featured,
              averageRating: data.averageRating,
              totalRatings: data.totalRatings,
              developerId: data.developerId || ''
            } as Project;
          });
        
        relatedProjects = [...relatedProjects, ...otherProjects];
      } catch (error) {
        console.error('Error fetching other category projects:', error);
      }
    }
    
    return relatedProjects.slice(0, count);
  } catch (error) {
    console.error('Error fetching related projects:', error);
    return [];
  }
};

// Listen to featured projects in real-time
export const listenToFeaturedProjects = (
  featuredCount: number = 3,
  callback: (projects: Project[]) => void
) => {
  try {
    const projectsCollection = collection(db, 'projects');
    
    // Try with a simpler query that doesn't require composite index
    const featuredQuery = query(
      projectsCollection,
      where('featured', '==', true),
      limit(featuredCount)
    );
    
    // Set up real-time listener
    const unsubscribe = onSnapshot(
      featuredQuery, 
      (snapshot) => {
        const projects = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            slug: data.slug,
            description: data.description,
            image: data.image,
            category: data.category,
            technologies: data.technologies,
            demoUrl: data.demoUrl,
            githubUrl: data.githubUrl,
            features: data.features,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            featured: data.featured,
            averageRating: data.averageRating,
            totalRatings: data.totalRatings,
            developerId: data.developerId || ''
          } as Project;
        });
        
        // Sort manually since we can't use orderBy in the query
        projects.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        
        callback(projects);
      },
      (error) => {
        console.error('Error in real-time listener:', error);
        // Return empty array on error
        callback([]);
      }
    );
    
    // Return unsubscribe function to clean up listener when component unmounts
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up real-time listener:', error);
    return () => {}; // Return empty function as fallback
  }
};

// Get all projects with real-time updates
export const listenToAllProjects = (
  callback: (projects: Project[]) => void
) => {
  try {
    const projectsCollection = collection(db, 'projects');
    
    // Set up real-time listener
    const unsubscribe = onSnapshot(
      projectsCollection, 
      (snapshot) => {
        const projects = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            slug: data.slug,
            description: data.description,
            image: data.image,
            category: data.category,
            technologies: data.technologies,
            demoUrl: data.demoUrl,
            githubUrl: data.githubUrl,
            features: data.features,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            featured: data.featured,
            averageRating: data.averageRating,
            totalRatings: data.totalRatings,
            developerId: data.developerId || ''
          } as Project;
        });
        
        callback(projects);
      },
      (error) => {
        console.error('Error in real-time listener for all projects:', error);
        callback([]);
      }
    );
    
    // Return unsubscribe function to clean up listener when component unmounts
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up real-time listener for all projects:', error);
    return () => {}; // Return empty function as fallback
  }
};

// Get project by slug
export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const projectsCollection = collection(db, 'projects');
    const projectQuery = query(projectsCollection, where('slug', '==', slug));
    const projectSnapshot = await getDocs(projectQuery);
    
    if (projectSnapshot.empty) {
      return null;
    }
    
    const projectDoc = projectSnapshot.docs[0];
    const data = projectDoc.data();
    
    return {
      id: projectDoc.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      image: data.image,
      category: data.category,
      technologies: data.technologies,
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      features: data.features,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      featured: data.featured,
      averageRating: data.averageRating,
      totalRatings: data.totalRatings,
      developerId: data.developerId || ''
    } as Project;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}; 