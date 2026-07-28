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

    const handleSpecialStarTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation();
        setIsDraggingSpecial(true);
        isDraggingRef.current = true;
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDraggingSpecial && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                // Keep within bounds
                const clampedX = Math.max(0, Math.min(95, x));
                const clampedY = Math.max(0, Math.min(95, y));

                setSpecialStar({ x: clampedX, y: clampedY });
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isDraggingSpecial && containerRef.current && e.touches.length > 0) {
                const rect = containerRef.current.getBoundingClientRect();
                const touch = e.touches[0];
                const x = ((touch.clientX - rect.left) / rect.width) * 100;
                const y = ((touch.clientY - rect.top) / rect.height) * 100;

                // Keep within bounds
                const clampedX = Math.max(0, Math.min(95, x));
                const clampedY = Math.max(0, Math.min(95, y));

                setSpecialStar({ x: clampedX, y: clampedY });
            }
        };

        const handleMouseUp = () => {
            setIsDraggingSpecial(false);
            isDraggingRef.current = false;
        };

        const handleTouchEnd = () => {
            setIsDraggingSpecial(false);
            isDraggingRef.current = false;
        };

        if (isDraggingSpecial) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDraggingSpecial]);

    // Drag handlers for regular stars
    const handleStarMouseDown = (starId: number) => (e: React.MouseEvent) => {
        e.stopPropagation();
        setDraggedStar(starId);
        isDraggingRef.current = true;
        setStars(prevStars =>
            prevStars.map(s => s.id === starId ? { ...s, isDragging: true } : s)
        );
    };

    const handleStarTouchStart = (starId: number) => (e: React.TouchEvent) => {
        e.stopPropagation();
        setDraggedStar(starId);
        isDraggingRef.current = true;
        setStars(prevStars =>
            prevStars.map(s => s.id === starId ? { ...s, isDragging: true } : s)
        );
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (draggedStar !== null && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                // Keep within bounds
                const clampedX = Math.max(0, Math.min(95, x));
                const clampedY = Math.max(0, Math.min(95, y));

                setStars(prevStars =>
                    prevStars.map(s =>
                        s.id === draggedStar ? { ...s, x: clampedX, y: clampedY } : s
                    )
                );
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (draggedStar !== null && containerRef.current && e.touches.length > 0) {
                const rect = containerRef.current.getBoundingClientRect();
                const touch = e.touches[0];
                const x = ((touch.clientX - rect.left) / rect.width) * 100;
                const y = ((touch.clientY - rect.top) / rect.height) * 100;

