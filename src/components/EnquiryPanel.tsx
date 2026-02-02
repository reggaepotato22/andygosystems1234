import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

interface EnquiryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnquiryPanel: React.FC<EnquiryPanelProps> = ({ isOpen, onClose }) => {
  const { addInquiry } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      name: formData.name,
      email: formData.email,
      type: formData.type || 'General',
      message: formData.message
    });
    setFormData({ name: '', email: '', type: '', message: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white dark:bg-charcoal border-l border-gray-200 dark:border-white/10 z-[70] p-8 shadow-2xl overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                Start a Project
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Tell us about your goals. We'll help you engineer the momentum you need.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">What's your name?</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-all dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-all dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Project Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Web App', 'Mobile App', 'Cloud System', 'Consulting'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type }))}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors text-left ${
                        formData.type === type
                          ? 'bg-amber/10 border-amber text-amber'
                          : 'border-gray-200 dark:border-white/10 text-black-600 dark:text-black-400 hover:border-amber hover:text-amber'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Tell us more</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Describe your project vision..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-all dark:text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-amber hover:bg-amber-dark text-charcoal font-bold rounded-xl flex items-center justify-center gap-2 transition-colors group"
              >
                Send Enquiry
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquiryPanel;
