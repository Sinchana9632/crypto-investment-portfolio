import { useState } from 'react';
import { Settings, Plus, Trash2, CheckCircle } from 'lucide-react';
import { SpreadingRuleEngine, PortfolioAsset } from '../lib/calculations';

interface Rule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
}

export default function SpreadingRuleSection() {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      name: 'Volatility Management',
      condition: 'When volatility exceeds 20%, reduce high-risk assets by 10%',
      threshold: 20
    },
    {
      id: '2',
      name: 'Profit Taking',
      condition: 'When any asset gains 50%, take 25% profit',
      threshold: 50
    }
  ]);

  const [newRule, setNewRule] = useState({ name: '', condition: '', threshold: 10 });

  const samplePortfolio: PortfolioAsset[] = [
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

  const [currentAllocation, setCurrentAllocation] = useState([50, 50]);
  const [targetAllocation, setTargetAllocation] = useState([40, 60]);
  const [rebalancingResults, setRebalancingResults] = useState<any>(null);
  const [stressTestResults, setStressTestResults] = useState<any>(null);

  const handleAddRule = () => {
    if (newRule.name && newRule.condition) {
      setRules([...rules, {
        id: Date.now().toString(),
        ...newRule
      }]);
      setNewRule({ name: '', condition: '', threshold: 10 });
    }
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const handleCheckRebalance = () => {
    const needsRebalance = SpreadingRuleEngine.checkRebalanceNeeded(
      currentAllocation.map(a => a / 100),
      targetAllocation.map(a => a / 100),
      0.05
    );

    if (needsRebalance) {
      const rebalancing = SpreadingRuleEngine.calculateRebalancing(
        currentAllocation.map(a => a / 100),
        targetAllocation.map(a => a / 100),
        100000
      );

      setRebalancingResults({
        needed: true,
        adjustments: rebalancing,
        message: 'Portfolio has drifted from target allocation. Rebalancing recommended.'
      });
    } else {
      setRebalancingResults({
        needed: false,
        message: 'Portfolio is within acceptable allocation ranges.'
      });
    }
  };

  const handleStressTest = () => {
    const scenarios = [
      { name: 'Bull Market (+20%)', priceChange: 0.2 },
      { name: 'Normal (+5%)', priceChange: 0.05 },
      { name: 'Bear Market (-15%)', priceChange: -0.15 },
      { name: 'Crash (-30%)', priceChange: -0.3 }
    ];

    const results = SpreadingRuleEngine.stressTest(samplePortfolio, scenarios);
    setStressTestResults(results);
  };

  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full mb-6">
            <span className="text-rose-400 font-semibold">Spreading Rule Setter</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Dynamic Rebalancing & Rules
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Create intelligent spreading rules that automatically rebalance your portfolio and adapt to market changes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">Investment Spreading Rules</h3>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {rules.map((rule) => (
                <div key={rule.id} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{rule.name}</h4>
                    <button
                      onClick={() => handleDeleteRule(rule.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{rule.condition}</p>
                  <div className="text-xs text-slate-500">Threshold: {rule.threshold}%</div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
              <h4 className="font-semibold">Add New Rule</h4>

              <div>
                <label className="text-sm text-slate-400 block mb-2">Rule Name</label>
                <input
                  type="text"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
                  placeholder="e.g., Profit Taking Strategy"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-2">Condition</label>
                <textarea
                  value={newRule.condition}
                  onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
                  placeholder="Describe the rebalancing condition..."
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-2">Threshold (%)</label>
                <input
                  type="number"
                  value={newRule.threshold}
                  onChange={(e) => setNewRule({ ...newRule, threshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
                />
              </div>

              <button
                onClick={handleAddRule}
                className="w-full px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Rule
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">Portfolio Rebalancing</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-slate-400 block mb-3">Current Allocation</label>
                <div className="space-y-2">
                  {['BTC', 'ETH'].map((symbol, idx) => (
                    <div key={symbol} className="flex items-center gap-3">
                      <span className="w-12 text-sm font-semibold">{symbol}</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentAllocation[idx]}
                        onChange={(e) => {
                          const updated = [...currentAllocation];
                          updated[idx] = Number(e.target.value);
                          setCurrentAllocation(updated);
                        }}
                        className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="w-10 text-right text-sm font-semibold">{currentAllocation[idx]}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-3">Target Allocation</label>
                <div className="space-y-2">
                  {['BTC', 'ETH'].map((symbol, idx) => (
                    <div key={symbol} className="flex items-center gap-3">
                      <span className="w-12 text-sm font-semibold">{symbol}</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={targetAllocation[idx]}
                        onChange={(e) => {
                          const updated = [...targetAllocation];
                          updated[idx] = Number(e.target.value);
                          setTargetAllocation(updated);
                        }}
                        className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="w-10 text-right text-sm font-semibold">{targetAllocation[idx]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCheckRebalance}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Check Rebalance
              </button>

              <button
                onClick={handleStressTest}
                className="w-full px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                <Settings className="w-4 h-4" />
                Stress Test Scenarios
              </button>
            </div>

            {rebalancingResults && (
              <div className={`mt-4 p-4 rounded-lg ${rebalancingResults.needed ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-emerald-500/10 border border-emerald-500/30'}`}>
                <p className={`text-sm font-semibold ${rebalancingResults.needed ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {rebalancingResults.message}
                </p>
              </div>
            )}

            {stressTestResults && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-slate-400">Stress Test Results:</p>
                {stressTestResults.map((result: any, idx: number) => (
                  <div key={idx} className="p-2 bg-white/5 border border-white/10 rounded text-xs">
                    <span className="font-semibold">{result.name}:</span>
                    <span className={`ml-2 ${result.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {result.change > 0 ? '+' : ''}{result.change.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
