import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData, Project } from '../context/DataContext';
import { LayoutDashboard, MessageSquare, Plus, Trash2, LogOut, X, BarChart3, Bot, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { projects, inquiries, analytics, aiConversations, addProject, deleteProject, markInquiryAsRead } = useData();
  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'inquiries' | 'ai-chats'>('analytics');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

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
      date: '',
      liveUrl: ''
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
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'analytics'
                ? 'bg-amber text-charcoal font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </button>
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
          <button
            onClick={() => setActiveTab('ai-chats')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'ai-chats'
                ? 'bg-amber text-charcoal font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <Bot className="w-5 h-5" />
            AI Chats
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
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-amber/20 rounded-xl text-amber">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-500 dark:text-gray-400">Total Visits</h3>
                </div>
                <p className="text-4xl font-bold">{analytics.totalVisits}</p>
                <p className="text-sm text-gray-400 mt-2">All time website visits</p>
              </div>

              <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-500 dark:text-gray-400">AI Conversations</h3>
                </div>
                <p className="text-4xl font-bold">{aiConversations.length}</p>
                <p className="text-sm text-gray-400 mt-2">Total active chat sessions</p>
              </div>

              <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-xl text-green-500">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-500 dark:text-gray-400">Total Inquiries</h3>
                </div>
                <p className="text-4xl font-bold">{inquiries.length}</p>
                <p className="text-sm text-gray-400 mt-2">Messages received</p>
              </div>
            </div>

            <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/5">
              <h3 className="font-bold text-xl mb-4">Last Visit</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {new Date(analytics.lastVisit).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
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
        )}
        
        {activeTab === 'inquiries' && (
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

        {activeTab === 'ai-chats' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">AI Conversations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat List */}
              <div className="lg:col-span-1 space-y-4">
                {aiConversations.length === 0 ? (
                  <p className="text-gray-500">No conversations yet.</p>
                ) : (
                  aiConversations.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedConversation(chat.id)}
                      className={`p-4 rounded-xl cursor-pointer border transition-colors ${
                        selectedConversation === chat.id
                          ? 'bg-amber text-charcoal border-amber'
                          : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 hover:border-amber/50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm">Guest User</span>
                        <span className="text-xs opacity-60">
                          {new Date(chat.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs opacity-80 line-clamp-2">
                        {chat.messages[chat.messages.length - 1]?.text || 'No messages'}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs opacity-60">
                        <MessageSquare className="w-3 h-3" />
                        {chat.messages.length} messages
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Chat View */}
              <div className="lg:col-span-2">
                {selectedConversation ? (
                  <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden flex flex-col h-[600px]">
                    <div className="p-4 border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5">
                      <h3 className="font-bold">Conversation History</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {selectedConversation}
                      </p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {aiConversations
                        .find(c => c.id === selectedConversation)
                        ?.messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                msg.sender === 'user'
                                  ? 'bg-amber text-charcoal rounded-tr-none'
                                  : 'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 rounded-tl-none'
                              }`}
                            >
                              <p>{msg.text}</p>
                              <p className="text-[10px] mt-1 opacity-50 text-right">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-[600px] flex items-center justify-center bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 text-gray-400">
                    <div className="text-center">
                      <Bot className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>Select a conversation to view details</p>
                    </div>
                  </div>
                )}
              </div>
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
