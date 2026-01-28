import { ArrowRight, Download, Github } from 'lucide-react';

export default function CTA() {
  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-blue-500/20 blur-3xl animate-pulse" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="relative p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500" />

          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />

          <div className="relative text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              Ready to Transform Your<br />Crypto Investment Strategy?
            </h2>

            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join traders who trust Python-powered analytics for intelligent portfolio management with zero extra tools required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Start Building Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Package
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                <span>Open Source</span>
              </div>
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
              <span>Python 3.8+</span>
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
