import { Project } from '@/types';

export const projects: Project[] = [
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
    createdAt: '2023-05-15',
    updatedAt: '2023-11-20'
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
    createdAt: '2022-08-10',
    updatedAt: '2023-10-05'
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
    createdAt: '2023-12-01'
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
    createdAt: '2023-03-20',
    updatedAt: '2023-09-15'
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
    createdAt: '2022-11-10',
    updatedAt: '2023-08-25'
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
    createdAt: '2023-02-15',
    updatedAt: '2023-07-10'
  }
]; 