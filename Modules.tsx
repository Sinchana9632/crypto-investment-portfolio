import { useEffect, useState, useRef } from 'react';
import { Calculator, Activity, FileText, Settings } from 'lucide-react';

export default function Modules() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const modules = [
    {
      icon: Calculator,
      title: 'Investment Mix Calculator',
      subtitle: 'Intelligent Portfolio Optimization',
      features: [
        'Advanced mixing using repeatable rules and mathematical models',
        'Handles complex data with parallel task execution',
        'Real-time calculation and rebalancing',
        'Multi-asset correlation analysis'
      ],
      color: 'blue'
    },
    {
      icon: Activity,
      title: 'Risk Checker & Predictor',
      subtitle: 'AI-Powered Market Intelligence',
      features: [
        'Analyzes historical time-series data for pattern recognition',
        'Concurrent risk assessment using parallel processing',
        'Stores trend data in optimized database',
        'Predictive models for return forecasting'
      ],
      color: 'emerald'
    },
    {
      icon: FileText,
      title: 'Report & File Saver',
      subtitle: 'Comprehensive Data Management',
      features: [
        'Compiles detailed investment reports and analytics',
        'Exports data to CSV for external analysis',
        'Automated email alerts for significant market changes',
        'Customizable report templates and schedules'
      ],
      color: 'amber'
    },
    {
      icon: Settings,
      title: 'Spreading Rule Setter',
      subtitle: 'Dynamic Strategy Management',
      features: [
        'Creates adaptive rules to balance investments automatically',
        'Responds to market changes with intelligent reallocation',
        'Stress tests strategies across multiple scenarios',
        'Validates rule strength through backtesting'
      ],
      color: 'rose'
    }
  ];

  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      hover: 'hover:border-blue-500/50'
    },
    emerald: {
      gradient: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      hover: 'hover:border-emerald-500/50'
    },
    amber: {
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      hover: 'hover:border-amber-500/50'
    },
    rose: {
      gradient: 'from-rose-500 to-pink-500',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      hover: 'hover:border-rose-500/50'
    }
  };

  return (
    <div ref={sectionRef} className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-blue-400 font-semibold">Core Modules</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Powerful Building Blocks
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Four specialized modules working in harmony to deliver comprehensive investment management capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {modules.map((module, idx) => {
            const colors = colorClasses[module.color as keyof typeof colorClasses];

            return (
              <div
                key={idx}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onMouseEnter={() => setActiveModule(idx)}
              >
                <div className={`relative p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border ${colors.border} ${colors.hover} rounded-3xl transition-all duration-300 h-full ${
                  activeModule === idx ? 'scale-105 shadow-2xl' : ''
                }`}>
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors.gradient} rounded-t-3xl`} />

                  <div className={`inline-flex p-4 ${colors.bg} border ${colors.border} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <module.icon className={`w-8 h-8 ${colors.text}`} />
                  </div>

                  <h3 className={`text-2xl font-bold mb-2 ${colors.text}`}>
                    {module.title}
                  </h3>

                  <p className="text-slate-400 mb-6 font-medium">
                    {module.subtitle}
                  </p>

                  <ul className="space-y-3">
                    {module.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-slate-300">
                        <div className={`mt-1 w-1.5 h-1.5 rounded-full ${colors.bg} flex-shrink-0`} />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br ${colors.gradient} opacity-5 rounded-tl-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
