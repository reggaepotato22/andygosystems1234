import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  client?: string;
  date?: string;
  liveUrl?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  type: string;
  date: string;
  status: 'new' | 'read' | 'contacted';
}

interface DataContextType {
  projects: Project[];
  inquiries: Inquiry[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  markInquiryAsRead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialProjects: Project[] = [
  {
    id: '1',
    title: "Veterinarians with a Mission Programme",
    category: "Web Applications",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
    description: "Veterinarians with a Mission Programme refreshed website. A platform for veterinary professionals to collaborate and manage missions.",
    tags: ["Vite", "TypeScript", "React", "shadcn-ui", "Tailwind CSS"],
    client: "Veterinarians with a Mission programme",
    date: "September 2025",
    liveUrl: "https://kenyavetsemission.org"
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('andygo_projects_v2');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('andygo_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('andygo_projects_v2', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('andygo_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedProject } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'new'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const markInquiryAsRead = (id: string) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: 'read' } : i));
  };

  return (
    <DataContext.Provider value={{
      projects,
      inquiries,
      addProject,
      updateProject,
      deleteProject,
      addInquiry,
      markInquiryAsRead
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
