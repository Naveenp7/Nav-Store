// Firebase seed script
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, addDoc, serverTimestamp, deleteDoc, getDocs } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_t1j461ArBZIAyoXxhjfrAU2-kXc_Io0",
  authDomain: "nav-store-69fdb.firebaseapp.com",
  projectId: "nav-store-69fdb",
  storageBucket: "nav-store-69fdb.appspot.com",
  messagingSenderId: "186908465473",
  appId: "1:186908465473:web:917d8bab5e217af7c3a9c0",
  measurementId: "G-ZH4B8NKSX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample developers data
const developers = [
  {
    id: 'dev1',
    name: 'Alex Morgan',
    slug: 'alex-morgan',
    bio: 'Full-stack developer with over 8 years of experience specializing in mobile app development and cloud solutions.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    website: 'https://alexmorgan.dev',
    github: 'https://github.com/alexmorgan',
    linkedin: 'https://linkedin.com/in/alexmorgan',
    twitter: 'https://twitter.com/alexmorgan',
    skills: ['React Native', 'Firebase', 'Node.js', 'Swift', 'Kotlin'],
    createdAt: new Date('2022-05-10').toISOString(),
    updatedAt: new Date('2023-11-15').toISOString()
  },
  {
    id: 'dev2',
    name: 'Priya Patel',
    slug: 'priya-patel',
    bio: 'Web developer and UI/UX designer focused on creating beautiful, functional, and accessible web applications.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    website: 'https://priyapatel.design',
    github: 'https://github.com/priyapatel',
    linkedin: 'https://linkedin.com/in/priyapatel',
    twitter: null,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Next.js'],
    createdAt: new Date('2022-08-15').toISOString(),
    updatedAt: new Date('2023-10-20').toISOString()
  },
  {
    id: 'dev3',
    name: 'Marcus Chen',
    slug: 'marcus-chen',
    bio: 'Backend developer specializing in scalable architectures, database optimization, and API development.',
    avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
    website: null,
    github: 'https://github.com/marcuschen',
    linkedin: 'https://linkedin.com/in/marcuschen',
    twitter: 'https://twitter.com/marcuschen',
    skills: ['Node.js', 'MongoDB', 'Express', 'GraphQL', 'AWS'],
    createdAt: new Date('2023-01-05').toISOString(),
    updatedAt: null
  },
  {
    id: 'dev4',
    name: 'Naveen Panekkatt',
    slug: 'naveen-panekkatt',
    bio: 'Full-stack developer with over 2 years of experience specializing in mobile app development, Data science, AI and cloud solutions.',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    website: 'https://naveenpanekkatt.dev',
    github: 'https://github.com/naveenpanekkatt',
    linkedin: 'https://linkedin.com/in/naveenpanekkatt',
    twitter: 'https://twitter.com/naveenpanekkatt',
    skills: ['html', 'Firebase', 'Node.js', 'Python', 'Kotlin'],
    createdAt: new Date('2022-01-15').toISOString(),
    updatedAt: new Date('2023-12-10').toISOString()
  }
];

