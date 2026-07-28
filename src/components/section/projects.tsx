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

        const handleMouseUp = () => {
            setDraggedStar(null);
            isDraggingRef.current = false;
            setStars(prevStars =>
                prevStars.map(s => ({ ...s, isDragging: false }))
            );
        };

        const handleTouchEnd = () => {
            setDraggedStar(null);
            isDraggingRef.current = false;
            setStars(prevStars =>
                prevStars.map(s => ({ ...s, isDragging: false }))
            );
        };

        if (draggedStar !== null) {
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
    }, [draggedStar]);

    // Carousel navigation
    const totalPages = Math.ceil(socialLinks.length / projectsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setDirection('right');
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setDirection('left');
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDotClick = (pageIndex: number) => {
        if (pageIndex !== currentPage) {
            setDirection(pageIndex > currentPage ? 'right' : 'left');
            setCurrentPage(pageIndex);
        }
    };

    const getCarouselTransform = () => {
        const percentage = currentPage * 100;
        return direction === 'right' ? `translateX(-${percentage}%)` : `translateX(-${percentage}%)`;
    };

    // Get the social links for the current page
    const currentProjects = socialLinks.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    );

    return (
        <section id="projects" className="py-20 relative min-h-[60vh] overflow-hidden px-6 md:px-12">
            {/* Floating stars background */}
            <div
                ref={containerRef}
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{ zIndex: 0 }}
            >
                {stars.map(star => (
                    <img
                        key={star.id}
                        src={star.image}
                        alt="star"
                        className={`absolute w-4 h-4 select-none transition-transform duration-100 ${star.isDragging ? 'cursor-grabbing scale-125' : 'cursor-grab'
                            }`}
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                        }}
                        onMouseDown={handleStarMouseDown(star.id)}
                        onTouchStart={handleStarTouchStart(star.id)}
                    />
                ))}
                {/* Special "drag me" star - always white */}
                <img
                    src={specialStars[0]}
                    alt="drag me star"
                    className={`absolute w-6 h-6 select-none transition-transform duration-100 ${isDraggingSpecial ? 'cursor-grabbing scale-125' : 'cursor-grab hover:scale-110'
                        }`}
                    style={{
                        left: `${specialStar.x}%`,
                        top: `${specialStar.y}%`,
                    }}
                    onMouseDown={handleSpecialStarMouseDown}
                    onTouchStart={handleSpecialStarTouchStart}
                />
            </div>

            <TooltipProvider>
                <div className="relative z-10 max-w-6xl mx-auto" style={{ zIndex: 1 }}>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 dark:bg-red-600 rounded-lg flex items-center justify-center shadow-lg" style={{ transition: 'background-color 0.3s ease' }}>
                                <Code size={24} className="text-white" />
                            </div>
                            <div>
                                <CardTitle
                                    className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2"
                                    style={{
                                        transition: 'color 0.3s ease, background-color 0.3s ease',
                                        textShadow: isDarkMode ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    projects
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    featured projects and open-source contributions
                                </CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={handlePrev}
                                        disabled={currentPage === 0}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${currentPage === 0
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400'
                                            }`}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Previous</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={handleNext}
                                        disabled={currentPage === totalPages - 1}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${currentPage === totalPages - 1
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400'
                                            }`}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Next</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Projects Carousel */}
                    <div className="relative">
                        <div
                            className="flex transition-transform duration-500 ease-in-out w-full"
                            style={{ transform: getCarouselTransform() }}
                        >
                            {social

        // Keep within bounds
        const clampedX = Math.max(0, Math.min(95, x));
                            const clampedY = Math.max(0, Math.min(95, y));

        setStars(prevStars =>
          prevStars.map(s =>
                            s.id === draggedStar ? {...s, x: clampedX, y: clampedY } : s
                            )
                            );
      }
    };

    const handleMouseUp = () => {
      if (draggedStar !== null) {
                                setStars(prevStars =>
                                    prevStars.map(s => s.id === draggedStar ? { ...s, isDragging: false } : s)
                                );
                            setDraggedStar(null);
                            isDraggingRef.current = false;
      }
    };

    const handleTouchEnd = () => {
      if (draggedStar !== null) {
                                setStars(prevStars =>
                                    prevStars.map(s => s.id === draggedStar ? { ...s, isDragging: false } : s)
                                );
                            setDraggedStar(null);
                            isDraggingRef.current = false;
      }
    };

                            if (draggedStar !== null) {
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
  }, [draggedStar]);

                            // project data - these are the main cards
                            const projects = [
                            {
                                title: "RoadVision",
                            description: "Trained a YOLOv8 ML model for 70 epochs to achieve 88% accuracy in detecting road damage. Developed FastAPI microservices to automate complaint filing and built a React dashboard with Leaflet for live mapping.",
                            technologies: ["YOLOv8", "FastAPI", "React", "Leaflet"],
                            icon: comingSoon,
                            detailsUrl: socialLinks.repositories.projectOne,
                            githubUrl: socialLinks.repositories.projectOne
    },
                            {
