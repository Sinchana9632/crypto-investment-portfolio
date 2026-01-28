import { useState } from 'react';
import { Calculator, Plus, Minus, TrendingUp } from 'lucide-react';
import { InvestmentCalculator, PortfolioAsset, Asset, AllocationRule } from '../lib/calculations';

export default function CalculatorSection() {
  const [totalInvestment, setTotalInvestment] = useState<number>(10000);
  const [assets, setAssets] = useState<PortfolioAsset[]>([
    {
      asset: { symbol: 'BTC', name: 'Bitcoin', currentPrice: 45000, historicalPrices: [] },
      units: 0,
      entryPrice: 40000,
      allocation: 0
    },
    {
      asset: { symbol: 'ETH', name: 'Ethereum', currentPrice: 2500, historicalPrices: [] },
      units: 0,
      entryPrice: 2000,
      allocation: 0
    },
    {
      asset: { symbol: 'BNB', name: 'Binance Coin', currentPrice: 600, historicalPrices: [] },
      units: 0,
      entryPrice: 500,
      allocation: 0
    }
  ]);

  const [allocatedAssets, setAllocatedAssets] = useState<PortfolioAsset[]>([]);
  const [calculationResult, setCalculationResult] = useState<{
    portfolioValue: number;
    percentageReturn: number;
    totalGainLoss: number;
  } | null>(null);

  const rules: Record<string, AllocationRule> = {
    BTC: { minPercent: 0.3, maxPercent: 0.6, riskScore: 75 },
    ETH: { minPercent: 0.2, maxPercent: 0.4, riskScore: 65 },
    BNB: { minPercent: 0.1, maxPercent: 0.3, riskScore: 55 }
  };

  const handleCalculate = () => {
    const result = InvestmentCalculator.calculateAllocation(
      totalInvestment,
      assets,
      rules
    );

    setAllocatedAssets(result);

    const portfolioValue = InvestmentCalculator.calculatePortfolioValue(result);
    const percentageReturn = InvestmentCalculator.calculatePercentageReturn(result);
    const totalGainLoss = InvestmentCalculator.calculateReturns(result);

    setCalculationResult({
      portfolioValue,
      percentageReturn,
      totalGainLoss
    });
  };

  const handleAssetPriceChange = (index: number, newPrice: number) => {
    const updated = [...assets];
    updated[index].asset.currentPrice = newPrice;
    setAssets(updated);
  };

  const handleAssetEntryPriceChange = (index: number, newPrice: number) => {
    const updated = [...assets];
    updated[index].entryPrice = newPrice;
    setAssets(updated);
  };

  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="text-blue-400 font-semibold">Investment Mix Calculator</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Calculate Optimal Portfolio Allocation
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Input your investment amount and asset prices to get AI-optimized allocation percentages based on risk rules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3 text-slate-200">
                Total Investment Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400">$</span>
                <input
                  type="number"
                  value={totalInvestment}
                  onChange={(e) => setTotalInvestment(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-6">
              {assets.map((asset, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="font-semibold mb-4 text-lg">{asset.asset.symbol} - {asset.asset.name}</h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Current Price</label>
                      <div className="relative">
                        <span className="absolute left-2 top-2 text-slate-400">$</span>
                        <input
                          type="number"
                          value={asset.asset.currentPrice}
                          onChange={(e) => handleAssetPriceChange(idx, Number(e.target.value))}
                          className="w-full pl-6 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Entry Price</label>
                      <div className="relative">
                        <span className="absolute left-2 top-2 text-slate-400">$</span>
                        <input
                          type="number"
                          value={asset.entryPrice}
                          onChange={(e) => handleAssetEntryPriceChange(idx, Number(e.target.value))}
                          className="w-full pl-6 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-slate-400">
                    <p>Min Allocation: {(rules[asset.asset.symbol].minPercent * 100).toFixed(0)}%</p>
                    <p>Max Allocation: {(rules[asset.asset.symbol].maxPercent * 100).toFixed(0)}%</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleCalculate}
              className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calculate Allocation
            </button>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              Results
            </h3>

            {allocatedAssets.length > 0 && calculationResult && (
              <div className="space-y-6">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Portfolio Value</p>
                  <p className="text-3xl font-bold text-emerald-400">
                    ${calculationResult.portfolioValue.toFixed(2)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <p className="text-sm text-slate-400 mb-1">Return %</p>
                    <p className={`text-2xl font-bold ${calculationResult.percentageReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {calculationResult.percentageReturn.toFixed(2)}%
                    </p>
                  </div>

                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                    <p className="text-sm text-slate-400 mb-1">Gain/Loss</p>
                    <p className={`text-2xl font-bold ${calculationResult.totalGainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      ${calculationResult.totalGainLoss.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Recommended Allocation</h4>
                  <div className="space-y-3">
                    {allocatedAssets.map((asset) => (
                      <div key={asset.asset.symbol} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-semibold">{asset.asset.symbol}</p>
                          <p className="text-sm text-slate-400">{asset.units.toFixed(4)} units</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-400">{(asset.allocation * 100).toFixed(2)}%</p>
                          <p className="text-sm text-slate-400">${(asset.units * asset.asset.currentPrice).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!calculationResult && (
              <div className="flex items-center justify-center h-full text-slate-400">
                <p>Click "Calculate Allocation" to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
