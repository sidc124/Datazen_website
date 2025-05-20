import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'EVENTS', href: '#events' },
  { name: 'TEAM', href: '#team' },
  { name: 'CONTACT', href: '#contact' }
];

interface NavbarProps {
  activeSection?: string;
}

const Navbar = ({ activeSection }: NavbarProps = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<number>(0); // Default to HOME
  
  // Handle both prop-based and scroll-based active section
  useEffect(() => {
    if (activeSection) {
      const index = navLinks.findIndex(link => link.href === `#${activeSection}`);
      if (index !== -1) {
        setActiveItem(index);
      }
    }
  }, [activeSection]);
  
  useEffect(() => {
    const handleScroll = () => {
      // Track if we've scrolled down
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Only use scroll-based section detection if activeSection prop is not provided
      if (!activeSection) {
        // Handle section tracking more reliably
        const isHome = window.scrollY < window.innerHeight * 0.5;
        if (isHome) {
          setActiveItem(0); // HOME
          return;
        }
        
        // Find which section is currently in view
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + window.innerHeight * 0.3;
        
        let foundActive = false;
        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            if (sectionId) {
              const index = navLinks.findIndex(link => link.href === `#${sectionId}`);
              if (index !== -1) {
                setActiveItem(index);
                foundActive = true;
              }
            }
          }
        });
        
        // Default to HOME if no section is active
        if (!foundActive) {
          setActiveItem(0);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);
  
  // Smooth scroll function for navigation links
  const handleNavClick = (index: number, href: string) => {
    setActiveItem(index);
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    // Handle smooth scrolling
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Prevent default and handle scroll manually for smoother animation
        event?.preventDefault();
        
        const navHeight = 80; // Approximate navbar height
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };
  
  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md py-2 shadow-lg shadow-primary/5' 
          : 'bg-transparent py-5'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Navigation Items */}
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <motion.div 
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <a href="#home" onClick={(e) => handleNavClick(0, '#home')}>
                <span className="text-text">DATA</span>
                <span className="text-primary">ZEN</span>
              </a>
            </motion.div>

            {/* Menu Items */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative"
                >
                  <a 
                    href={item.href}
                    onClick={(e) => handleNavClick(index, item.href)}
                  >
                    <motion.span 
                      className={`text-sm font-medium tracking-wider transition-colors duration-300 ${
                        activeItem === index 
                          ? 'text-primary' 
                          : 'text-text hover:text-primary/80'
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      {item.name}
                    </motion.span>
                  </a>
                  
                  {/* Bottom Line - only show for active item */}
                  {activeItem === index && (
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.2 }}
                      layoutId="navIndicator"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Power Indicator */}
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                backgroundColor: ['#e53935', '#ef5350', '#e53935'],
                boxShadow: [
                  '0 0 5px #e53935',
                  '0 0 10px #e53935',
                  '0 0 5px #e53935'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <motion.button 
        className="md:hidden absolute top-4 right-4 focus:outline-none z-50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-8 h-8 flex items-center justify-center relative">
          <span 
            className={`block w-6 h-0.5 absolute transition-all duration-300 ${
              mobileMenuOpen 
                ? 'rotate-45 bg-text' 
                : '-translate-y-1.5 bg-text'
            }`}
          ></span>
          <span 
            className={`block w-6 h-0.5 absolute transition-all duration-300 ${
              mobileMenuOpen 
                ? 'opacity-0 bg-text' 
                : 'opacity-100 bg-text'
            }`}
          ></span>
          <span 
            className={`block w-6 h-0.5 absolute transition-all duration-300 ${
              mobileMenuOpen 
                ? '-rotate-45 bg-text' 
                : 'translate-y-1.5 bg-text'
            }`}
          ></span>
        </div>
      </motion.button>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center md:hidden z-40"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 32px) 32px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 32px) 32px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 32px) 32px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div 
              className="flex flex-col items-center space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {navLinks.map((item, index) => (
                <motion.a 
                  key={item.name}
                  href={item.href}
                  className={`text-2xl font-medium transition-colors relative group ${
                    activeItem === index ? 'text-primary' : 'text-text hover:text-primary'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  onClick={(e) => handleNavClick(index, item.href)}
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  {item.name}
                  <motion.span 
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeItem === index ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 text-text/60 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <p>© {new Date().getFullYear()} Datazen</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar; 