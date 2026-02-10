export default function ReportsPage() {
  const salesData = {
    today: { sales: 45780, orders: 23, profit: 12340 },
    weekly: { sales: 315600, orders: 156, profit: 85320 },
    monthly: { sales: 678900, orders: 342, profit: 189450 }
  };

  const topProducts = [
    { name: "Wireless Headphones", unitsSold: 145, revenue: 724855 },
    { name: "Smart Watch", unitsSold: 98, revenue: 538902 },
    { name: "Cricket Bat", unitsSold: 76, revenue: 531924 },
    { name: "Yoga Mat", unitsSold: 54, revenue: 431946 },
    { name: "Coffee Maker", unitsSold: 42, revenue: 125958 }
  ];

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Sales <span style={{ color: "#FF9900" }}>Reports</span></h1>
          <p style={styles.subtitle}>Analytics and performance metrics</p>
        </div>
      </section>

      {/* Sales Overview */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Sales Overview</h2>
        <div style={styles.statsGrid}>
          <div style={styles.metricCard}>
            <h3 style={styles.metricLabel}>Today</h3>
            <div style={styles.metricValue}>₹{salesData.today.sales.toLocaleString()}</div>
            <div style={styles.metricSubtext}>{salesData.today.orders} orders • ₹{salesData.today.profit.toLocaleString()} profit</div>
          </div>
          <div style={styles.metricCard}>
            <h3 style={styles.metricLabel}>This Week</h3>
            <div style={styles.metricValue}>₹{salesData.weekly.sales.toLocaleString()}</div>
            <div style={styles.metricSubtext}>{salesData.weekly.orders} orders • ₹{salesData.weekly.profit.toLocaleString()} profit</div>
          </div>
          <div style={styles.metricCard}>
            <h3 style={styles.metricLabel}>This Month</h3>
            <div style={styles.metricValue}>₹{salesData.monthly.sales.toLocaleString()}</div>
            <div style={styles.metricSubtext}>{salesData.monthly.orders} orders • ₹{salesData.monthly.profit.toLocaleString()} profit</div>
          </div>
        </div>
      </section>

      {/* Top Products */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Top Selling Products</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Rank</th>
                <th style={styles.th}>Product Name</th>
                <th style={styles.th}>Units Sold</th>
                <th style={styles.th}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, idx) => (
                <tr key={idx} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={{
                      ...styles.rankBadge,
                      background: idx === 0 ? "#FFD700" : idx === 1 ? "#C0C0C0" : idx === 2 ? "#CD7F32" : "#e0e0e0"
                    }}>
                      {idx + 1}
                    </div>
                  </td>
                  <td style={styles.td}><strong>{product.name}</strong></td>
                  <td style={styles.td}>{product.unitsSold} units</td>
                  <td style={styles.td}><strong style={{color: "#FF9900"}}>₹{product.revenue.toLocaleString()}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Performance Metrics */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Performance Metrics</h2>
        <div style={styles.metricsGrid}>
          <div style={styles.performanceCard}>
            <div style={styles.performanceIcon}>📈</div>
            <div style={styles.performanceLabel}>Average Order Value</div>
            <div style={styles.performanceValue}>₹1,985</div>
          </div>
          <div style={styles.performanceCard}>
            <div style={styles.performanceIcon}>🎯</div>
            <div style={styles.performanceLabel}>Conversion Rate</div>
            <div style={styles.performanceValue}>68%</div>
          </div>
          <div style={styles.performanceCard}>
            <div style={styles.performanceIcon}>👥</div>
            <div style={styles.performanceLabel}>Customer Retention</div>
            <div style={styles.performanceValue}>82%</div>
          </div>
          <div style={styles.performanceCard}>
            <div style={styles.performanceIcon}>💹</div>
            <div style={styles.performanceLabel}>Profit Margin</div>
            <div style={styles.performanceValue}>27.9%</div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px 20px",
    maxWidth: "1400px",
    margin: "0 auto",
    background: "#f8f9fa",
    minHeight: "100vh"
  },
  header: {
    marginBottom: "30px"
  },
  pageTitle: {
    fontSize: "2.5rem",
    margin: "0 0 8px 0",
    fontWeight: "700",
    color: "#333"
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
    margin: 0
  },
  section: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  sectionTitle: {
    fontSize: "1.5rem",
    margin: "0 0 20px 0",
    fontWeight: "600",
    color: "#333"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },
  metricCard: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "12px",
    padding: "24px",
    color: "#fff"
  },
  metricLabel: {
    fontSize: "1rem",
    margin: "0 0 12px 0",
    opacity: 0.9,
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  metricValue: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0 0 8px 0"
  },
  metricSubtext: {
    fontSize: "0.9rem",
    opacity: 0.8
  },
  tableContainer: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #e0e0e0",
    color: "#666",
    fontSize: "0.85rem",
    textTransform: "uppercase"
  },
  tr: {
    borderBottom: "1px solid #f0f0f0"
  },
  td: {
    padding: "16px 12px",
    fontSize: "1rem"
  },
  rankBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    fontWeight: "700",
    fontSize: "0.9rem",
    color: "#333"
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },
  performanceCard: {
    background: "#f9f9f9",
    borderRadius: "12px",
    padding: "24px",
    textAlign: "center",
    border: "2px solid #e0e0e0"
  },
  performanceIcon: {
    fontSize: "3rem",
    marginBottom: "12px"
  },
  performanceLabel: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  performanceValue: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#FF9900"
  }
};
