import React, { useState, useEffect } from 'react';
import Header, { Theme } from '../components/Header';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import Expertise from '../components/Expertise';
import Pricing from '../components/Pricing';
import Workflow from '../components/Workflow';
import CaseStudies from '../components/CaseStudies';
import CaseStudyDetail from '../components/CaseStudyDetail';
import Footer from '../components/Footer';
import BackgroundEffect from '../components/BackgroundEffect';
import EnquiryPanel from '../components/EnquiryPanel';

const LandingPage: React.FC = () => {
  // Initialize theme from system preference or default to light
  const [theme, setTheme] = useState<Theme>(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'dim');
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'dim') {
      root.classList.add('dark', 'dim');
    } else {
      root.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dim';
      if (prev === 'dim') return 'dark';
      return 'light';
    });
  };

  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsCaseStudyOpen(true);
  };

  const handleCloseCaseStudy = () => {
    setIsCaseStudyOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Wait for animation
  };

  return (
    <div className="min-h-screen bg-background text-primary transition-colors duration-500 relative">
      <BackgroundEffect />
      <Header theme={theme} toggleTheme={toggleTheme} onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <main>
        <Hero onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        <WhyUs />
        <Expertise onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        <Pricing />
        <CaseStudies onProjectClick={handleProjectClick} />
        <Workflow />
      </main>
      <Footer />
      <CaseStudyDetail 
        isOpen={isCaseStudyOpen} 
        onClose={handleCloseCaseStudy} 
        project={selectedProject} 
      />
      <EnquiryPanel isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  );
};

export default LandingPage;
