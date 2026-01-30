import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BackgroundEffect: React.FC = () => {
  const { scrollY } = useScroll();
  // Start fading in after 80vh (approx Hero section)
  const opacity = useTransform(scrollY, [window.innerHeight * 0.8, window.innerHeight * 1.2], [0, 1]);
  
  // Create random floating shapes
  const shapes = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 100 + 50,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full bg-amber/5 dark:bg-amber/5 blur-3xl"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </motion.div>
  );
};

export default BackgroundEffect;
