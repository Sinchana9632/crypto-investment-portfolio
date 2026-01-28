import { useState } from 'react';
import { Activity, AlertTriangle, TrendingDown } from 'lucide-react';
import { RiskAnalyzer, PortfolioAsset, Asset } from '../lib/calculations';

export default function RiskAssessmentSection() {
  const [selectedAssets, setSelectedAssets] = useState<PortfolioAsset[]>([
    {
      asset: {
        symbol: 'BTC',
        name: 'Bitcoin',
        currentPrice: 45000,
        historicalPrices: [40000, 41000, 42500, 41800, 43200, 44500, 45000, 44800, 45200, 45000]
      },
      units: 0.5,
      entryPrice: 40000,
      allocation: 50
    },
    {
      asset: {
        symbol: 'ETH',
        name: 'Ethereum',
        currentPrice: 2500,
        historicalPrices: [2000, 2100, 2200, 2150, 2300, 2400, 2500, 2450, 2520, 2500]
      },
      units: 10,
      entryPrice: 2000,
      allocation: 50
    }
  ]);

  const [riskAssessment, setRiskAssessment] = useState<any>(null);
  const [predictions, setPredictions] = useState<any>(null);
  const [stressTestResults, setStressTestResults] = useState<any>(null);

  const handleAnalyzeRisk = () => {
    const risk = RiskAnalyzer.assessPortfolioRisk(selectedAssets);
    setRiskAssessment(risk);

    const assetPredictions = selectedAssets.map(asset => ({
      symbol: asset.asset.symbol,
      prediction: RiskAnalyzer.predictFutureReturn(asset.asset.historicalPrices, 30)
    }));
    setPredictions(assetPredictions);

    const scenarios = [
      { name: 'Bull Market (+20%)', priceChange: 0.2 },
      { name: 'Normal (+5%)', priceChange: 0.05 },
      { name: 'Bear Market (-15%)', priceChange: -0.15 },
      { name: 'Crash (-30%)', priceChange: -0.3 }
    ];

    const stressTest = RiskAnalyzer.assessPortfolioRisk(selectedAssets);
    setStressTestResults(scenarios.map(scenario => ({
      name: scenario.name,
      change: scenario.priceChange * 100
    })));
  };

  const getRiskLevel = (score: number): { level: string; color: string; icon: typeof AlertTriangle } => {
    if (score < 30) return { level: 'Low Risk', color: 'text-emerald-400', icon: AlertTriangle };
    if (score < 60) return { level: 'Moderate Risk', color: 'text-amber-400', icon: AlertTriangle };
    return { level: 'High Risk', color: 'text-red-400', icon: AlertTriangle };
  };

  const updateAssetPrices = (index: number, prices: number[]) => {
    const updated = [...selectedAssets];
    updated[index].asset.historicalPrices = prices;
    setSelectedAssets(updated);
  };

  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
            <span className="text-emerald-400 font-semibold">Risk Checker & Predictor</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Parallel Risk Analysis & Prediction
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Analyze market volatility, predict future returns, and stress test your portfolio across multiple scenarios simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {selectedAssets.map((asset, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">{asset.asset.symbol}</h3>

              <div className="mb-4">
                <label className="text-sm text-slate-400 block mb-2">Historical Prices (comma-separated)</label>
                <textarea
                  value={asset.asset.historicalPrices.join(', ')}
                  onChange={(e) => {
                    const prices = e.target.value.split(',').map(p => Number(p.trim()));
                    updateAssetPrices(idx, prices);
                  }}
                  className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  rows={4}
                />
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-slate-400">Current Price: <span className="text-white font-semibold">${asset.asset.currentPrice}</span></p>
                <p className="text-slate-400">Volatility: <span className="text-white font-semibold">{(RiskAnalyzer.calculateVolatility(asset.asset.historicalPrices) * 100).toFixed(2)}%</span></p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleAnalyzeRisk}
          className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center gap-2 mb-8"
        >
          <Activity className="w-5 h-5" />
          Analyze Risk & Predict Returns
        </button>

        {riskAssessment && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Risk Assessment</h3>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Risk Score</p>
                  <p className={`text-3xl font-bold ${getRiskLevel(riskAssessment.riskScore).color}`}>
                    {riskAssessment.riskScore.toFixed(1)}/100
                  </p>
                  <p className={`text-sm font-semibold mt-2 ${getRiskLevel(riskAssessment.riskScore).color}`}>
                    {getRiskLevel(riskAssessment.riskScore).level}
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Portfolio Volatility</p>
                  <p className="text-2xl font-bold text-blue-400">{(riskAssessment.volatility * 100).toFixed(2)}%</p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Expected Annual Return</p>
                  <p className={`text-2xl font-bold ${riskAssessment.predictedReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {riskAssessment.predictedReturn.toFixed(2)}%
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Sharpe Ratio</p>
                  <p className="text-2xl font-bold text-amber-400">{riskAssessment.sharpeRatio.toFixed(3)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-amber-400" />
                30-Day Predictions
              </h3>

              <div className="space-y-4">
                {predictions && predictions.map((pred: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{pred.symbol}</span>
                      <span className={`text-lg font-bold ${pred.prediction >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pred.prediction.toFixed(2)}%
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${pred.prediction >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(Math.abs(pred.prediction), 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-sm text-slate-400 mb-2">Portfolio Recommendation</p>
                <p className="text-white">
                  {riskAssessment.sharpeRatio > 1 ? 'Strong risk-adjusted returns' : 'Consider rebalancing'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
