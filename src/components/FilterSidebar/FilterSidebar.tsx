import { useState } from 'react';
import { FilterOptions } from '../../utils/filters';
import { ProjectType, ProjectStatus } from '../../data/projects';

interface FilterSidebarProps {
  filters: FilterOptions;
  techStacks: string[];
  onFilterChange: (filters: FilterOptions) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  filters, 
  techStacks,
  onFilterChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTypeChange = (type: ProjectType) => {
    const currentTypes = filters.type || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    onFilterChange({
      ...filters,
      type: newTypes
    });
  };

  const handleTechStackChange = (tech: string) => {
    const currentTechStacks = filters.techStack || [];
    const newTechStacks = currentTechStacks.includes(tech)
      ? currentTechStacks.filter(t => t !== tech)
      : [...currentTechStacks, tech];
    
    onFilterChange({
      ...filters,
      techStack: newTechStacks
    });
  };

  const handleStatusChange = (status: ProjectStatus) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    onFilterChange({
      ...filters,
      status: newStatuses
    });
  };

  const handleComplexityChange = (complexity: 'beginner' | 'intermediate' | 'advanced') => {
    const currentComplexities = filters.complexity || [];
    const newComplexities = currentComplexities.includes(complexity)
      ? currentComplexities.filter(c => c !== complexity)
      : [...currentComplexities, complexity];
    
    onFilterChange({
      ...filters,
      complexity: newComplexities
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      sortBy: e.target.value as 'name' | 'dateCreated' | 'complexity'
    });
  };

  const handleSortDirectionChange = (direction: 'asc' | 'desc') => {
    onFilterChange({
      ...filters,
      sortDirection: direction
    });
  };

  const handleReset = () => {
    onFilterChange({
      search: filters.search
    });
  };

  return (
    <div className={`glass p-6 rounded-xl transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`font-bold text-secondary ${isExpanded ? 'block' : 'hidden'}`}>Filters</h3>
        <button 
          className="p-2 rounded-lg bg-primary-dark hover:bg-primary text-secondary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Project Types */}
          <div>
            <h4 className="font-semibold text-light mb-2">Project Type</h4>
            <div className="space-y-2">
              {(['mobile', 'web', 'ai', 'backend', 'open-source'] as ProjectType[]).map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`type-${type}`}
                    className="mr-2 accent-secondary"
                    checked={(filters.type || []).includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  <label htmlFor={`type-${type}`} className="text-light/80 capitalize">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold text-light mb-2">Tech Stack</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {techStacks.map((tech) => (
                <div key={tech} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`tech-${tech}`}
                    className="mr-2 accent-secondary"
                    checked={(filters.techStack || []).includes(tech)}
                    onChange={() => handleTechStackChange(tech)}
                  />
                  <label htmlFor={`tech-${tech}`} className="text-light/80">
                    {tech}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-semibold text-light mb-2">Status</h4>
            <div className="space-y-2">
              {(['live', 'in-development', 'completed'] as ProjectStatus[]).map((status) => (
                <div key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`status-${status}`}
                    className="mr-2 accent-secondary"
                    checked={(filters.status || []).includes(status)}
                    onChange={() => handleStatusChange(status)}
                  />
                  <label htmlFor={`status-${status}`} className="text-light/80 capitalize">
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Complexity */}
          <div>
            <h4 className="font-semibold text-light mb-2">Complexity</h4>
            <div className="space-y-2">
              {(['beginner', 'intermediate', 'advanced'] as const).map((complexity) => (
                <div key={complexity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`complexity-${complexity}`}
                    className="mr-2 accent-secondary"
                    checked={(filters.complexity || []).includes(complexity)}
                    onChange={() => handleComplexityChange(complexity)}
                  />
                  <label htmlFor={`complexity-${complexity}`} className="text-light/80 capitalize">
                    {complexity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <h4 className="font-semibold text-light mb-2">Sort By</h4>
            <select
              className="w-full bg-primary-dark text-light rounded-md p-2 mb-2"
              value={filters.sortBy || 'name'}
              onChange={handleSortChange}
            >
              <option value="name">Name</option>
              <option value="dateCreated">Date Created</option>
              <option value="complexity">Complexity</option>
            </select>
            
            <div className="flex gap-2">
              <button
                className={`flex-1 p-2 rounded-md ${filters.sortDirection === 'asc' ? 'bg-secondary text-white' : 'bg-primary-dark text-light/70'}`}
                onClick={() => handleSortDirectionChange('asc')}
              >
                Ascending
              </button>
              <button
                className={`flex-1 p-2 rounded-md ${filters.sortDirection === 'desc' ? 'bg-secondary text-white' : 'bg-primary-dark text-light/70'}`}
                onClick={() => handleSortDirectionChange('desc')}
              >
                Descending
              </button>
            </div>
          </div>

          {/* Reset */}
          <button
            className="w-full btn-secondary"
            onClick={handleReset}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}; 