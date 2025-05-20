import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Simple anchor link component
const AnchorLink = ({ href, className, children }: { href: string, className?: string, children: React.ReactNode }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSquare, setActiveSquare] = useState<number | null>(null);
  const [menuState, setMenuState] = useState<'main' | 'options'>('main');
  const [selectedOption, setSelectedOption] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  
  // Add theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Motion values for scroll-based animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [3, -3]);
  const rotateY = useTransform(mouseX, [-300, 300], [-3, 3]);

  // Add new state for options
  const [graphicsQuality, setGraphicsQuality] = useState('HIGH');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState('NORMAL');

  const graphicsOptions = ['LOW', 'MEDIUM', 'HIGH', 'ULTRA'];
  const difficultyOptions = ['EASY', 'NORMAL', 'HARD', 'EXTREME'];

  const optionsMenu = [
    `GRAPHICS: ${graphicsQuality}`,
    `SOUND: ${soundEnabled ? 'ON' : 'OFF'}`,
    `DIFFICULTY: ${difficulty}`,
    'BACK'
  ];

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle light-mode class on document body
    if (isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  const handleOptionSelect = (index: number) => {
    switch(index) {
      case 0: // Graphics
        const currentGraphicsIndex = graphicsOptions.indexOf(graphicsQuality);
        setGraphicsQuality(graphicsOptions[(currentGraphicsIndex + 1) % graphicsOptions.length]);
        // Apply graphics changes
        const quality = graphicsOptions[(currentGraphicsIndex + 1) % graphicsOptions.length];
        if (quality === 'LOW') {
          document.documentElement.style.setProperty('--animation-speed', '0.5');
          document.documentElement.style.setProperty('--particle-count', '10');
        } else if (quality === 'MEDIUM') {
          document.documentElement.style.setProperty('--animation-speed', '1');
          document.documentElement.style.setProperty('--particle-count', '20');
        } else if (quality === 'HIGH') {
          document.documentElement.style.setProperty('--animation-speed', '1.5');
          document.documentElement.style.setProperty('--particle-count', '30');
        } else {
          document.documentElement.style.setProperty('--animation-speed', '2');
          document.documentElement.style.setProperty('--particle-count', '40');
        }
        break;
      case 1: // Sound
        setSoundEnabled(!soundEnabled);
        // Toggle sound effects
        if (!soundEnabled) {
          // Play a test sound when enabled
          const audio = new Audio('/sounds/select.mp3');
          audio.volume = 0.3;
          audio.play().catch(() => {}); // Catch and ignore if audio isn't loaded
        }
        break;
      case 2: // Difficulty
        const currentDiffIndex = difficultyOptions.indexOf(difficulty);
        setDifficulty(difficultyOptions[(currentDiffIndex + 1) % difficultyOptions.length]);
        break;
      case 3: // Back
        setShowOptions(false);
        setSelectedOption(0);
        break;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (showOptions) {
      switch (e.key) {
        case 'ArrowUp':
          setSelectedOption((prev) => (prev > 0 ? prev - 1 : optionsMenu.length - 1));
          break;
        case 'ArrowDown':
          setSelectedOption((prev) => (prev < optionsMenu.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
          handleOptionSelect(selectedOption);
          break;
        case 'Escape':
          setShowOptions(false);
          setSelectedOption(0);
          break;
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = containerRef.current?.getBoundingClientRect();
      
      if (rect) {
        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    // Initialize theme
    if (!isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY, scrollY, showOptions, isDarkMode]);

  return (
    <section 
      id="home"
      ref={containerRef} 
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${
        isDarkMode ? 'bg-gradient-to-b from-black via-[#0A0A0A] to-[#0A0A0A]' : 'bg-gradient-to-b from-gray-100 via-[#f0f0f0] to-[#f0f0f0]'
      } transition-colors duration-500`}
    >
      {/* Refined background with subtle gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: isDarkMode 
            ? `radial-gradient(circle at 30% 30%, rgba(255, 0, 0, 0.08), transparent 70%)`
            : `radial-gradient(circle at 30% 30%, rgba(255, 0, 0, 0.03), transparent 70%)`
        }}/>
      </div>
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 pointer-events-none opacity-50" style={{
        background: isDarkMode 
          ? 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.4) 100%)'
          : 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.1) 100%)'
      }} />

      {/* Main Content - Improved alignment */}
      <motion.div
        className="relative z-10 text-center w-full mx-auto flex flex-col items-center justify-center min-h-screen pt-24"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Title Container - Better spacing */}
        <motion.div
          className="relative flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Main Title - Adjusted size and spacing */}
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-black relative heading-8bit circuit-text hologram-base digital-distortion mb-4"
          >
            <motion.div 
              className="relative overflow-hidden py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Glitch layers for creative effect */}
              <div className="absolute inset-0 left-[2px] opacity-50 text-[#ff0000] hidden md:block" style={{ clipPath: 'polygon(0 15%, 100% 15%, 100% 17%, 0 17%, 0 40%, 100% 40%, 100% 42%, 0 42%)' }}>DATAZEN</div>
              <div className="absolute inset-0 left-[-2px] opacity-50 text-[#ff0000] hidden md:block" style={{ clipPath: 'polygon(0 65%, 100% 65%, 100% 67%, 0 67%, 0 75%, 100% 75%, 100% 77%, 0 77%)' }}>DATAZEN</div>
              
              {/* Main text with all red characters */}
              <div className="wavey-text relative text-red-600">
                <motion.div 
                  className="relative inline-block"
                  animate={{ 
                    textShadow: [
                      '0 0 5px rgba(255,0,0,0.5), 0 0 10px rgba(255,0,0,0.5)',
                      '0 0 7px rgba(255,0,0,0.7), 0 0 15px rgba(255,0,0,0.7)',
                      '0 0 5px rgba(255,0,0,0.5), 0 0 10px rgba(255,0,0,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.span 
                    className="hologram-red digital-glitch inline-block"
                    data-text="D"
                    animate={{ 
                      y: [0, -3, 0, 2, 0],
                      rotate: [0, 0.5, 0, -0.5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                  >D</motion.span>
                  <motion.span 
                    className="hologram-red inline-block"
                    animate={{ 
                      y: [0, 3, 0, -2, 0],
                      rotate: [0, -0.7, 0, 0.7, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.1 }}
                  >A</motion.span>
                  <motion.span 
                    className="hologram-red scan-text inline-block"
                    animate={{ 
                      y: [0, -2, 0, 3, 0],
                      rotate: [0, 0.3, 0, -0.3, 0]
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, repeatType: 'reverse', delay: 0.2 }}
                  >T</motion.span>
                  <motion.span 
                    className="hologram-red digital-glitch inline-block"
                    data-text="A"
                    animate={{ 
                      y: [0, 2, 0, -3, 0],
                      rotate: [0, -0.4, 0, 0.4, 0]
                    }}
                    transition={{ duration: 3.2, repeat: Infinity, repeatType: 'reverse', delay: 0.3 }}
                  >A</motion.span>
                </motion.div>
                
                <motion.div 
                  className="relative inline-block"
                  animate={{ 
                    textShadow: [
                      '0 0 5px rgba(255,0,0,0.5), 0 0 10px rgba(255,0,0,0.5)',
                      '0 0 7px rgba(255,0,0,0.7), 0 0 15px rgba(255,0,0,0.7)',
                      '0 0 5px rgba(255,0,0,0.5), 0 0 10px rgba(255,0,0,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.span 
                    className="hologram-red digital-glitch inline-block"
                    data-text="Z"
                    animate={{ 
                      y: [0, 2, 0, -3, 0],
                      rotate: [0, -0.6, 0, 0.6, 0] 
                    }}
                    transition={{ duration: 3.2, repeat: Infinity, repeatType: 'reverse', delay: 0.4 }}
                  >Z</motion.span>
                  <motion.span 
                    className="hologram-red scan-text inline-block"
                    animate={{ 
                      y: [0, -2, 0, 3, 0],
                      rotate: [0, 0.5, 0, -0.5, 0]
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                  >E</motion.span>
                  <motion.span 
                    className="hologram-red digital-glitch inline-block"
                    data-text="N"
                    animate={{ 
                      y: [0, 3, 0, -2, 0],
                      rotate: [0, -0.4, 0, 0.4, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 0.6 }}
                  >N</motion.span>
                </motion.div>
              </div>
              
              {/* Hologram projector beams - red color */}
              <motion.div
                className="absolute inset-0 z-[-1] opacity-20"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,0,0,0.2) 0%, rgba(0,0,0,0) 70%)',
                }}
                animate={{
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Overlay flicker effect */}
              <motion.div 
                className="absolute inset-0 bg-black pointer-events-none mix-blend-overlay"
                animate={{ opacity: [0, 0.03, 0, 0.01, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
              />
            </motion.div>
          </motion.h1>

          {/* Retro Line Decoration - Adjusted width */}
          <div className="relative h-2 w-48 md:w-64 mx-auto mt-2">
            <motion.div className="loading-bar w-full rounded-md" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {showOptions ? (
            <motion.div
              key="options"
              className="relative mx-auto mt-4 max-w-md w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="absolute inset-0 border-2 border-gradient-to-r from-red-500/50 to-white/50 bg-black/80 arcade-screen rounded-lg" />
              <div className="relative p-6">
                <h2 className="text-xl text-white mb-6 heading-8bit">OPTIONS</h2>
                <div className="flex flex-col gap-3">
                  {optionsMenu.map((option, index) => (
                    <motion.div
                      key={option}
                      className={`relative px-3 py-2 cursor-pointer ${selectedOption === index ? 'text-white' : 'text-white'} pixel-text text-xs md:text-sm`}
                      whileHover={{ x: 20 }}
                      onClick={() => {
                        setSelectedOption(index);
                        handleOptionSelect(index);
                      }}
                    >
                      {selectedOption === index && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 neon-red"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          ▶
                        </motion.div>
                      )}
                      {option}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-white/10 rounded-md"
                        initial={false}
                        animate={{
                          opacity: selectedOption === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-xs text-white/60 pixel-text flex items-center gap-2">
                  <div className="pixel-joystick w-3 h-3"></div> Use arrow keys to navigate, Enter to select, Esc to go back
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-3xl mx-auto"
            >
              {/* Description Box - Improved positioning and width */}
              <motion.div
                className="relative p-8 boot-text bg-black/80 w-full rounded-xl overflow-hidden mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 2, 
                  rotateY: 2,
                  boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Circuit pattern overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-10 opacity-10"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80h-80z' fill='none' stroke='%23ff0000' stroke-width='0.5'/%3E%3Cpath d='M10 50h80M50 10v80' stroke='%23ff0000' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%23ff0000'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%23ff0000'/%3E%3Ccircle cx='90' cy='10' r='2' fill='%23ff0000'/%3E%3Ccircle cx='10' cy='90' r='2' fill='%23ff0000'/%3E%3Ccircle cx='90' cy='90' r='2' fill='%23ff0000'/%3E%3C/svg%3E\")",
                    backgroundSize: "50px 50px"
                  }}
                  animate={{
                    backgroundPosition: ["0px 0px", "50px 50px"],
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />

                {/* Enhanced Border with glow */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <motion.div
                    className="absolute inset-0 border border-red-500/50 rounded-xl"
                    animate={{
                      opacity: [0.4, 0.7, 0.4],
                      boxShadow: [
                        'inset 0 0 15px rgba(255,0,0,0.2)',
                        'inset 0 0 25px rgba(255,0,0,0.4)',
                        'inset 0 0 15px rgba(255,0,0,0.2)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Add subtle pulsing background gradient */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-transparent"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Horizontal scan line effect */}
                  <motion.div
                    className="absolute left-0 right-0 h-[1px] bg-red-500/30"
                    style={{ top: "50%" }}
                    animate={{
                      top: ["0%", "100%"],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  {/* Corner decorations for the box */}
                  {[
                    { position: 'top-0 left-0', rotate: '0deg' },
                    { position: 'top-0 right-0', rotate: '90deg' },
                    { position: 'bottom-0 right-0', rotate: '180deg' },
                    { position: 'bottom-0 left-0', rotate: '270deg' }
                  ].map((corner, index) => (
                    <motion.div
                      key={`corner-${index}`}
                      className={`absolute ${corner.position} w-12 h-12`}
                      style={{ rotate: corner.rotate }}
                    >
                      <motion.div
                        className="absolute top-0 left-0 h-0.5 bg-red-500/80 w-full origin-left"
                        animate={{
                          scaleX: [0, 1],
                          opacity: [0.5, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          delay: index * 0.25,
                        }}
                      />
                      <motion.div
                        className="absolute top-0 left-0 w-0.5 bg-red-500/80 h-full origin-top"
                        animate={{
                          scaleY: [0, 1],
                          opacity: [0.5, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          delay: index * 0.25 + 0.1,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Content with improved styling */}
                <motion.div
                  className="text-lg md:text-xl lg:text-2xl text-white relative z-10"
                >
                  {/* Terminal-style header */}
                  <div className="flex flex-col space-y-1 mb-4">
                    <div className="flex items-center">
                      <motion.span 
                        className="inline-block w-2 h-4 bg-green-500 mr-2"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-green-400 text-xs font-mono">SYSTEM LOADED:</span>
                    </div>
                    <span className="text-green-400 text-xs font-mono pl-4">INITIALIZING... <motion.span
                      animate={{ opacity: [0, 1] }}
                      transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
                    >_</motion.span></span>
                    <span className="text-green-400 text-xs font-mono pl-4">CONNECTING TO DATABASE... <span className="text-green-500">SUCCESS</span></span>
                    <span className="text-green-400 text-xs font-mono pl-4">RUNNING datazen.exe...</span>
                    <motion.div 
                      className="w-full h-1 bg-gradient-to-r from-green-500 to-green-300 rounded-full mt-1 mb-2 opacity-75"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </div>
                  
                  <motion.p
                    className="mt-2 relative"
                    style={{ textShadow: '2px 2px 0px #000000' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                  >
                    <span className="text-red-500 text-sm font-mono">&gt; WELCOME TO</span>
                    <motion.span 
                      className="block text-2xl md:text-3xl mt-2 tracking-wide"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      The Official Data Science Council
                      <span className="inline-block ml-2">of</span>
                    </motion.span>
                    
                    {/* Enhanced university name with glitch effect */}
                    <motion.div
                      className="relative block mt-4 font-bold text-3xl md:text-4xl overflow-hidden"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Glitch layers */}
                      <motion.span 
                        className="absolute top-0 left-[2px] text-red-500/50 w-full"
                        animate={{
                          opacity: [0, 0.6, 0],
                          left: ["2px", "3px", "2px"],
                        }}
                        transition={{ 
                          duration: 0.15, 
                          repeat: Infinity, 
                          repeatType: "mirror",
                          repeatDelay: 7
                        }}
                      >
                        Somaiya Vidyavihar University
                      </motion.span>
                      
                      <motion.span 
                        className="absolute top-0 left-[-2px] text-blue-400/50 w-full"
                        animate={{
                          opacity: [0, 0.6, 0],
                          left: ["-2px", "-3px", "-2px"],
                        }}
                        transition={{ 
                          duration: 0.15, 
                          repeat: Infinity, 
                          repeatType: "mirror",
                          repeatDelay: 7.1
                        }}
                      >
                        Somaiya Vidyavihar University
                      </motion.span>
                      
                      {/* Main text */}
                      <motion.span
                        className="relative block"
                        animate={{
                          color: ['#ffffff', '#ff1a1a', '#ffffff'],
                          textShadow: [
                            '2px 2px 0px #000000, 0 0 10px rgba(255,0,0,0.2)',
                            '2px 2px 0px #000000, 0 0 15px rgba(255,0,0,0.4)',
                            '2px 2px 0px #000000, 0 0 10px rgba(255,0,0,0.2)'
                          ],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        Somaiya Vidyavihar University
                      </motion.span>
                    </motion.div>
                  </motion.p>
                  
                  {/* Enhanced footer line */}
                  <motion.div 
                    className="mt-8 mb-2 text-sm text-red-400/90 font-mono flex justify-between items-center border-t border-red-500/20 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-red-500"
                        animate={{
                          opacity: [1, 0.5, 1],
                          scale: [1, 0.9, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="tracking-widest">EST. 2019</span>
                    </div>
                    <span className="tracking-widest font-light">INNOVATION • INSIGHT • IMPACT</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Interactive Buttons - Adjusted spacing */}
              <div className="flex justify-center gap-10 mt-12">
                <motion.button
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '#about'}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-white/20 rounded-lg blur-sm"
                    animate={{
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative px-10 py-3 bg-black/90 border border-red-500 group-hover:border-white transition-colors duration-300 flex items-center gap-3 rounded-lg backdrop-blur-sm">
                    <div className="pixel-button w-3 h-3" />
                    <span className="text-white text-lg font-medium tracking-wider">START</span>
                  </div>
                </motion.button>

                <motion.button
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowOptions(true)}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-red-500/30 rounded-lg blur-sm"
                    animate={{
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative px-10 py-3 bg-black/90 border border-white group-hover:border-red-500 transition-colors duration-300 flex items-center gap-3 rounded-lg backdrop-blur-sm">
                    <div className="pixel-joystick w-3 h-3" />
                    <span className="text-white text-lg font-medium tracking-wider">OPTIONS</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Power LED Indicator - repositioned */}
        <motion.div
          className="absolute bottom-10 right-10 w-3 h-3 flex flex-col items-center"
        >
          <motion.div
            className="w-3 h-3 rounded-full"
            animate={{
              backgroundColor: ['#ff0000', '#ff6666', '#ff0000'],
              boxShadow: [
                '0 0 10px #ff0000',
                '0 0 20px #ff0000',
                '0 0 10px #ff0000'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-red-500 text-[10px] mt-1 pixel-text">POWER</span>
        </motion.div>
      </motion.div>

      {/* Add a footer DATAZEN branding */}
      <div className="absolute bottom-5 right-5 z-10">
        <div className="text-sm font-bold text-red-600 border border-red-600/30 rounded-md px-4 py-1 bg-black/50">
          DATAZEN
        </div>
      </div>

      {/* Corner Decorations - reduced visibility */}
      {[
        'top-0 left-0',
        'top-0 right-0 rotate-90',
        'bottom-0 right-0 rotate-180',
        'bottom-0 left-0 -rotate-90'
      ].map((position, index) => (
        <motion.div
          key={index}
          className={`absolute w-16 h-16 ${position} opacity-60`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.2 * index }}
        >
          <motion.div
            className="w-full h-full relative"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute inset-0 border-l-4 border-t-4 border-red-500" />
            <div className="absolute inset-4 border-l-2 border-t-2 border-white/30" />
          </motion.div>
        </motion.div>
      ))}

      {/* Retro Arcade Controls - simplified */}
      <div className="absolute bottom-6 left-6 flex items-center space-x-6 z-20 scale-75 opacity-70">
        <div className="flex flex-col items-center">
          <div className="pixel-joystick w-8 h-8 mb-1"></div>
          <span className="text-white text-[10px] pixel-text">MOVE</span>
        </div>
        <div className="flex space-x-2">
          <div className="flex flex-col items-center">
            <div className="pixel-button w-6 h-6 mb-1 bg-red-500"></div>
            <span className="text-white text-[10px] pixel-text">A</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="pixel-button w-6 h-6 mb-1 bg-blue-500"></div>
            <span className="text-white text-[10px] pixel-text">B</span>
          </div>
        </div>
      </div>

      {/* High Score Display - simplfied */}
      <div className="absolute top-16 right-6 z-20 pixel-text text-white text-[10px] opacity-70">
        <div className="mb-1 text-yellow-300">HIGH SCORE</div>
        <div className="text-right neon-red">00012850</div>
      </div>

      {/* Theme Toggle Button */}
      <motion.div
        className={`fixed top-4 right-4 z-50 w-12 h-6 rounded-full p-1 cursor-pointer ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
        }`}
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className={`w-4 h-4 rounded-full ${
            isDarkMode ? 'bg-white' : 'bg-red-500'
          }`}
          animate={{
            x: isDarkMode ? 0 : 24
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <span className="sr-only">Toggle theme</span>
      </motion.div>

      {/* Remove the existing scroll indicator and replace with a clean fade-out effect */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-24 z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0A0A0A, transparent)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </section>
  );
};

export default Hero; 