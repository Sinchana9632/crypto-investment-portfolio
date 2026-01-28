import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Modules from './components/Modules';
import Outcomes from './components/Outcomes';
import Stats from './components/Stats';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CalculatorSection from './components/CalculatorSection';
import RiskAssessmentSection from './components/RiskAssessmentSection';
import ReportExportSection from './components/ReportExportSection';
import SpreadingRuleSection from './components/SpreadingRuleSection';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      <div className="relative z-10">
        <Hero />
        <Stats />
        <Outcomes />
        <Modules />
        <Features />
        <CalculatorSection />
        <RiskAssessmentSection />
        <ReportExportSection />
        <SpreadingRuleSection />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

export default App;
