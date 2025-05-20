import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
// Explicitly import from components directory with full path to avoid conflicts
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Events from './components/Events'
import Team from './components/Team'
import Footer from './components/Footer'
import RetroDialog from './components/RetroDialog'

// Define types for intersection observer
interface SectionRef {
  ref: React.RefObject<HTMLElement>;
  id: string;
}

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Refs for each section for intersection observer
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  
  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  useEffect(() => {
    // Add smooth scroll behavior to the entire document
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Show dialog after content is loaded
      setTimeout(() => {
        setShowDialog(true);
      }, 1000);
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);
  
  // Set up intersection observer for sections
  useEffect(() => {
    const sectionRefs: SectionRef[] = [
      { ref: heroRef, id: 'home' },
      { ref: aboutRef, id: 'about' },
      { ref: eventsRef, id: 'events' },
      { ref: teamRef, id: 'team' }
    ];
    
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.3
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          
          // Add active class for animations
          const elements = entry.target.querySelectorAll('.reveal');
          elements.forEach((el: Element) => {
            el.classList.add('active');
          });
          
          // Add active class for staggered animations
          const staggerItems = entry.target.querySelectorAll('.stagger-item');
          staggerItems.forEach((el: Element) => {
            el.classList.add('active');
          });
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionRefs.forEach(({ref}) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => {
      sectionRefs.forEach(({ref}) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [isLoaded]);

  return (
    <main className="relative min-h-screen bg-background text-text overflow-x-hidden">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center">
            <div className="mb-4 flex space-x-1">
              <span className="inline-block w-4 h-4 bg-primary rounded-sm animate-pulse"></span>
              <span className="inline-block w-4 h-4 bg-primary rounded-sm animate-pulse" style={{animationDelay: '0.2s'}}></span>
              <span className="inline-block w-4 h-4 bg-primary rounded-sm animate-pulse" style={{animationDelay: '0.4s'}}></span>
            </div>
            <span className="text-xl font-bold text-primary">
              Loading Datazen...
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <motion.div 
        className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ y: backgroundY }}
      >
        {/* Navbar with active section highlight */}
        <Navbar activeSection={activeSection} />
        
        {/* Sections with improved transitions */}
        <div className="sections-container relative">
          {/* Hero Section */}
          <section ref={heroRef} id="home">
            <Hero />
          </section>

          {/* About Section with overlap for smooth transition */}
          <section ref={aboutRef} id="about" className="section-transition">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background to-transparent z-10"></div>
            <About />
          </section>

          {/* Events Section with overlap for smooth transition */}
          <section ref={eventsRef} id="events" className="section-transition">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background to-transparent z-10"></div>
            <Events />
          </section>

          {/* Team Section with overlap for smooth transition */}
          <section ref={teamRef} id="team" className="section-transition">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background to-transparent z-10"></div>
            <Team />
          </section>

          {/* Footer with overlap for smooth transition */}
          <div className="section-transition">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background to-transparent z-10"></div>
            <Footer />
          </div>
        </div>

        {/* Retro Dialog */}
        {showDialog && (
          <RetroDialog 
            message="Create an account to save your progress ;)" 
            onClose={() => setShowDialog(false)}
          />
        )}
      </motion.div>
    </main>
  )
}

export default App