// Sample project data
const projects = [
  {
    id: '1',
    title: 'MadMuscles Fitness App',
    slug: 'mad-muscles-fitness-app',
    description: 'A comprehensive fitness application that provides personalized workout plans, nutrition tracking, and progress monitoring.',
    image: '/projects/madmuscles.jpg',
    category: 'Mobile App',
    technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    demoUrl: 'https://madmuscles.app',
    githubUrl: 'https://github.com/username/madmuscles',
    features: [
      'Personalized workout plans',
      'Nutrition tracking',
      'Progress monitoring',
      'Exercise library with video tutorials',
      'Community challenges'
    ],
    createdAt: new Date('2023-05-15').toISOString(),
    updatedAt: new Date('2023-11-20').toISOString(),
    featured: true,
    averageRating: 4.7,
    totalRatings: 12,
    developerId: 'dev4'
  },
  {
    id: '2',
    title: 'Panekkatt Oil Mill Money Tracker',
    slug: 'panekkatt-oil-mill-money-tracker',
    description: 'A financial management system for tracking expenses, revenue, and inventory for an oil mill business.',
    image: '/projects/panekkatt.jpg',
    category: 'Web App',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Chart.js'],
    demoUrl: 'https://panekkatt.com',
    githubUrl: 'https://github.com/username/panekkatt',
    features: [
      'Financial dashboard',
      'Expense tracking',
      'Revenue management',
      'Inventory control',
      'Report generation'
    ],
    createdAt: new Date('2022-08-10').toISOString(),
    updatedAt: new Date('2023-10-05').toISOString(),
    featured: true,
    averageRating: 4.2,
    totalRatings: 8,
    developerId: 'dev4'
  },
  {
    id: '3',
    title: 'Nav Store',
    slug: 'nav-store',
    description: 'A project showcase webapp that displays personal projects including mobile apps and web applications.',
    image: '/projects/navstore.jpg',
    category: 'Portfolio',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    demoUrl: 'https://nav-store.vercel.app',
    githubUrl: 'https://github.com/username/nav-store',
    features: [
      'Project showcase',
      'Responsive design',
      'Dark/light mode',
      'Project filtering',
      'Project details page'
    ],
    createdAt: new Date('2023-12-01').toISOString(),
    featured: true,
    averageRating: 4.9,
    totalRatings: 15,
    developerId: 'dev4'
  },
  {
    id: '4',
    title: 'Weather Forecast App',
    slug: 'weather-forecast-app',
    description: 'A weather application that provides accurate forecasts, real-time updates, and location-based weather information.',
    image: '/projects/weather.jpg',
    category: 'Web App',
    technologies: ['Vue.js', 'Axios', 'OpenWeatherMap API', 'Tailwind CSS'],
    demoUrl: 'https://weather-app.demo.com',
    githubUrl: 'https://github.com/username/weather-app',
    features: [
      'Location-based weather',
      '7-day forecast',
      'Weather alerts',
      'Interactive maps',
      'Historical weather data'
    ],
    createdAt: new Date('2023-03-20').toISOString(),
    updatedAt: new Date('2023-09-15').toISOString(),
    featured: false,
    averageRating: 3.8,
    totalRatings: 5,
    developerId: 'dev2'
  },
  {
    id: '5',
    title: 'E-commerce Platform',
    slug: 'e-commerce-platform',
    description: 'A full-featured e-commerce platform with product management, shopping cart, and secure payment processing.',
    image: '/projects/ecommerce.jpg',
    category: 'Web App',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    demoUrl: 'https://ecommerce-demo.com',
    githubUrl: 'https://github.com/username/ecommerce',
    features: [
      'Product catalog',
      'User authentication',
      'Shopping cart',
      'Payment processing',
      'Order management'
    ],
    createdAt: new Date('2022-11-10').toISOString(),
    updatedAt: new Date('2023-08-25').toISOString(),
    featured: false,
    averageRating: 4.0,
    totalRatings: 7,
    developerId: 'dev3'
  },
  {
    id: '6',
    title: 'Task Management System',
    slug: 'task-management-system',
    description: 'A collaborative task management system for teams to organize, track, and manage projects efficiently.',
    image: '/projects/taskmanager.jpg',
    category: 'Web App',
    technologies: ['Angular', 'Firebase', 'RxJS', 'Material UI'],
    demoUrl: 'https://task-manager.demo.com',
    githubUrl: 'https://github.com/username/task-manager',
    features: [
      'Task creation and assignment',
      'Project timelines',
      'Team collaboration',
      'File sharing',
      'Progress tracking'
    ],
    createdAt: new Date('2023-02-15').toISOString(),
    updatedAt: new Date('2023-07-10').toISOString(),
    featured: false,
    averageRating: 3.5,
    totalRatings: 4,
    developerId: 'dev1'
  }
];

// Sample users
const users = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date('2023-01-15').toISOString()
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: new Date('2023-02-20').toISOString()
  },
  {
    id: 'user3',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    createdAt: new Date('2023-03-10').toISOString()
  },
  {
    id: 'user4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    createdAt: new Date('2023-04-05').toISOString()
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Delete all existing comments
    await deleteAllComments();
    
    // Add developers
    const developersCollection = collection(db, 'developers');
    for (const developer of developers) {
      const { id, ...developerData } = developer;
      await setDoc(doc(developersCollection, id), {
        ...developerData,
        createdAt: new Date(developerData.createdAt),
        updatedAt: developerData.updatedAt ? new Date(developerData.updatedAt) : null
      });
      console.log(`Added developer: ${developer.name}`);
    }
    
    // Add users
    const usersCollection = collection(db, 'users');
    for (const user of users) {
      const { id, ...userData } = user;
      await setDoc(doc(usersCollection, id), {
        ...userData,
        createdAt: new Date(userData.createdAt)
      });
      console.log(`Added user: ${user.name}`);
    }
    
    // Add projects
    const projectsCollection = collection(db, 'projects');
    for (const project of projects) {
      const { id, ...projectData } = project;
      await setDoc(doc(projectsCollection, id), {
        ...projectData,
        createdAt: new Date(projectData.createdAt),
        updatedAt: projectData.updatedAt ? new Date(projectData.updatedAt) : null
      });
      console.log(`Added project: ${project.title}`);
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Function to delete all comments
async function deleteAllComments() {
  try {
    // Get all projects
    const projectsCollection = collection(db, 'projects');
    const projectSnapshot = await getDocs(projectsCollection);
    
    // For each project, delete all comments
    for (const projectDoc of projectSnapshot.docs) {
      const projectId = projectDoc.id;
      const commentsCollection = collection(db, 'projects', projectId, 'comments');
      const commentSnapshot = await getDocs(commentsCollection);
      
      // Delete each comment
      let deletedCount = 0;
      for (const commentDoc of commentSnapshot.docs) {
        await deleteDoc(doc(commentsCollection, commentDoc.id));
        deletedCount++;
      }
      
      if (deletedCount > 0) {
        console.log(`Deleted ${deletedCount} comments from project ID: ${projectId}`);
      }
    }
    
    console.log('All comments deleted successfully');
  } catch (error) {
    console.error('Error deleting comments:', error);
  }
}

// Run the seed function
seedDatabase(); 