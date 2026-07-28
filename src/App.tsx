import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext'
import { useThemeColors } from './hooks/useThemeColors'
import { colors } from './styles/colors'
import Navigation from './components/section/Navigation'
import About from './components/section/About'
import './App.css'

// Lazy load project pages - add your project page imports here
// Example: const MyProject = lazy(() => import('./pages/projects/MyProject'))
const Contact = lazy(() => import('./pages/Contact'))

// Lazy load below-the-fold components for better initial load
const Projects = lazy(() => import('./components/section/Projects'))
const Experience = lazy(() => import('./components/section/Experience'))
const Skills = lazy(() => import('./components/section/Skills'))
const Certifications = lazy(() => import('./components/section/Certifications'))
const Footer = lazy(() => import('./components/Footer'))

function HomePage() {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  return (
    <>
      <About />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Experience />
      </Suspense>
      {/* Spider Web Line Divider */}
      <div className="w-full py-8 relative" style={{
        background: isDarkMode ? themeColors.background.gradientEnd : colors.white,
        transition: 'background 0.3s ease-in-out'
      }}>
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '60px', background: isDarkMode ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)` : `linear-gradient(180deg, ${colors.white} 0%, transparent 100%)`, zIndex: 1 }} />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '200px', background: isDarkMode ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)` : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`, zIndex: 1 }} />
        <svg className="w-full relative" style={{ zIndex: 2, height: '60px', opacity: isDarkMode ? 0.5 : 0.7 }} viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0 30 Q150 10 300 30 T600 30 T900 30 T1200 30" fill="none" stroke={isDarkMode ? '#DC2626' : '#B91C1C'} strokeWidth="2" />
          <path d="M0 30 Q150 50 300 30 T600 30 T900 30 T1200 30" fill="none" stroke={isDarkMode ? '#DC2626' : '#B91C1C'} strokeWidth="1" opacity="0.5" />
          {/* Spider at center */}
          <circle cx="600" cy="28" r="4" fill={isDarkMode ? '#DC2626' : '#B91C1C'} />
          <ellipse cx="600" cy="36" rx="2.5" ry="5" fill={isDarkMode ? '#DC2626' : '#B91C1C'} />
          <line x1="598" y1="25" x2="590" y2="18" stroke={isDarkMode ? '#DC2626' : '#B91C1C'} strokeWidth="1" />
          <line x1="602" y1="25" x2="610" y2="18" stroke={isDarkMode ? '#DC2626' : '#B91C1C'} strokeWidth="1" />
          <line x1="596" y1="30" x2="585" y2="28" stroke={isDarkMode ? '#DC2626' : '#B91C1C'} strokeWidth="1" />
          <line x1="604" y1="30" x2="615" y2="28" stroke={isDarkMode ? '#DC2626' : '#B91C1C'} strokeWidth="1" />
          <line x1="598" y1="38" x2="590" y2="46" stroke={isDarkMode ? '#DC2626' : '#B91C1C'} strokeWidth="1" />
          <line x1="602" y1="38" x2="610" y2="46" stroke={isDarkMode ? '#DC2626' : '#B91C1C'} strokeWidth="1" />
          {/* Web lines */}
          <text x="300" y="28" fill={isDarkMode ? '#DC2626' : '#B91C1C'} fontSize="16" opacity="0.6">🕸️</text>
          <text x="900" y="28" fill={isDarkMode ? '#DC2626' : '#B91C1C'} fontSize="16" opacity="0.6">🕸️</text>
        </svg>
      </div>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Skills />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Certifications />
      </Suspense>
    </>
  )
}

function AppContent() {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <Navigation />
      <div className="app transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#101727' : undefined }}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <main id="main-content" className="main-content">
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<Contact />} />
              {/* Add your project routes here */}
              {/* Example: <Route path="/projects/my-project" element={<MyProject />} /> */}
            </Routes>
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading...</div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  )
}

export default App