import { useState, useEffect } from 'react'
// Explicitly import from components directory with full path to avoid conflicts
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Events from './components/Events'
import Team from './components/Team'
import Footer from './components/Footer'
import RetroDialog from './components/RetroDialog'

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

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

  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]">
          <div className="flex flex-col items-center">
            <div className="mb-4 flex space-x-1">
              <span className="inline-block w-4 h-4 bg-red-500 rounded-sm animate-pulse"></span>
              <span className="inline-block w-4 h-4 bg-red-500 rounded-sm animate-pulse" style={{animationDelay: '0.2s'}}></span>
              <span className="inline-block w-4 h-4 bg-red-500 rounded-sm animate-pulse" style={{animationDelay: '0.4s'}}></span>
            </div>
            <span className="text-xl font-bold text-red-500">
              Loading Datazen...
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navbar */}
        <Navbar />
        
        {/* Sections with improved transitions */}
        <div className="sections-container relative">
          {/* Hero Section */}
          <Hero />

          {/* About Section with overlap for smooth transition */}
          <div className="section-transition">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-transparent z-10"></div>
            <About />
          </div>

          {/* Events Section with overlap for smooth transition */}
          <div className="section-transition">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-transparent z-10"></div>
            <Events />
          </div>

          {/* Team Section with overlap for smooth transition */}
          <div className="section-transition">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-transparent z-10"></div>
            <Team />
          </div>

          {/* Footer with overlap for smooth transition */}
          <div className="section-transition">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-transparent z-10"></div>
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
      </div>
    </main>
  )
}

export default App
