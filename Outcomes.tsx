import { useEffect, useState, useRef } from 'react';
import { Target, Gauge, FileBarChart, Bell } from 'lucide-react';

export default function Outcomes() {
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

  const outcomes = [
    {
      icon: Target,
      title: 'Optimized Investment Mixing',
      description: 'Rule-based strategies to mix investments for maximum returns with minimal risk. Smart algorithms balance your portfolio automatically.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Gauge,
      title: 'Simultaneous Risk & Prediction',
      description: 'Parallel task execution checks risks and predicts outcomes at the same time, delivering lightning-fast insights for rapid decision-making.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: FileBarChart,
      title: 'Customizable Reports',
      description: 'Dynamic reports you can modify showing detailed asset performance, trends, and actionable adjustment tips tailored to your strategy.',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Bell,
      title: 'Smart Trading Alerts',
      description: 'Automated alerts with intelligent investment spreading rules keep you informed of critical changes and opportunities in real-time.',
      gradient: 'from-rose-500 to-pink-500'
    }
  ];

  return (
    <div ref={sectionRef} className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
            <span className="text-emerald-400 font-semibold">Powerful Outcomes</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            What You'll Achieve
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Transform your crypto investment strategy with professional-grade tools designed for traders who demand excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {outcomes.map((outcome, idx) => (
            <div
              key={idx}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="relative p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-300 h-full">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${outcome.gradient} rounded-t-3xl`} />

                <div className={`inline-flex p-4 bg-gradient-to-br ${outcome.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <outcome.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                  {outcome.title}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  {outcome.description}
                </p>

                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
