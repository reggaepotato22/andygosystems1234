import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ items, direction = 'left', speed = 20 }) => {
  return (
    <div className="relative flex overflow-hidden bg-white dark:bg-charcoal py-8 border-y border-gray-100 dark:border-white/5 transition-colors duration-500">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-charcoal to-transparent z-10 transition-colors duration-500" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-charcoal to-transparent z-10 transition-colors duration-500" />
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-16 mx-8 items-center">
            {items.map((item, index) => (
              <span 
                key={index} 
                className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 dark:from-white/10 dark:to-white/20 select-none uppercase tracking-tighter"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
