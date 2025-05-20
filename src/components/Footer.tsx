import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 px-4 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-black overflow-hidden section"
    >
      {/* Enhanced gradient background with smooth animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 50% 20%, rgba(255, 0, 0, 0.08), transparent 70%)`
          }}
        />
      </motion.div>
      
      {/* Improved transition gradient */}
      <div className="gradient-transition gradient-transition-top"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12, // Slowed stagger for smoother appearance
                delayChildren: 0.2,
                ease: "easeOut",
                duration: 0.8
              }
            }
          }}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
        >
          {/* Logo and About with enhanced animation */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { 
                  duration: 0.7, 
                  ease: [0.1, 0.6, 0.3, 1] // Custom ease curve for smoother motion
                }
              }
            }}
            className="col-span-1 md:col-span-2"
          >
            {/* Logo animation */}
            <motion.div 
              className="flex items-center mb-6"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    duration: 0.5, 
                    ease: "easeOut" 
                  }
                }
              }}
            >
              <div className="mr-2 flex space-x-1">
                <span className="inline-block w-3 h-3 bg-primary rounded-sm"></span>
                <span className="inline-block w-3 h-3 bg-white rounded-sm"></span>
                <span className="inline-block w-3 h-3 bg-primary/70 rounded-sm"></span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Data</span><span className="text-primary">zen</span>
              </span>
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-md">
              A dynamic community of data enthusiasts, innovators, and problem solvers. 
              We are committed to bridging the gap between data science theory and real-world applications.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>
              </a>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center">
                  <span className="inline-block w-1 h-1 bg-primary rounded-full mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center">
                  <span className="inline-block w-1 h-1 bg-primary rounded-full mr-2"></span>
                  About
                </a>
              </li>
              <li>
                <a href="#events" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center">
                  <span className="inline-block w-1 h-1 bg-primary rounded-full mr-2"></span>
                  Events
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center">
                  <span className="inline-block w-1 h-1 bg-primary rounded-full mr-2"></span>
                  Team
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center">
                  <span className="inline-block w-1 h-1 bg-primary rounded-full mr-2"></span>
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">Innovation Hub, 123 Tech Avenue, Digital City</span>
              </li>
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <a href="mailto:info@datazen.org" className="text-gray-400 group-hover:text-white transition-colors duration-300">info@datazen.org</a>
              </li>
              <li className="flex items-start group">
                <svg className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <a href="tel:+15551234567" className="text-gray-400 group-hover:text-white transition-colors duration-300">+1 (555) 123-4567</a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div 
          variants={itemVariants}
          className="mb-12 p-6 border border-white/10 rounded-xl bg-black/60"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-8">
              <h3 className="text-lg font-bold text-white mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-400 text-sm">Stay updated with our latest news and events</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:w-auto w-full">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-lg bg-black border border-white/20 text-white focus:border-primary focus:outline-none transition-colors"
              />
              <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Copyright and Bottom Links */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} <span className="text-white">Data</span><span className="text-primary">zen</span>. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors duration-300">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 