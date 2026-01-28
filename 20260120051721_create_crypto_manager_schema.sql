/*
  # Crypto Investment Manager Schema

  1. New Tables
    - `users` - User accounts
    - `portfolios` - User investment portfolios
    - `assets` - Tracked crypto assets
    - `portfolio_assets` - Asset allocations
    - `price_history` - Time-series price data
    - `risk_assessments` - Risk analysis snapshots
    - `spreading_rules` - Investment spreading rules
    - `performance_reports` - Generated reports

  2. Security
    - Enable RLS on all tables
    - Policies for user data isolation
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE TABLE IF NOT EXISTS portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  initial_investment numeric NOT NULL,
  total_value numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own portfolios"
  ON portfolios FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Assets are public"
  ON assets FOR SELECT
  USING (true);

CREATE TABLE IF NOT EXISTS portfolio_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios(id) ON DELETE CASCADE NOT NULL,
  asset_id uuid REFERENCES assets(id) ON DELETE CASCADE NOT NULL,
  allocation_percent numeric NOT NULL,
  units numeric NOT NULL,
  entry_price numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage portfolio assets"
  ON portfolio_assets FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = portfolio_assets.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id uuid REFERENCES assets(id) ON DELETE CASCADE NOT NULL,
  price numeric NOT NULL,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Price history is public"
  ON price_history FOR SELECT
  USING (true);

CREATE TABLE IF NOT EXISTS risk_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios(id) ON DELETE CASCADE NOT NULL,
  risk_score numeric NOT NULL,
  volatility numeric NOT NULL,
  prediction_return numeric NOT NULL,
  assessment_date timestamptz DEFAULT now()
);

ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own risk assessments"
  ON risk_assessments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = risk_assessments.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS spreading_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios(id) ON DELETE CASCADE NOT NULL,
  rule_name text NOT NULL,
  rule_condition text NOT NULL,
  rebalance_threshold numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE spreading_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own rules"
  ON spreading_rules FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = spreading_rules.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS performance_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios(id) ON DELETE CASCADE NOT NULL,
  report_data jsonb NOT NULL,
  report_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE performance_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reports"
  ON performance_reports FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = performance_reports.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_assets_portfolio_id ON portfolio_assets(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_price_history_asset_id ON price_history(asset_id);
CREATE INDEX IF NOT EXISTS idx_price_history_timestamp ON price_history(timestamp);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_portfolio_id ON risk_assessments(portfolio_id);
