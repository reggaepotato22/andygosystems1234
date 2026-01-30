import React, { useRef } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Database, Cpu, Globe } from 'lucide-react';
import Marquee from './Marquee';

interface HeroProps {
  onOpenEnquiry: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="home" 
      className="relative min-h-screen flex flex-col pt-32 pb-0 overflow-hidden bg-white dark:bg-charcoal dim:bg-charcoal-light text-gray-900 dark:text-white transition-colors duration-500"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber/5 via-transparent to-transparent opacity-50 z-0" />
      
      <div className="container mx-auto px-6 flex-1 flex flex-col lg:flex-row items-center relative z-10">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 mb-16 lg:mb-0 lg:pr-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 text-amber text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber"></span>
              </span>
              Available for new projects
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-6 text-charcoal dark:text-white">
              Engineering
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-dark relative">
                Momentum
                <motion.span 
                  className="absolute -right-4 top-2 h-[80%] w-1.5 bg-amber inline-block"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg mb-8 leading-relaxed">
              AndyGO Systems: Turning Complex Ideas into Seamless Motion. We build high-performance infrastructure for the future.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenEnquiry}
                className="px-8 py-4 bg-amber text-charcoal font-bold rounded-full text-lg hover:bg-charcoal hover:text-white dark:hover:bg-white dark:hover:text-charcoal transition-all duration-300 flex items-center gap-2 shadow-lg shadow-amber/20 hover:shadow-amber/40"
              >
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="#work"
                className="px-8 py-4 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white font-bold rounded-full text-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-300"
              >
                View Work
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Interactive 3D/Code Viz */}
        <div className="w-full lg:w-1/2 relative h-[500px] flex items-center justify-center perspective-1000">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-md aspect-square"
          >
            {/* Main Code Card */}
            <motion.div 
              className="absolute inset-0 bg-white dark:bg-white/5 dim:bg-white/10 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden p-6 flex flex-col"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs font-mono text-gray-400">App.tsx</div>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex gap-2">
                  <span className="text-purple-500">import</span>
                  <span className="text-blue-500">React</span>
                  <span className="text-purple-500">from</span>
                  <span className="text-green-500">'react'</span>;
                </div>
                <div className="flex gap-2">
                  <span className="text-purple-500">const</span>
                  <span className="text-yellow-500">Future</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-blue-500">()</span>
                  <span className="text-purple-500">=&gt;</span>
                  <span className="text-gray-400">{`{`}</span>
                </div>
                <div className="pl-4 text-gray-500 dark:text-gray-400">
                  <span className="text-purple-500">return</span> (
                  <br />
                  &nbsp;&nbsp;<span className="text-blue-500">&lt;Innovation&gt;</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-500">&lt;Speed /&gt;</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-500">&lt;Scale /&gt;</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-blue-500">&lt;/Innovation&gt;</span>
                  <br />
                  );
                </div>
                <div className="text-gray-400">{`}`}</div>
              </div>
              
              {/* Animated Scan Line */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-amber/5 to-transparent h-20 pointer-events-none"
                animate={{ top: ['-20%', '120%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Floating Elements around */}
            <motion.div 
              className="absolute -top-10 -right-10 p-4 bg-white dark:bg-charcoal rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 z-20"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(80px)" }}
            >
              <Database className="w-8 h-8 text-amber" />
            </motion.div>

            <motion.div 
              className="absolute -bottom-5 -left-5 p-4 bg-white dark:bg-charcoal rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 z-20"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{ transform: "translateZ(60px)" }}
            >
              <Cpu className="w-8 h-8 text-blue-500" />
            </motion.div>

            <motion.div 
              className="absolute top-1/2 -right-16 p-3 bg-white dark:bg-charcoal rounded-full shadow-xl border border-gray-100 dark:border-white/10 z-10"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(30px)" }}
            >
              <Globe className="w-6 h-6 text-green-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Tech Stack Marquee at Bottom */}
      <div className="w-full mt-auto relative z-10">
         <Marquee items={["React", "TypeScript", "Node.js", "Python", "Tailwind", "Framer Motion", "AWS", "Next.js", "Docker"]} speed={40} />
      </div>
    </section>
  );
};

export default Hero;
