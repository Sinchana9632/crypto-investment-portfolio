import { useState } from 'react';
import { Download, FileText, Mail } from 'lucide-react';
import { ReportGenerator, PortfolioAsset, RiskAssessment } from '../lib/calculations';

export default function ReportExportSection() {
  const [portfolioName, setPortfolioName] = useState('My Crypto Portfolio');
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const sampleAssets: PortfolioAsset[] = [
    {
      asset: { symbol: 'BTC', name: 'Bitcoin', currentPrice: 45000, historicalPrices: [] },
      units: 0.5,
      entryPrice: 40000,
      allocation: 50
    },
    {
      asset: { symbol: 'ETH', name: 'Ethereum', currentPrice: 2500, historicalPrices: [] },
      units: 10,
      entryPrice: 2000,
      allocation: 50
    }
  ];

  const sampleRisk: RiskAssessment = {
    riskScore: 72,
    volatility: 0.15,
    predictedReturn: 0.25,
    sharpeRatio: 1.67
  };

  const handleGenerateReport = () => {
    const csv = ReportGenerator.generateCSV(
      portfolioName,
      sampleAssets,
      sampleRisk,
      new Date()
    );
    setGeneratedReport(csv);
  };

  const handleDownloadCSV = () => {
    if (!generatedReport) return;

    const element = document.createElement('a');
    const file = new Blob([generatedReport], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = `${portfolioName.replace(/\s+/g, '_')}_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendEmail = () => {
    alert('Email functionality would send the report to your configured email address.\n\nReport Details:\n' + generatedReport?.substring(0, 200) + '...');
  };

  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
            <span className="text-amber-400 font-semibold">Report & File Saver</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Generate & Export Reports
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Create comprehensive portfolio reports in CSV format and send automated email alerts for market changes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">Report Configuration</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-slate-200">
                  Portfolio Name
                </label>
                <input
                  type="text"
                  value={portfolioName}
                  onChange={(e) => setPortfolioName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold mb-4">Sample Portfolio</h4>
                {sampleAssets.map((asset) => (
                  <div key={asset.asset.symbol} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">{asset.asset.symbol}</span>
                    <span className="font-semibold text-white">{asset.units} units @ ${asset.asset.currentPrice}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <h4 className="font-semibold mb-4">Risk Metrics</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Risk Score</span>
                  <span className="font-semibold text-amber-400">{sampleRisk.riskScore.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Volatility</span>
                  <span className="font-semibold text-blue-400">{(sampleRisk.volatility * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Expected Return</span>
                  <span className="font-semibold text-emerald-400">{(sampleRisk.predictedReturn * 100).toFixed(2)}%</span>
                </div>
              </div>

              <button
                onClick={handleGenerateReport}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Generate Report
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">Report Preview & Export</h3>

            {generatedReport ? (
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 max-h-64 overflow-y-auto">
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono">
                    {generatedReport}
                  </pre>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleDownloadCSV}
                    className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download CSV
                  </button>

                  <button
                    onClick={handleSendEmail}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Send Email Alert
                  </button>
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                  <p className="text-sm text-slate-400 mb-2">File Information</p>
                  <p className="text-xs text-slate-300">
                    {generatedReport.split('\n').length} rows • Generated: {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-slate-400">
                <div className="text-center">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Generate a report to preview and export</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            Email Alert Features
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 text-sm">
            <li>• Daily portfolio performance summary</li>
            <li>• Price change alerts (above 5% daily)</li>
            <li>• Rebalancing recommendations</li>
            <li>• Risk level changes notifications</li>
            <li>• Weekly performance reports</li>
            <li>• Custom alert thresholds</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
