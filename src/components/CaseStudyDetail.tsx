import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import Footer from './Footer';

interface CaseStudyDetailProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    image: string;
    description: string;
    tags: string[];
    client?: string;
    date?: string;
  } | null;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[60] overflow-y-auto bg-white dark:bg-charcoal dim:bg-charcoal-light transition-colors duration-500 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* Header Image */}
      <div className="relative h-[60vh] w-full">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors z-50"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 rounded-full bg-amber text-charcoal font-bold text-sm mb-4"
            >
              {project.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose dark:prose-invert max-w-none"
            >
              <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">Project Overview</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-lg">
                {project.description} This project represents a significant leap forward in {project.category.toLowerCase()} technology. We focused on delivering a seamless user experience while maintaining robust backend performance.
              </p>

              <h3 className="text-xl font-bold text-charcoal dark:text-white mb-4">The Challenge</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                The main challenge was to integrate complex data streams into a simplified user interface without compromising on speed. The client needed a solution that could handle 50k+ daily active users with sub-second latency.
              </p>

              <h3 className="text-xl font-bold text-charcoal dark:text-white mb-4">The Solution</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                We utilized a modern stack comprising React for the frontend and Node.js for the backend. By implementing aggressive caching strategies and optimizing database queries, we achieved a 40% reduction in load times.
              </p>

              <h3 className="text-xl font-bold text-charcoal dark:text-white mb-4">Key Results</h3>
              <ul className="space-y-2 mb-8 list-none pl-0">
                {['40% Faster Load Times', '99.9% Uptime Guaranteed', 'Increased User Engagement by 25%'].map((result, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <ArrowRight className="w-4 h-4 text-amber" />
                    {result}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-white/5 dim:bg-white/10 rounded-3xl p-8 border border-gray-200 dark:border-white/10"
            >
              <h3 className="text-xl font-bold text-charcoal dark:text-white mb-6">Project Details</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Client</h4>
                  <p className="text-lg font-bold text-charcoal dark:text-white">{project.client || 'Confidential'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date</h4>
                  <p className="text-lg font-bold text-charcoal dark:text-white">{project.date || '2024'}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Services</h4>
                  <p className="text-lg font-bold text-charcoal dark:text-white">{project.category}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white dark:bg-white/10 rounded-lg text-sm border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-amber text-charcoal font-bold rounded-xl hover:bg-amber-dark transition-colors flex items-center justify-center gap-2">
                Visit Live Site <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Footer inside Case Study */}
      <Footer />
    </motion.div>
  );
};

export default CaseStudyDetail;
