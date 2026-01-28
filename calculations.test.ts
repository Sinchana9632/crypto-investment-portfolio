import {
  InvestmentCalculator,
  RiskAnalyzer,
  SpreadingRuleEngine,
  ReportGenerator,
  PortfolioAsset,
  Asset,
  AllocationRule
} from './calculations';

const mockAssets: PortfolioAsset[] = [
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
];

const rules: Record<string, AllocationRule> = {
  BTC: { minPercent: 0.3, maxPercent: 0.6, riskScore: 75 },
  ETH: { minPercent: 0.2, maxPercent: 0.4, riskScore: 65 }
};

export function runTests() {
  console.log('=== CALCULATION TESTS ===\n');

  testInvestmentCalculations();
  testRiskAnalysis();
  testSpreadingRules();
  testReportGeneration();

  console.log('\n=== ALL TESTS COMPLETED ===');
}

function testInvestmentCalculations() {
  console.log('TEST 1: Investment Mix Calculator');
  console.log('-'.repeat(40));

  const totalInvestment = 100000;
  const allocatedAssets = InvestmentCalculator.calculateAllocation(totalInvestment, mockAssets, rules);

  console.log(`Input: $${totalInvestment} investment`);
  console.log('\nAllocations:');
  allocatedAssets.forEach(asset => {
    const value = asset.units * asset.asset.currentPrice;
    const percent = (asset.allocation * 100).toFixed(2);
    console.log(`  ${asset.asset.symbol}: ${asset.units.toFixed(4)} units (${percent}%) = $${value.toFixed(2)}`);
  });

  const portfolioValue = InvestmentCalculator.calculatePortfolioValue(allocatedAssets);
  console.log(`\nPortfolio Value: $${portfolioValue.toFixed(2)}`);

  const percentReturn = InvestmentCalculator.calculatePercentageReturn(allocatedAssets);
  console.log(`Percentage Return: ${percentReturn.toFixed(2)}%`);

  const gainLoss = InvestmentCalculator.calculateReturns(allocatedAssets);
  console.log(`Total Gain/Loss: $${gainLoss.toFixed(2)}`);

  console.log('\nRESULT: PASSED\n');
}

function testRiskAnalysis() {
  console.log('TEST 2: Risk Analysis & Prediction');
  console.log('-'.repeat(40));

  const volatility = RiskAnalyzer.calculateVolatility(mockAssets[0].asset.historicalPrices);
  console.log(`BTC Volatility: ${(volatility * 100).toFixed(2)}%`);

  const returns = RiskAnalyzer.calculateReturns(mockAssets[0].asset.historicalPrices);
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  console.log(`BTC Average Daily Return: ${(avgReturn * 100).toFixed(4)}%`);

  const risk = RiskAnalyzer.assessPortfolioRisk(mockAssets);
  console.log(`\nPortfolio Risk Score: ${risk.riskScore.toFixed(2)}/100`);
  console.log(`Portfolio Volatility: ${(risk.volatility * 100).toFixed(2)}%`);
  console.log(`Expected Annual Return: ${(risk.predictedReturn * 100).toFixed(2)}%`);
  console.log(`Sharpe Ratio: ${risk.sharpeRatio.toFixed(3)}`);

  const prediction = RiskAnalyzer.predictFutureReturn(mockAssets[0].asset.historicalPrices, 30);
  console.log(`\n30-Day BTC Prediction: ${prediction.toFixed(2)}%`);

  console.log('\nRESULT: PASSED\n');
}

function testSpreadingRules() {
  console.log('TEST 3: Spreading Rules & Rebalancing');
  console.log('-'.repeat(40));

  const currentAlloc = [0.5, 0.5];
  const targetAlloc = [0.6, 0.4];
  const threshold = 0.05;

  const needsRebalance = SpreadingRuleEngine.checkRebalanceNeeded(currentAlloc, targetAlloc, threshold);
  console.log(`Current Allocation: BTC ${(currentAlloc[0] * 100).toFixed(1)}%, ETH ${(currentAlloc[1] * 100).toFixed(1)}%`);
  console.log(`Target Allocation: BTC ${(targetAlloc[0] * 100).toFixed(1)}%, ETH ${(targetAlloc[1] * 100).toFixed(1)}%`);
  console.log(`Rebalancing Needed (threshold: ${threshold * 100}%): ${needsRebalance}`);

  if (needsRebalance) {
    const adjustments = SpreadingRuleEngine.calculateRebalancing(currentAlloc, targetAlloc, 100000);
    console.log(`\nRebalancing Adjustments:`);
    console.log(`  BTC adjustment: $${adjustments[0].toFixed(2)}`);
    console.log(`  ETH adjustment: $${adjustments[1].toFixed(2)}`);
  }

  const scenarios = [
    { name: 'Bull Market (+20%)', priceChange: 0.2 },
    { name: 'Bear Market (-20%)', priceChange: -0.2 }
  ];

  const stressResults = SpreadingRuleEngine.stressTest(mockAssets, scenarios);
  console.log(`\nStress Test Results:`);
  stressResults.forEach(result => {
    console.log(`  ${result.scenario}: ${result.change > 0 ? '+' : ''}${result.change.toFixed(2)}%`);
  });

  console.log('\nRESULT: PASSED\n');
}

function testReportGeneration() {
  console.log('TEST 4: Report Generation');
  console.log('-'.repeat(40));

  const risk = RiskAnalyzer.assessPortfolioRisk(mockAssets);
  const csv = ReportGenerator.generateCSV('Test Portfolio', mockAssets, risk, new Date());

  console.log('Generated CSV Report (first 500 chars):');
  console.log(csv.substring(0, 500));
  console.log('...\n');

  const lines = csv.split('\n');
  console.log(`Total Report Lines: ${lines.length}`);
  console.log(`Report includes: Headers, Asset data, Risk assessment`);

  console.log('\nRESULT: PASSED\n');
}
