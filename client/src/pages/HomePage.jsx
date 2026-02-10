import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomePage() {
    const navigate = useNavigate();
    const [selectedPeriod, setSelectedPeriod] = useState("today");

    // Mock analytics data - replace with API calls
    const analytics = {
        today: {
            sales: 45780,
            orders: 23,
            profit: 12340,
            cancelled: 2
        },
        monthly: {
            sales: 678900,
            orders: 342,
            profit: 189450,
            cancelled: 18
        }
    };

    const stats = selectedPeriod === "today" ? analytics.today : analytics.monthly;

    const lowStockItems = [
        { id: 1, name: "Wireless Headphones", stock: 5, threshold: 10 },
        { id: 2, name: "Smart Watch", stock: 3, threshold: 10 },
        { id: 3, name: "Coffee Maker", stock: 7, threshold: 15 }
    ];

    const recentOrders = [
        { id: "INV-001", customer: "Rajesh Kumar", amount: 4999, status: "Completed", time: "10 mins ago" },
        { id: "INV-002", customer: "Priya Sharma", amount: 2499, status: "Pending", time: "25 mins ago" },
        { id: "INV-003", customer: "Amit Patel", amount: 7899, status: "Completed", time: "1 hr ago" },
        { id: "INV-004", customer: "Neha Gupta", amount: 1299, status: "Cancelled", time: "2 hrs ago" }
    ];

    const topCustomers = [
        { id: 1, name: "Rajesh Kumar", purchases: 25, outstanding: 5200 },
        { id: 2, name: "Priya Sharma", purchases: 18, outstanding: 0 },
        { id: 3, name: "Amit Patel", purchases: 15, outstanding: 3400 }
    ];

    return (
        <div style={styles.page}>
            {/* Header Section */}
            <section style={styles.header}>
                <div>
                    <h1 style={styles.pageTitle}>
                        Store <span style={{ color: "#FF9900" }}>Dashboard</span>
                    </h1>
                    <p style={styles.subtitle}>Real-time overview of your store operations</p>
                </div>
                <div style={styles.periodSelector}>
                    <button
                        onClick={() => setSelectedPeriod("today")}
                        style={{
                            ...styles.periodBtn,
                            background: selectedPeriod === "today" ? "#FF9900" : "transparent",
                            color: selectedPeriod === "today" ? "#fff" : "#FF9900"
                        }}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setSelectedPeriod("monthly")}
                        style={{
                            ...styles.periodBtn,
                            background: selectedPeriod === "monthly" ? "#FF9900" : "transparent",
                            color: selectedPeriod === "monthly" ? "#fff" : "#FF9900"
                        }}
                    >
                        This Month
                    </button>
                </div>
            </section>

            {/* Stats Cards */}
            <section style={styles.statsGrid}>
                <div style={{...styles.statCard, borderTop: "4px solid #4CAF50"}}>
                    <div style={styles.statIcon}>💰</div>
                    <div>
                        <p style={styles.statLabel}>Total Sales</p>
                        <h2 style={styles.statValue}>₹{stats.sales.toLocaleString()}</h2>
                    </div>
                </div>
                <div style={{...styles.statCard, borderTop: "4px solid #2196F3"}}>
                    <div style={styles.statIcon}>📦</div>
                    <div>
                        <p style={styles.statLabel}>Orders</p>
                        <h2 style={styles.statValue}>{stats.orders}</h2>
                    </div>
                </div>
                <div style={{...styles.statCard, borderTop: "4px solid #FF9900"}}>
                    <div style={styles.statIcon}>📈</div>
                    <div>
                        <p style={styles.statLabel}>Profit</p>
                        <h2 style={styles.statValue}>₹{stats.profit.toLocaleString()}</h2>
                    </div>
                </div>
                <div style={{...styles.statCard, borderTop: "4px solid #f44336"}}>
                    <div style={styles.statIcon}>❌</div>
                    <div>
                        <p style={styles.statLabel}>Cancelled</p>
                        <h2 style={styles.statValue}>{stats.cancelled}</h2>
                    </div>
                </div>
            </section>

            <div style={styles.mainContent}>
                {/* Recent Orders */}
                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Recent Orders</h2>
                        <button style={styles.viewAllBtn} onClick={() => navigate("/orders")}>
                            View All →
                        </button>
                    </div>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Invoice</th>
                                    <th style={styles.th}>Customer</th>
                                    <th style={styles.th}>Amount</th>
                                    <th style={styles.th}>Status</th>
                                    <th style={styles.th}>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order.id} style={styles.tr}>
                                        <td style={styles.td}><strong>{order.id}</strong></td>
                                        <td style={styles.td}>{order.customer}</td>
                                        <td style={styles.td}>₹{order.amount.toLocaleString()}</td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.statusBadge,
                                                background: order.status === "Completed" ? "#4CAF50" :
                                                           order.status === "Pending" ? "#FF9900" : "#f44336"
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={styles.td}>{order.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Low Stock Alert */}
                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>⚠️ Low Stock Alert</h2>
                        <button style={styles.viewAllBtn} onClick={() => navigate("/inventory")}>
                            Manage Inventory →
                        </button>
                    </div>
                    <div style={styles.alertList}>
                        {lowStockItems.map(item => (
                            <div key={item.id} style={styles.alertItem}>
                                <div>
                                    <p style={styles.alertItemName}>{item.name}</p>
                                    <p style={styles.alertItemStock}>
                                        Stock: <strong style={{color: "#f44336"}}>{item.stock}</strong> / Threshold: {item.threshold}
                                    </p>
                                </div>
                                <button style={styles.reorderBtn} onClick={() => navigate("/inventory")}>
                                    Reorder
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Top Customers */}
                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Top Customers</h2>
                        <button style={styles.viewAllBtn} onClick={() => navigate("/customers")}>
                            View All →
                        </button>
                    </div>
                    <div style={styles.customerList}>
                        {topCustomers.map(customer => (
                            <div key={customer.id} style={styles.customerCard}>
                                <div style={styles.customerAvatar}>👤</div>
                                <div style={{flex: 1}}>
                                    <p style={styles.customerName}>{customer.name}</p>
                                    <p style={styles.customerInfo}>{customer.purchases} purchases</p>
                                </div>
                                <div style={{textAlign: "right"}}>
                                    <p style={styles.customerDue}>
                                        {customer.outstanding > 0 ? (
                                            <span style={{color: "#f44336"}}>Due: ₹{customer.outstanding.toLocaleString()}</span>
                                        ) : (
                                            <span style={{color: "#4CAF50"}}>Clear ✓</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

const styles = {
    page: {
        padding: "40px 20px",
        maxWidth: "1400px",
        margin: "0 auto",
        background: "#f8f9fa",
        color: "#333",
        minHeight: "100vh"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        flexWrap: "wrap",
        gap: "20px"
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
    periodSelector: {
        display: "flex",
        gap: "10px",
        background: "#fff",
        padding: "6px",
        borderRadius: "12px",
        border: "2px solid #e0e0e0"
    },
    periodBtn: {
        padding: "10px 24px",
        fontSize: "14px",
        fontWeight: "600",
        borderRadius: "8px",
        border: "2px solid #FF9900",
        cursor: "pointer",
        transition: "all 0.3s ease"
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginBottom: "40px"
    },
    statCard: {
        background: "#fff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        transition: "all 0.3s ease"
    },
    statIcon: {
        fontSize: "3rem"
    },
    statLabel: {
        fontSize: "0.9rem",
        color: "#666",
        margin: "0 0 8px 0",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
    },
    statValue: {
        fontSize: "2rem",
        fontWeight: "700",
        margin: 0,
        color: "#333"
    },
    mainContent: {
        display: "grid",
        gap: "30px"
    },
    section: {
        background: "#fff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    },
    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    },
    sectionTitle: {
        fontSize: "1.5rem",
        margin: 0,
        fontWeight: "600",
        color: "#333"
    },
    viewAllBtn: {
        padding: "8px 16px",
        fontSize: "14px",
        fontWeight: "600",
        borderRadius: "8px",
        border: "2px solid #FF9900",
        background: "transparent",
        color: "#FF9900",
        cursor: "pointer",
        transition: "all 0.3s ease"
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
        textTransform: "uppercase",
        letterSpacing: "0.5px"
    },
    tr: {
        borderBottom: "1px solid #f0f0f0"
    },
    td: {
        padding: "16px 12px",
        fontSize: "0.95rem"
    },
    statusBadge: {
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "12px",
        fontSize: "0.8rem",
        fontWeight: "600",
        color: "#fff"
    },
    alertList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    alertItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        background: "#fff3e0",
        borderRadius: "8px",
        border: "1px solid #ffe0b2"
    },
    alertItemName: {
        fontSize: "1rem",
        fontWeight: "600",
        margin: "0 0 4px 0",
        color: "#333"
    },
    alertItemStock: {
        fontSize: "0.85rem",
        color: "#666",
        margin: 0
    },
    reorderBtn: {
        padding: "8px 20px",
        fontSize: "14px",
        fontWeight: "600",
        borderRadius: "8px",
        border: "none",
        background: "#FF9900",
        color: "#fff",
        cursor: "pointer",
        transition: "all 0.3s ease"
    },
    customerList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    customerCard: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        background: "#f9f9f9",
        borderRadius: "8px",
        border: "1px solid #e0e0e0"
    },
    customerAvatar: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "#FF9900",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem"
    },
    customerName: {
        fontSize: "1rem",
        fontWeight: "600",
        margin: "0 0 4px 0",
        color: "#333"
    },
    customerInfo: {
        fontSize: "0.85rem",
        color: "#666",
        margin: 0
    },
    customerDue: {
        fontSize: "0.9rem",
        fontWeight: "600",
        margin: 0
    }
};
