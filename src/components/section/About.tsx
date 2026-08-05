import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AsciiMorphText from '../AsciiMorphText';
import TypewriterCarousel from '../TypewriterCarousel';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors, withAlpha } from '../../hooks/useThemeColors';
import { aboutMeJournalWebp800, aboutMeJournalWebp400, profile1, profile2, profile3, stickers as stickerImages } from '../../assets';


const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [asciiText, setAsciiText] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const roles = [
    'Software Engineer',
    'Systems Engineer',
    'Frontend Developer',
    'Full-Stack Developer',
    'DSA Lead',
  ];

  const profileImages = [
    { src: profile1, caption: "photo 1" },
    { src: profile2, caption: "photo 2" },
    { src: profile3, caption: "photo 3" }
  ];

  const fullAsciiArt = `                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     \`$/              
           __                        O$               
       _.-"  )                        $'              
    .-"\`. .-"\:        o      ___     ($o              
 .-".-  .'   ;      ,st+.  .' , \\    ($               
:_..-+"\`    :       T   "^T==^;\\;;-._ $\\              
   """"-,   ;       '    /  \`-:-// / )$/              
        :   ;           /   /  :/ / /dP               
        :   :          /   :    )^-: l               
        ;    ;        /    ;    \`.___, \\           .-,
       :     :       :  /  ;.q$$$$$$b   \\$$$p,    /  ;
       ;   :  ;      ; :   :$$$$$$$$$b   T$$$$b .'  / 
       ;   ;  :      ;   _.:$$$$$$$$$$    T$$P^"   /l 
       ;.__L_.:   .q$;  :$$$$$$$$$$$$$;_   TP .-" / ; 
       :$$$$$$;.q$$$$$  $$$$$$$$$$$$$$$$b  / /  .' /  
        $$$$$$$$$$$$$;  $$$$$$$$P^" "^Tb$b/   .'  :   
        :$$$$$$$$$$$$;  $$$$P^jp,      \`$$_.+'    ;   
        $$$$$$$$$$$$$;  :$$$.d$$;\`- _.-d$$ /     :    
        '^T$$$$$P^^"/   :$$$$$$P      d$$;/      ;    
                   :    $$$$$$P"-. .--$$P/      :     
                   ;    $$$$P'( ,    d$$:b     .$     
                   :    :$$P .-dP-'  $^'$$bqqpd$$     
                    \`.   "" ' s")  .'  d$$$$$$$$'     
                      \\           /;  :$$$$$$$P'      
                    _  "-, ;       '.  T$$$$P'        
                   / "-.'  :    .--.___.\`^^'          
                  /      . :  .'                      
                  ),sss.  \\  :  bug                   
                 : TP""Tb. ; ;                        
                 ;  Tb  dP   :                        
                 :   TbdP    ;                        
                  \\   $P    /                         
                   \`.___.-'`;

  // Typewriter effect for ASCII art
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 3; // Speed in milliseconds

    const typeWriter = () => {
      if (currentIndex < fullAsciiArt.length) {
        setAsciiText(fullAsciiArt.substring(0, currentIndex + 15));
        currentIndex += 15;
        setTimeout(typeWriter, typingSpeed);
      }
    };

    // Start typing after a small delay
    const startDelay = setTimeout(() => {
      typeWriter();
    }, 500);

    return () => clearTimeout(startDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;

          // Calculate how much of the section is in view
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(sectionHeight, windowHeight - rect.top);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          const progress = visibleHeight / windowHeight;
          setScrollProgress(Math.min(1, Math.max(0, progress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus management for modal
  useEffect(() => {
    if (showProfileModal) {
      // Focus the modal when it opens
      const timer = setTimeout(() => {
        const modal = document.querySelector('[role="region"][aria-label="Profile photo carousel"]') as HTMLElement;
        if (modal) {
          modal.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showProfileModal]);

  // Carousel navigation functions
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? profileImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === profileImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'Escape') {
      setIsClosing(true);
      setTimeout(() => {
        setShowProfileModal(false);
        setIsClosing(false);
      }, 300);
    }
  };

  const stickers = [
    { id: 1, image: stickerImages[0], initialX: -180, initialY: -80, finalX: -550, finalY: -100, mobileInitialX: -120, mobileInitialY: -60, mobileFinalX: -250, mobileFinalY: -80 },
    { id: 2, image: stickerImages[1], initialX: 180, initialY: -60, finalX: 600, finalY: -250, mobileInitialX: 120, mobileInitialY: -40, mobileFinalX: 200, mobileFinalY: -120 },
    { id: 3, image: stickerImages[2], initialX: -160, initialY: 240, finalX: -200, finalY: 380, mobileInitialX: -100, mobileInitialY: 160, mobileFinalX: -120, mobileFinalY: 220 },
    { id: 4, image: stickerImages[3], initialX: 190, initialY: 260, finalX: 500, finalY: 150, mobileInitialX: 110, mobileInitialY: 180, mobileFinalX: 180, mobileFinalY: 120 },
    { id: 5, image: stickerImages[4], initialX: -200, initialY: 120, finalX: -200, finalY: -380, mobileInitialX: -130, mobileInitialY: 80, mobileFinalX: -130, mobileFinalY: -180 },
    { id: 6, image: stickerImages[5], initialX: 170, initialY: 100, finalX: 150, finalY: -360, mobileInitialX: 110, mobileInitialY: 70, mobileFinalX: 100, mobileFinalY: -160 },
    { id: 7, image: stickerImages[6], initialX: -130, initialY: -130, finalX: -450, finalY: -380, mobileInitialX: -90, mobileInitialY: -90, mobileFinalX: -200, mobileFinalY: -200 },
    { id: 8, image: stickerImages[7], initialX: 150, initialY: 200, finalX: 200, finalY: 350, mobileInitialX: 100, mobileInitialY: 140, mobileFinalX: 130, mobileFinalY: 200 },
    { id: 9, image: stickerImages[8], initialX: -140, initialY: 300, finalX: -500, finalY: 200, mobileInitialX: -90, mobileInitialY: 200, mobileFinalX: -180, mobileFinalY: 160 },
    { id: 10, image: stickerImages[9], initialX: 200, initialY: 120, finalX: 500, finalY: -380, mobileInitialX: 130, mobileInitialY: 80, mobileFinalX: 200, mobileFinalY: -180 },
    { id: 11, image: stickerImages[10], initialX: -220, initialY: -40, finalX: 600, finalY: 10, mobileInitialX: -140, mobileInitialY: -30, mobileFinalX: 220, mobileFinalY: 10 },
    { id: 12, image: stickerImages[11], initialX: 110, initialY: -180, finalX: 500, finalY: 300, mobileInitialX: 80, mobileInitialY: -120, mobileFinalX: 180, mobileFinalY: 180 },
    { id: 13, image: stickerImages[12], initialX: -120, initialY: 360, finalX: 500, finalY: -100, mobileInitialX: -80, mobileInitialY: 240, mobileFinalX: 180, mobileFinalY: -80 },
    { id: 14, image: stickerImages[13], initialX: 210, initialY: 40, finalX: -640, finalY: -220, mobileInitialX: 140, mobileInitialY: 30, mobileFinalX: -220, mobileFinalY: -140 },
    { id: 15, image: stickerImages[14], initialX: -100, initialY: 160, finalX: -400, finalY: 320, mobileInitialX: -70, mobileInitialY: 110, mobileFinalX: -150, mobileFinalY: 200 },
    { id: 16, image: stickerImages[15], initialX: 130, initialY: -100, finalX: -600, finalY: 100, mobileInitialX: 90, mobileInitialY: -70, mobileFinalX: -200, mobileFinalY: 80 },
  ];
