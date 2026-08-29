import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';

const Experience = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const experiences = [
    {
      title: "Frontend Developer Intern",
      company: "BrainQuest",
      location: "Remote",
      period: "March 2026 – July 2026",
      description: [
        "Engineered responsive, dynamic user interfaces using React.js, optimizing component rendering logic to reduce average page load times by 20%.",
        "Collaborated with product stakeholders to translate UI/UX wireframes into functional, interactive web components, ensuring seamless cross-browser compatibility.",
        "Integrated RESTful APIs and implemented centralized state management, improving data flow efficiency and reducing client-side bug reports by 15%."
      ]
    },
    {
      title: "DSA Lead",
      company: "GDG - GEC Bilaspur",
      location: "Bilaspur, Chhattisgarh",
      period: "2025 – Present",
      description: [
        "Lead DSA sessions and mentor 50+ students in problem solving and algorithmic thinking.",
        "Organize peer programming workshops, hackathon preps, and technical sessions to build a strong engineering culture on campus."
      ]
    }
  ];

  return (
    <section id="experience" className="py-8 relative" style={{
      background: themeColors.background.sections?.experience || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      {/* Subtle gradient overlay for top edge blending */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 1
        }}
      />
      {/* Subtle gradient overlay for bottom edge blending to white divider */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{