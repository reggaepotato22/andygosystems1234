import React from 'react';
import { Layout, Server, Cloud, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExpertiseProps {
  onOpenEnquiry: () => void;
}

const Expertise: React.FC<ExpertiseProps> = ({ onOpenEnquiry }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const services = [
    {
      title: "Custom Web Apps",
      icon: Layout,
      description: "High-performance SPAs and PFAs built with React and Vite. We create fluid, responsive interfaces that drive engagement.",
      tech: ["React", "Vite", "TypeScript", "Tailwind"]
    },
    {
      title: "Backend Architecture",
      icon: Server,
      description: "Scalable APIs and microservices. We build secure, efficient server-side systems using Node.js and Python.",
      tech: ["Node.js", "Python", "PostgreSQL", "Redis"]
    },
    {
      title: "Cloud Systems",
      icon: Cloud,
      description: "Cloud-native infrastructure designed for reliability and scale. Automated deployment pipelines and serverless solutions.",
      tech: ["AWS", "Docker", "CI/CD", "Terraform"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-charcoal dim:bg-charcoal-light text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-amber font-mono text-sm tracking-widest uppercase mb-4 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold leading-tight text-charcoal dark:text-white"
          >
            Developer-Focused Solutions
          </motion.h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-white/5 dim:bg-white/10 rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-amber hover:shadow-[0_0_30px_rgba(255,184,0,0.15)] transition-all duration-300 group flex flex-col h-full"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-amber/10 transition-colors">
                <service.icon className="w-7 h-7 text-gray-700 dark:text-gray-300 group-hover:text-amber transition-colors" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-charcoal dark:text-white group-hover:text-amber transition-colors">{service.title}</h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed flex-grow">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100 dark:border-white/5">
                {service.tech.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contextual Enquiry Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl bg-charcoal dark:bg-black overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-800 dark:border-white/10 group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Need a custom <span className="text-amber">Node.js</span> solution?
            </h3>
            <p className="text-gray-400">
              Let's discuss how we can architect your next big project.
            </p>
          </div>

          <button 
            onClick={onOpenEnquiry}
            className="relative z-10 px-8 py-4 bg-white text-charcoal font-bold rounded-xl hover:bg-amber transition-colors duration-300 flex items-center gap-2 shadow-lg group-hover:shadow-amber/20 whitespace-nowrap"
          >
            Get a Quote <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Expertise;
