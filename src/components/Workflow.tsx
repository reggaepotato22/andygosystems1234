import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, PenTool, Rocket, ArrowRight } from 'lucide-react';

const Workflow: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  const steps = [
    {
      id: "01",
      title: "Discovery",
      description: "We dive deep into your business goals, user needs, and technical constraints to build a solid roadmap.",
      icon: <Search className="w-8 h-8" />,
      color: "text-blue-400"
    },
    {
      id: "02",
      title: "Development",
      description: "Writing clean, scalable code using modern stacks like React, Node.js, and Python.",
      icon: <PenTool className="w-8 h-8" />,
      color: "text-amber"
    },
    {
      id: "03",
      title: "Launch",
      description: "Rigorous testing, seamless deployment, and post-launch support to ensure continued success.",
      icon: <Rocket className="w-8 h-8" />,
      color: "text-green-400"
    }
  ];

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-white dark:bg-charcoal dim:bg-charcoal-light transition-colors duration-500">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber/5 via-transparent to-transparent opacity-20" />
        
        <div className="absolute top-12 left-6 md:left-12 z-20">
          <span className="text-amber font-mono text-sm tracking-widest uppercase mb-2 block">The Process</span>
          <h2 className="text-4xl md:text-6xl font-bold text-charcoal dark:text-white">
            From Concept <span className="text-gray-400 dark:text-gray-500">to Code</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-12 md:px-24">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="group relative h-[60vh] w-[85vw] md:w-[40vw] flex-shrink-0 rounded-3xl bg-gray-50 dark:bg-white/5 dim:bg-white/10 border border-gray-200 dark:border-white/10 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-between hover:bg-white dark:hover:bg-white/10 hover:shadow-xl dark:hover:shadow-none transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <ArrowRight className="w-12 h-12 -rotate-45 text-charcoal dark:text-white" />
              </div>

              <div>
                <span className="text-6xl md:text-8xl font-bold text-gray-200 dark:text-white/5 group-hover:text-gray-300 dark:group-hover:text-white/10 transition-colors duration-500">
                  {step.id}
                </span>
                <div className={`mt-8 mb-6 ${step.color} p-4 bg-white dark:bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-none`}>
                  {step.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-white mb-4">
                  {step.title}
                </h3>
              </div>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                {step.description}
              </p>

              {/* Hover Glow */}
              <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-amber/30 shadow-[0_0_30px_rgba(255,184,0,0.1)]" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Workflow;
