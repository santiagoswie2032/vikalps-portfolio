import { useState, useRef, useEffect } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ExternalLink, Code, Bug, ChevronLeft, ChevronRight } from 'lucide-react';
import { socialLinks } from '../../config/socialLinks';
import { lightStars, darkStars, specialStars } from '../../assets/stars';
import { comingSoon } from '../../assets';

const Projects = () => {
    const { isDarkMode } = useDarkMode();
    const themeColors = useThemeColors();

    // track all the random background stars
    const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; image: string; isDragging: boolean }>>([]);
    const [draggedStar, setDraggedStar] = useState<number | null>(null);

    // the special "drag me" star
    const [specialStar, setSpecialStar] = useState<{ x: number; y: number }>({ x: 85, y: 8 });
    const [isDraggingSpecial, setIsDraggingSpecial] = useState(false);

    // carousel state
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const projectsPerPage = 4;

    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    useEffect(() => {
        // spawn stars when component mounts or dark mode changes
        const generatedStars = Array.from({ length: 30 }, (_, i) => {
            let x, y;

            // Keep stars away from the title and cards area (roughly 20-80% horizontally, 15-85% vertically)
            const zone = i % 4;
            if (zone === 0) {
                // top area - above the title
                x = Math.random() * 90 + 5;
                y = Math.random() * 10; // Only in top 10%
            } else if (zone === 1) {
                // bottom area - below the cards
                x = Math.random() * 90 + 5;
                y = Math.random() * 10 + 90; // Only in bottom 10%
            } else if (zone === 2) {
                // left side
                x = Math.random() * 15; // Only in left 15%
                y = Math.random() * 60 + 20; // Middle vertical area
            } else {
                // right side
                x = Math.random() * 15 + 85; // Only in right 15%
                y = Math.random() * 60 + 20; // Middle vertical area
            }

            return {
                id: i,
                x: x,
                y: y,
                image: (isDarkMode ? darkStars : lightStars)[Math.floor(Math.random() * (isDarkMode ? darkStars : lightStars).length)],
                isDragging: false
            };
        });
        setStars(generatedStars);
    }, [isDarkMode]);

    // Drag handlers for special star
    const handleSpecialStarMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDraggingSpecial(true);
        isDraggingRef.current = true;
    };
