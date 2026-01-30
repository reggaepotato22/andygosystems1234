import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Zap, Clock, Shield } from 'lucide-react';

const WhyUs: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-charcoal dim:bg-charcoal-light transition-colors duration-500">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal dark:text-white">Why Choose AndyGO?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We don't just write code; we engineer business outcomes.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          {/* Vision Panel - Large */}
          <motion.div 
            variants={item}
            className="md:col-span-2 bg-white dark:bg-white/5 dim:bg-white/10 rounded-3xl p-10 border border-gray-200 dark:border-white/5 hover:border-amber/30 hover:shadow-2xl dark:hover:shadow-[0_0_30px_rgba(255,184,0,0.05)] transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-[80px] group-hover:bg-amber/10 transition-colors" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber/10 flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-amber" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4 text-charcoal dark:text-white">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  To be the catalyst for digital transformation, empowering businesses to scale through intelligent, high-performance software systems that adapt to the future.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Live Stats Panel */}
          <motion.div 
            variants={item}
            className="bg-charcoal dark:bg-black rounded-3xl p-8 border border-gray-800 dark:border-white/5 text-white flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber" />
              </div>
              <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                LIVE
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-5xl font-bold mb-1 font-mono">99.9%</div>
              <div className="text-gray-400 text-sm">System Uptime</div>
              <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[99.9%]" />
              </div>
            </div>
          </motion.div>

          {/* Methodology Panel */}
          <motion.div 
            variants={item}
            className="md:col-span-1 bg-white dark:bg-white/5 dim:bg-white/10 rounded-3xl p-8 border border-gray-200 dark:border-white/5 hover:border-amber/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
             <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-charcoal dark:text-white">Methodology</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Agile-driven development with continuous integration, ensuring rapid delivery without compromising quality.
                </p>
              </div>
          </motion.div>

          {/* Mission Panel */}
          <motion.div 
            variants={item}
            className="md:col-span-2 bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/5 hover:border-amber/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex items-center"
          >
             <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gray-50 dark:from-white/5 to-transparent" />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 w-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber/10 flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-charcoal dark:text-white">Our Mission</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      To empower businesses with scalable, high-performance technology that drives real-world impact.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-charcoal dark:text-white">Core Values</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Integrity, Innovation, and Excellence in every line of code we write.
                    </p>
                  </div>
                </div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
