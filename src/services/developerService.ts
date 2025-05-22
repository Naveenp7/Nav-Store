import { db } from '@/utils/firebase';
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { Developer, Project } from '@/types';

// Get all developers
export const getAllDevelopers = async (): Promise<Developer[]> => {
  try {
    const developersCollection = collection(db, 'developers');
    const developerSnapshot = await getDocs(developersCollection);
    
    return developerSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        slug: data.slug,
        bio: data.bio,
        avatar: data.avatar,
        website: data.website,
        github: data.github,
        linkedin: data.linkedin,
        twitter: data.twitter,
        skills: data.skills,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as Developer;
    });
  } catch (error) {
    console.error('Error fetching developers:', error);
    return [];
  }
};

// Get developer by slug
export const getDeveloperBySlug = async (slug: string): Promise<Developer | null> => {
  try {
    const developersCollection = collection(db, 'developers');
    const developerQuery = query(developersCollection, where('slug', '==', slug));
    const developerSnapshot = await getDocs(developerQuery);
    
    if (developerSnapshot.empty) {
      return null;
    }
    
    const developerDoc = developerSnapshot.docs[0];
    const data = developerDoc.data();
    
    return {
      id: developerDoc.id,
      name: data.name,
      slug: data.slug,
      bio: data.bio,
      avatar: data.avatar,
      website: data.website,
      github: data.github,
      linkedin: data.linkedin,
      twitter: data.twitter,
      skills: data.skills,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    } as Developer;
  } catch (error) {
    console.error('Error fetching developer by slug:', error);
    return null;
  }
};

// Get developer by ID
export const getDeveloperById = async (id: string): Promise<Developer | null> => {
  try {
    const developerRef = doc(db, 'developers', id);
    const developerDoc = await getDoc(developerRef);
    
    if (!developerDoc.exists()) {
      return null;
    }
    
    const data = developerDoc.data();
    
    return {
      id: developerDoc.id,
      name: data.name,
      slug: data.slug,
      bio: data.bio,
      avatar: data.avatar,
      website: data.website,
      github: data.github,
      linkedin: data.linkedin,
      twitter: data.twitter,
      skills: data.skills,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    } as Developer;
  } catch (error) {
    console.error('Error fetching developer by ID:', error);
    return null;
  }
};

// Get projects by developer ID
export const getProjectsByDeveloperId = async (developerId: string): Promise<Project[]> => {
  try {
    const projectsCollection = collection(db, 'projects');
    const projectQuery = query(
      projectsCollection,
      where('developerId', '==', developerId),
      orderBy('createdAt', 'desc')
    );
    
    const projectSnapshot = await getDocs(projectQuery);
    
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
        developerId: data.developerId
      } as Project;
    });
  } catch (error) {
    console.error('Error fetching projects by developer ID:', error);
    return [];
  }
}; 