import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData, Project } from '../context/DataContext';
import { LayoutDashboard, MessageSquare, Plus, Trash2, LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { projects, inquiries, addProject, deleteProject, markInquiryAsRead } = useData();
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries'>('projects');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Project Form State
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    category: '',
    image: '',
    description: '',
    tags: [],
    client: '',
    date: ''
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(newProject);
    setIsAddModalOpen(false);
    setNewProject({
      title: '',
      category: '',
      image: '',
      description: '',
      tags: [],
      client: '',
      date: ''
    });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setNewProject(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewProject(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal text-gray-900 dark:text-white transition-colors">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-black/20 border-r border-gray-200 dark:border-white/5 p-6">
        <div className="mb-12">
          <h1 className="text-2xl font-bold">
            <span className="text-amber">Andy</span>GO Admin
          </h1>
        </div>

        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'projects'
                ? 'bg-amber text-charcoal font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'inquiries'
                ? 'bg-amber text-charcoal font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Inquiries
            {inquiries.filter(i => i.status === 'new').length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {inquiries.filter(i => i.status === 'new').length}
              </span>
            )}
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === 'projects' ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Manage Projects</h2>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-3 bg-amber text-charcoal font-bold rounded-xl hover:bg-amber-dark transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 group">
                  <div className="h-48 overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-amber uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-xl font-bold mt-2 mb-2">{project.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-8">Inquiries</h2>
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <p className="text-gray-500">No inquiries yet.</p>
              ) : (
                inquiries.map((inquiry) => (
                  <div 
                    key={inquiry.id}
                    className={`bg-white dark:bg-white/5 p-6 rounded-2xl border ${
                      inquiry.status === 'new' 
                        ? 'border-amber shadow-[0_0_15px_rgba(255,184,0,0.1)]' 
                        : 'border-gray-200 dark:border-white/5'
                    }`}
                    onClick={() => markInquiryAsRead(inquiry.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{inquiry.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{inquiry.email}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(inquiry.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-lg text-xs font-medium">
                        {inquiry.type}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-black/20 p-4 rounded-xl">
                      {inquiry.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-charcoal w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Add New Project</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Title</label>
                    <input
                      required
                      value={newProject.title}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <input
                      required
                      value={newProject.category}
                      onChange={e => setNewProject({...newProject, category: e.target.value})}
                      placeholder="e.g. Apps, Websites, UI/UX"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Image URL</label>
                  <input
                    required
                    value={newProject.image}
                    onChange={e => setNewProject({...newProject, image: e.target.value})}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={newProject.description}
                    onChange={e => setNewProject({...newProject, description: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Client</label>
                    <input
                      value={newProject.client}
                      onChange={e => setNewProject({...newProject, client: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Date</label>
                    <input
                      value={newProject.date}
                      onChange={e => setNewProject({...newProject, date: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Tags (Press Enter)</label>
                  <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {newProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-amber/10 text-amber rounded-lg text-sm flex items-center gap-2">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-charcoal">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber text-charcoal font-bold rounded-xl hover:bg-amber-dark transition-colors"
                >
                  Create Project
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
