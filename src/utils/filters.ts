import { Project, ProjectType, ProjectStatus } from '../data/projects';

export interface FilterOptions {
  type?: ProjectType[];
  techStack?: string[];
  status?: ProjectStatus[];
  complexity?: ('beginner' | 'intermediate' | 'advanced')[];
  search?: string;
  sortBy?: 'name' | 'dateCreated' | 'complexity';
  sortDirection?: 'asc' | 'desc';
}

export const filterProjects = (projects: Project[], filters: FilterOptions): Project[] => {
  return projects.filter(project => {
    // Filter by type
    if (filters.type && filters.type.length > 0 && !filters.type.includes(project.type)) {
      return false;
    }

    // Filter by tech stack
    if (filters.techStack && filters.techStack.length > 0) {
      const hasMatchingTech = project.techStack.some(tech => 
        filters.techStack!.includes(tech)
      );
      if (!hasMatchingTech) return false;
    }

    // Filter by status
    if (filters.status && filters.status.length > 0 && !filters.status.includes(project.status)) {
      return false;
    }

    // Filter by complexity
    if (filters.complexity && filters.complexity.length > 0 && !filters.complexity.includes(project.complexity)) {
      return false;
    }

    // Filter by search term
    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase();
      const matchesName = project.name.toLowerCase().includes(searchTerm);
      const matchesDescription = project.description.toLowerCase().includes(searchTerm);
      const matchesTechStack = project.techStack.some(tech => 
        tech.toLowerCase().includes(searchTerm)
      );
      
      if (!matchesName && !matchesDescription && !matchesTechStack) {
        return false;
      }
    }

    return true;
  });
};

export const sortProjects = (projects: Project[], sortBy: string, sortDirection: 'asc' | 'desc'): Project[] => {
  return [...projects].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'dateCreated':
        comparison = new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
        break;
      case 'complexity':
        const complexityOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
        comparison = complexityOrder[a.complexity] - complexityOrder[b.complexity];
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
};

export const getAllTechStacks = (projects: Project[]): string[] => {
  const techStacks = new Set<string>();
  
  projects.forEach(project => {
    project.techStack.forEach(tech => {
      techStacks.add(tech);
    });
  });
  
  return Array.from(techStacks).sort();
}; 