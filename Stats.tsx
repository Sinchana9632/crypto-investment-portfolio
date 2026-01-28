import { useEffect, useState, useRef } from 'react';
import { TrendingUp, Users, Zap, Shield } from 'lucide-react';

export default function Stats() {
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

  const stats = [
    { icon: TrendingUp, value: '99.9%', label: 'Uptime Reliability', color: 'text-emerald-400' },
    { icon: Zap, value: '<100ms', label: 'Analysis Speed', color: 'text-blue-400' },
    { icon: Shield, value: '24/7', label: 'Risk Monitoring', color: 'text-amber-400' },
    { icon: Users, value: '∞', label: 'Portfolio Support', color: 'text-purple-400' }
  ];

  return (
    <div ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`relative p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-500 hover:scale-105 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <stat.icon className={`w-10 h-10 ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`} />
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
