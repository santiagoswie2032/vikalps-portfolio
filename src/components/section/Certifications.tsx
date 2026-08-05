import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { Trophy, Award, Medal, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const Certifications = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const achievements = [
    {
      id: 'gdg-techsprint',
      title: 'GDG TechSprint Hackathon 2026',
      role: 'Team Lead',
      result: '2nd Runner Up',
      description: 'Led a team to design and pitch an innovative technical solution, competing against top teams in a fast-paced development sprint.',
      icon: Trophy,
      iconColor: '#f59e0b', // Amber/gold
    },
    {
      id: 'ntpc-tech',
      title: 'NTPC Technical Competition 2025',
      role: 'Participant',
      result: 'Regional Finals, 3rd Place',
      description: 'Competed in engineering and technical design rounds, securing third place in the regional finals.',
      icon: Award,
      iconColor: '#3b82f6', // Blue
    },
    {
      id: 'ssh-26',
      title: 'Symbiosis Skill Hackathon (SSH 26)',
      role: 'Finalist',
      result: 'National Finalist (Indore)',
      description: 'Recognized among national finalists for developing a robust project and pitching to a panel of industry experts.',
      icon: Medal,
      iconColor: '#ec4899', // Pink
    },
    {
      id: 'iiit-esummit',
      title: 'IIIT Naya Raipur E-Summit Hackathon 2026',
      role: 'Finalist',
      result: 'National Finalist (Top 120 teams)',
      description: 'Built a functional product prototype addressing real-world problem statements, reaching the final round among top teams nationally.',
      icon: CheckCircle,
      iconColor: '#10b981', // Emerald
    },
    {
      id: 'nhide',
      title: 'NHIDE National Hackathon 2026',
      role: 'Finalist',
      result: 'National Finalist (Top 200 teams)',
      description: 'Developed an innovative prototype addressing national-level challenges, placing in the top 200 teams nationwide.',
      icon: CheckCircle,
      iconColor: '#8b5cf6', // Violet
    }
  ];

  return (
    <section id="certifications" className="py-20 relative" style={{
      background: themeColors.background.sections?.certifications || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      {/* Subtle top blending gradient */}
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

      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-4" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>
          Achievements & Hackathons
        </h2>
        <p className="text-center mb-12 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Participating in competitive programming events and national-level hackathons to solve real-world problems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {achievements.map((ach) => {
            const IconComponent = ach.icon;
            return (
              <Card 
                key={ach.id} 
                className="group border-2 border-pink-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-white/95 dark:bg-gray-800/95 flex flex-col justify-between"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : '#fdf2f8',
                        color: ach.iconColor
                      }}
                    >
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-xl dark:text-gray-100 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
                        {ach.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 border border-pink-100 dark:border-pink-800/50">
                          {ach.role}
                        </span>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {ach.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 flex-grow">
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {ach.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom gradient overlay for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`,
          zIndex: 1
        }}
      />
    </section>
  );
};

export default Certifications;
