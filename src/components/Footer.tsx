import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-white dark:bg-charcoal dim:bg-charcoal-light pt-24 pb-12 border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="mb-8">
              <a href="#" className="text-3xl font-bold tracking-tighter">
                <span className="text-charcoal dark:text-white">Andy</span>
                <span className="text-amber">GO</span>
              </a>
              <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-sm">
                Systems in Motion. Success in Sight.
                Engineering digital momentum for forward-thinking businesses.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5 mr-3 text-amber" />
                <span>info@andygosystems.com</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 mr-3 text-amber" />
                <span>+254 712 345 678</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 mr-3 text-amber" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-gray-100 dark:bg-white/5 dim:bg-white/10 rounded-full text-charcoal dark:text-white hover:bg-amber hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-6">Start a Project</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 dim:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-amber text-charcoal dark:text-white placeholder-gray-500 transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 dim:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-amber text-charcoal dark:text-white placeholder-gray-500 transition-colors"
                />
              </div>
              <select defaultValue="" className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 dim:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-amber text-charcoal dark:text-white transition-colors appearance-none">
                <option value="" disabled>Project Type</option>
                <option value="web">Web Development</option>
                <option value="app">Mobile App</option>
                <option value="consulting">Consulting</option>
              </select>
              <textarea 
                placeholder="Tell us about your project..." 
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 dim:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-amber text-charcoal dark:text-white placeholder-gray-500 transition-colors resize-none"
              ></textarea>
              <button 
                type="submit" 
                className="w-full py-4 bg-amber text-charcoal font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                Send Message
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AndyGO Systems. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-amber transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
