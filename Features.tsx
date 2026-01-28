import { useEffect, useState, useRef } from 'react';
import { Database, Mail, BarChart3, Cpu, Lock, Zap, FileSpreadsheet, TrendingUp, RefreshCw } from 'lucide-react';

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
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

  const features = [
    {
      icon: Cpu,
      title: 'Parallel Processing',
      description: 'Simultaneous task execution for risk checks and predictions, maximizing computational efficiency.'
    },
    {
      icon: Database,
      title: 'Time-Series Database',
      description: 'Optimized database storage for historical data, trends, and market patterns with instant retrieval.'
    },
    {
      icon: FileSpreadsheet,
      title: 'CSV Exports',
      description: 'Export comprehensive reports and data to CSV format for external analysis and record-keeping.'
    },
    {
      icon: Mail,
      title: 'Email Alerts',
      description: 'Automated email notifications for significant portfolio changes, opportunities, and risk alerts.'
    },
    {
      icon: BarChart3,
      title: 'Rule-Based Testing',
      description: 'Create and test investment strategies using mathematical rules before deploying real capital.'
    },
    {
      icon: TrendingUp,
      title: 'Return Predictions',
      description: 'AI-powered forecasting models predict future returns based on historical price changes and patterns.'
    },
    {
      icon: RefreshCw,
      title: 'Auto Rebalancing',
      description: 'Intelligent spreading rules automatically adjust your portfolio as market conditions evolve.'
    },
    {
      icon: Lock,
      title: 'Risk Management',
      description: 'Comprehensive risk assessment tools keep your investments protected with real-time monitoring.'
    },
    {
      icon: Zap,
      title: 'Real-Time Analytics',
      description: 'Live market data processing with instant calculations for immediate trading decisions.'
    }
  ];

  return (
    <div ref={sectionRef} className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
            <span className="text-emerald-400 font-semibold">Feature-Rich Platform</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Everything You Need
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A complete toolkit for professional crypto investment management without the need for external mathematical tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-500 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="inline-flex p-3 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
