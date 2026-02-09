import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

interface CaseStudiesProps {
  onProjectClick: (project: any) => void;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ onProjectClick }) => {
  const { projects } = useData();
  const [activeCategory, setActiveCategory] = React.useState('All');

  const categories = ['All', 'Web Applications', 'Luxury Real Estate', 'Websites', 'Apps', 'UI/UX'];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="work" className="py-24 bg-white dark:bg-charcoal dim:bg-charcoal-light text-charcoal dark:text-white transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-amber font-mono text-sm tracking-widest uppercase mb-4 block"
            >
              Selected Works
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-charcoal dark:text-white"
            >
              Our Best Work
            </motion.h2>
          </div>
          <a href="#" className="hidden md:flex items-center text-gray-600 dark:text-white/70 hover:text-amber dark:hover:text-amber transition-colors mt-4 md:mt-0 group">
            View all projects <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-amber text-charcoal font-bold'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div 
              layout
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              onClick={() => onProjectClick(project)}
              className={`group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer ${
                index % 3 === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-amber font-medium mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs text-white border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500">
                    <button className="flex items-center gap-2 text-white font-bold group/btn">
                      View Case Study <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
