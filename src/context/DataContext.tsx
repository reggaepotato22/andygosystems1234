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
    title: "FinTech Analytics Dashboard",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    description: "Real-time financial data visualization for a global banking client.",
    tags: ["React", "D3.js", "Node.js"],
    client: "Global Bank Corp",
    date: "Oct 2023"
  },
  {
    id: '2',
    title: "HealthConnect Portal",
    category: "Apps",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
    description: "HIPAA-compliant patient portal connecting 50k+ users daily.",
    tags: ["React Native", "AWS", "TypeScript"],
    client: "HealthPlus",
    date: "Dec 2023"
  },
  {
    id: '3',
    title: "EcoSmart Home System",
    category: "Websites",
    image: "https://images.unsplash.com/photo-1558002038-109177381792?auto=format&fit=crop&q=80&w=2070",
    description: "Smart home automation interface with energy consumption tracking.",
    tags: ["Flutter", "Firebase", "IoT"],
    client: "EcoLife",
    date: "Jan 2024"
  },
  {
    id: '4',
    title: "LogiChain Supply Platform",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1494412574643-35d324698427?auto=format&fit=crop&q=80&w=2074",
    description: "Blockchain-based supply chain management system for logistics giants.",
    tags: ["Figma", "Design System", "Prototyping"],
    client: "LogiTech",
    date: "Feb 2024"
  },
  {
    id: '5',
    title: "Urban Mobility App",
    category: "Apps",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2070",
    description: "City-wide public transport tracking and ticketing solution.",
    tags: ["Flutter", "Google Maps API", "Stripe"],
    client: "MetroCity",
    date: "Mar 2024"
  },
  {
    id: '6',
    title: "Corporate Identity Redesign",
    category: "Others",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000",
    description: "Complete brand overhaul including logo, stationery, and guidelines.",
    tags: ["Branding", "Illustrator", "Print"],
    client: "NexGen Corp",
    date: "Apr 2024"
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('andygo_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('andygo_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('andygo_projects', JSON.stringify(projects));
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
