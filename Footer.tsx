import { Github, Twitter, Linkedin, Mail, TrendingUp } from 'lucide-react';

export default function Footer() {
  const links = {
    product: [
      { label: 'Features', href: '#' },
      { label: 'Modules', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' }
    ],
    company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' }
    ],
    resources: [
      { label: 'Getting Started', href: '#' },
      { label: 'Tutorials', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Support', href: '#' }
    ]
  };

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">CryptoManager</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Professional-grade Python crypto investment manager with parallel processing, AI predictions, and comprehensive risk management tools.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 capitalize">{category}</h3>
              <ul className="space-y-3">
                {items.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2024 Python Crypto Investment Manager. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
