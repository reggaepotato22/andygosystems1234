import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Cloud } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';

export type Theme = 'light' | 'dim' | 'dark';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  onOpenEnquiry: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { triggerLoading } = useLoading();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Methodology', href: '#workflow' },
    { name: 'Work', href: '#work' },
  ];

  const handleNavClick = () => {
    triggerLoading();
    setIsMobileMenuOpen(false);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="w-5 h-5 text-amber" />;
      case 'dim': return <Cloud className="w-5 h-5 text-blue-300" />;
      case 'dark': return <Moon className="w-5 h-5 text-white" />;
    }
  };

  return (
    <>
      <motion.header
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/70 dark:bg-[#1A1A1A]/70 dim:bg-[#2A2A2A]/70 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 py-3 shadow-sm'
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" onClick={handleNavClick} className="text-2xl font-bold tracking-tighter font-display">
              <span className="text-gray-900 dark:text-white transition-colors">Andy</span>
              <span className="text-amber">GO</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className={`font-medium text-sm tracking-wide transition-colors ${
                  isScrolled
                    ? 'text-gray-600 dark:text-gray-300 hover:text-amber dark:hover:text-amber'
                    : 'text-gray-800 dark:text-gray-300 hover:text-amber dark:hover:text-amber'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors relative group"
              aria-label="Toggle theme"
            >
              {getThemeIcon()}
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {theme === 'light' ? 'Stellar White' : theme === 'dim' ? 'Twilight' : 'Midnight'}
              </span>
            </button>
            <button
              onClick={onOpenEnquiry}
              className="px-6 py-2.5 bg-charcoal dark:bg-white text-white dark:text-charcoal font-bold rounded-full hover:bg-amber dark:hover:bg-amber hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-amber/25"
            >
              Quick Enquiry
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {getThemeIcon()}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-800 dark:text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-charcoal border-t border-gray-100 dark:border-white/5"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-amber dark:hover:text-amber"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  onOpenEnquiry();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-amber text-charcoal font-bold rounded-xl"
              >
                Quick Enquiry
              </button>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};

export default Header;
