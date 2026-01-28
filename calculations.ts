export interface Asset {
  symbol: string;
  name: string;
  currentPrice: number;
  historicalPrices: number[];
}

export interface PortfolioAsset {
  asset: Asset;
  units: number;
  entryPrice: number;
  allocation: number;
}

export interface AllocationRule {
  minPercent: number;
  maxPercent: number;
  riskScore: number;
}

export interface RiskAssessment {
  riskScore: number;
  volatility: number;
  predictedReturn: number;
  sharpeRatio: number;
}

export class InvestmentCalculator {
  static calculateAllocation(
    totalInvestment: number,
    assets: PortfolioAsset[],
    rules: Record<string, AllocationRule>
  ): PortfolioAsset[] {
    const weights = this.optimizeWeights(assets, rules);

    return assets.map((asset, idx) => ({
      ...asset,
      allocation: weights[idx],
      units: (totalInvestment * weights[idx]) / asset.asset.currentPrice
    }));
  }

  private static optimizeWeights(
    assets: PortfolioAsset[],
    rules: Record<string, AllocationRule>
  ): number[] {
    const n = assets.length;
    let weights = new Array(n).fill(1 / n);

    for (let i = 0; i < n; i++) {
      const symbol = assets[i].asset.symbol;
      const rule = rules[symbol];

      if (rule) {
        weights[i] = Math.max(rule.minPercent, Math.min(rule.maxPercent, weights[i]));
      }
    }

    const sum = weights.reduce((a, b) => a + b, 0);
    return weights.map(w => w / sum);
  }

  static calculatePortfolioValue(assets: PortfolioAsset[]): number {
    return assets.reduce((total, asset) => {
      return total + (asset.units * asset.asset.currentPrice);
    }, 0);
  }

  static calculateReturns(assets: PortfolioAsset[]): number {
    return assets.reduce((total, asset) => {
      const gainPerUnit = asset.asset.currentPrice - asset.entryPrice;
      return total + (gainPerUnit * asset.units);
    }, 0);
  }

  static calculatePercentageReturn(assets: PortfolioAsset[]): number {
    const initialValue = assets.reduce((total, asset) => {
      return total + (asset.entryPrice * asset.units);
    }, 0);

    const currentValue = this.calculatePortfolioValue(assets);
    return initialValue > 0 ? ((currentValue - initialValue) / initialValue) * 100 : 0;
  }
}

export class RiskAnalyzer {
  static calculateVolatility(prices: number[]): number {
    if (prices.length < 2) return 0;

    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((sum, price) => {
      return sum + Math.pow(price - mean, 2);
    }, 0) / prices.length;

    return Math.sqrt(variance);
  }

  static calculateReturns(prices: number[]): number[] {
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
    }
    return returns;
  }

  static assessPortfolioRisk(assets: PortfolioAsset[]): RiskAssessment {
    const volatilities = assets.map(asset => {
      const vol = this.calculateVolatility(asset.asset.historicalPrices);
      return vol * (asset.allocation / 100);
    });

    const portfolioVolatility = volatilities.reduce((a, b) => a + b, 0);

    const returns = assets.map(asset => {
      const assetReturns = this.calculateReturns(asset.asset.historicalPrices);
      const avgReturn = assetReturns.reduce((a, b) => a + b, 0) / assetReturns.length;
      return avgReturn * (asset.allocation / 100);
    });

    const expectedReturn = returns.reduce((a, b) => a + b, 0);
    const riskFreeRate = 0.02;
    const sharpeRatio = portfolioVolatility > 0 ? (expectedReturn - riskFreeRate) / portfolioVolatility : 0;

    const riskScore = this.calculateRiskScore(portfolioVolatility, expectedReturn);

    return {
      riskScore,
      volatility: portfolioVolatility,
      predictedReturn: expectedReturn * 252,
      sharpeRatio
    };
  }

  private static calculateRiskScore(volatility: number, expectedReturn: number): number {
    let score = 50;
    score += (expectedReturn * 100) * 10;
    score -= volatility * 100 * 20;
    return Math.max(0, Math.min(100, score));
  }

  static predictFutureReturn(historicalPrices: number[], daysAhead: number = 30): number {
    if (historicalPrices.length < 2) return 0;

    const returns = this.calculateReturns(historicalPrices);
    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;

    const currentPrice = historicalPrices[historicalPrices.length - 1];
    const futurePrice = currentPrice * Math.pow(1 + avgReturn, daysAhead);

    return ((futurePrice - currentPrice) / currentPrice) * 100;
  }
}

