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
