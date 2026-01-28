import { TrendingUp, Shield, Zap, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-300">Next-Gen Crypto Investment Management</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 animate-gradient leading-tight">
          Python Crypto<br />Investment Manager
        </h1>

        <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Build intelligent crypto portfolios with Python-powered analytics, parallel risk assessment,
          and AI-driven predictions for optimal returns.
        </p>

        <p className="text-lg text-slate-400 mb-12 max-w-4xl mx-auto">
          A sophisticated investment manager leveraging Python's mathematical tools for real-time operations,
          parallel task execution for simultaneous risk checks, and database-driven insights. Features CSV exports,
          email alerts, rule-based asset optimization, return predictions, and intelligent investment spreading.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300">
            Get Started
            <TrendingUp className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300">
            View Documentation
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Shield, label: 'Risk-Optimized', desc: 'Rule-based mixing' },
            { icon: Zap, label: 'Lightning Fast', desc: 'Parallel processing' },
            { icon: TrendingUp, label: 'AI Predictions', desc: 'Data-driven returns' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="group p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <item.icon className="w-8 h-8 text-blue-400 mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-1">{item.label}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
      >
        <ChevronDown className="w-8 h-8 text-slate-400" />
      </button>
    </div>
  );
}