export class SpreadingRuleEngine {
  static checkRebalanceNeeded(
    currentAllocation: number[],
    targetAllocation: number[],
    threshold: number = 0.05
  ): boolean {
    return currentAllocation.some((current, idx) => {
      const diff = Math.abs(current - targetAllocation[idx]);
      return diff > threshold;
    });
  }

  static calculateRebalancing(
    currentAllocation: number[],
    targetAllocation: number[],
    portfolioValue: number
  ): number[] {
    return targetAllocation.map((target, idx) => {
      return (target - currentAllocation[idx]) * portfolioValue;
    });
  }

  static stressTest(
    assets: PortfolioAsset[],
    scenarios: { name: string; priceChange: number }[]
  ): { scenario: string; portfolioValue: number; change: number }[] {
    const currentValue = assets.reduce((total, asset) => {
      return total + (asset.units * asset.asset.currentPrice);
    }, 0);

    return scenarios.map(scenario => {
      const stressedValue = assets.reduce((total, asset) => {
        const stressedPrice = asset.asset.currentPrice * (1 + scenario.priceChange);
        return total + (asset.units * stressedPrice);
      }, 0);

      return {
        scenario: scenario.name,
        portfolioValue: stressedValue,
        change: ((stressedValue - currentValue) / currentValue) * 100
      };
    });
  }
}

export class ReportGenerator {
  static generateCSV(
    portfolioName: string,
    assets: PortfolioAsset[],
    risk: RiskAssessment,
    timestamp: Date
  ): string {
    const lines = [
      `Portfolio Report: ${portfolioName}`,
      `Generated: ${timestamp.toISOString()}`,
      '',
      'PORTFOLIO OVERVIEW',
      `Total Value: $${this.formatNumber(this.calculatePortfolioValue(assets))}`,
      `Percentage Return: ${this.formatNumber(this.calculatePercentageReturn(assets))}%`,
      '',
      'ASSET ALLOCATION',
      'Symbol,Name,Units,Entry Price,Current Price,Current Value,Allocation %,Gain/Loss'
    ];

    const portfolioValue = this.calculatePortfolioValue(assets);

    assets.forEach(asset => {
      const currentValue = asset.units * asset.asset.currentPrice;
      const gainLoss = currentValue - (asset.units * asset.entryPrice);
      lines.push(
        `${asset.asset.symbol},${asset.asset.name},${this.formatNumber(asset.units)},` +
        `$${this.formatNumber(asset.entryPrice)},$${this.formatNumber(asset.asset.currentPrice)},` +
        `$${this.formatNumber(currentValue)},${this.formatNumber((currentValue/portfolioValue)*100)}%,` +
        `$${this.formatNumber(gainLoss)}`
      );
    });

    lines.push('');
    lines.push('RISK ASSESSMENT');
    lines.push(`Risk Score,${this.formatNumber(risk.riskScore)}`);
    lines.push(`Volatility,${this.formatNumber(risk.volatility)}`);
    lines.push(`Expected Annual Return,${this.formatNumber(risk.predictedReturn)}%`);
    lines.push(`Sharpe Ratio,${this.formatNumber(risk.sharpeRatio)}`);

    return lines.join('\n');
  }

  private static formatNumber(num: number): string {
    return num.toFixed(2);
  }

  private static calculatePortfolioValue(assets: PortfolioAsset[]): number {
    return assets.reduce((total, asset) => {
      return total + (asset.units * asset.asset.currentPrice);
    }, 0);
  }

  private static calculatePercentageReturn(assets: PortfolioAsset[]): number {
    const initialValue = assets.reduce((total, asset) => {
      return total + (asset.entryPrice * asset.units);
    }, 0);

    const currentValue = this.calculatePortfolioValue(assets);
    return initialValue > 0 ? ((currentValue - initialValue) / initialValue) * 100 : 0;
  }
}
