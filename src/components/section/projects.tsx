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
