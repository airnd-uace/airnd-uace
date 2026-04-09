export interface Project {
  title: string;
  desc: string;
  tags: string[];
  date: string;
}

export const allProjects: Project[] = [
  { title: "Systematic Crypto Volatility Dashboard", desc: "A monitoring dashboard that tracks implied and realized volatility across major crypto assets.", tags: ["Crypto", "Volatility", "ML"], date: "Feb 2026" },
  { title: "Multi-Asset Backtesting Engine", desc: "Reusable strategy testing infrastructure with transaction costs, slippage, and portfolio constraints.", tags: ["Equities", "Factor", "Macro"], date: "Dec 2025" },
  { title: "Microstructure Signal Sandbox", desc: "Experimental workspace for order book imbalance, queue-position, and trade-signing signals.", tags: ["HFT", "Microstructure"], date: "Oct 2025" },
  { title: "Crypto Regime Detection Pipeline", desc: "End-to-end pipeline that labels market regimes in real time and feeds downstream strategy selectors.", tags: ["Crypto", "ML"], date: "Aug 2025" },
  { title: "Factor Zoo Explorer", desc: "Interactive tool to browse, backtest, and compare over 50 academic factors across US equities.", tags: ["Equities", "Factor"], date: "Jun 2025" },
  { title: "Real-time Order Flow Monitor", desc: "WebSocket-based dashboard streaming level-2 order book data with live imbalance and trade-sign metrics.", tags: ["HFT", "Microstructure"], date: "Apr 2025" },
  { title: "Portfolio Risk Dashboard", desc: "Unified risk view with VaR, CVaR, stress scenarios, and factor exposure decomposition across asset classes.", tags: ["Equities", "Macro"], date: "Jan 2025" },
  { title: "Tail Risk Options Screener", desc: "Screens listed options for cheap tail protection based on skew, term structure, and realized vol ratios.", tags: ["Crypto", "Volatility"], date: "Nov 2024" },
];

export const projectsByKey = {
  all: allProjects,
  crypto: allProjects.filter((p) => p.tags.includes("Crypto")),
  equities: allProjects.filter((p) => p.tags.includes("Equities")),
  hft: allProjects.filter((p) => p.tags.includes("HFT")),
};
