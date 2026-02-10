export default function OrdersPage() {
    const products = [
        { id: 1, name: "Wireless Headphones", price: 4999, category: "Electronics" },
        { id: 2, name: "Coffee Maker", price: 2999, category: "Home & Kitchen" },
        { id: 3, name: "Running Shoes", price: 1499, category: "Sports" },
        { id: 4, name: "Cricket Bat", price: 6999, category: "Sports" },
        { id: 5, name: "Smart Watch", price: 5499, category: "Electronics" },
        { id: 6, name: "Yoga Mat", price: 7999, category: "Sports" },
        { id: 7, name: "Python Programming Book", price: 499, category: "Books" },
        { id: 8, name: "Toy Robot", price: 1999, category: "Toys" }
    ];

    const orders = [
        { 
            id: "ORD-7023", 
            date: "Feb 12, 2026", 
            status: "Delivered",
            deliveredDate: "Feb 14, 2026",
            total: 14997, 
            items: 3,
            products: [products[0], products[1], products[6]],
            address: "123 Main Street, Mumbai"
        },
        { 
            id: "ORD-7155", 
            date: "Feb 08, 2026", 
            status: "Processing",
            estimatedDate: "Feb 16, 2026",
            total: 23497, 
            items: 4,
            products: [products[2], products[3], products[4], products[7]],
            address: "456 Park Lane, Delhi"
        },
        { 
            id: "ORD-6991", 
            date: "Jan 24, 2026", 
            status: "Cancelled",
            reason: "User requested cancellation",
            total: 9998, 
            items: 2,
            products: [products[1], products[5]],
            address: "789 Market Street, Bangalore"
        },
        { 
            id: "ORD-6890", 
            date: "Jan 18, 2026", 
            status: "Delivered",
            deliveredDate: "Jan 22, 2026",
            total: 7498, 
            items: 2,
            products: [products[3], products[6]],
            address: "123 Main Street, Mumbai"
        },
    ];

    const getStatusIcon = (status) => {
        if (status === "Delivered") return "✓";
        if (status === "Processing") return "⟳";
        return "✕";
    };

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Your Orders</h1>
                <p style={styles.subtitle}>Track and manage all your orders</p>
            </div>

            <div style={styles.list}>
                {orders.map((order) => (
                    <div key={order.id} style={styles.card}>
                        <div style={styles.cardTop}>
                            <div style={styles.orderInfo}>
                                <div style={styles.orderIdSection}>
                                    <h3 style={styles.orderId}>{order.id}</h3>
                                    <p style={styles.orderDate}>Ordered on {order.date}</p>
                                </div>
                                <span style={{
                                    ...styles.status,
                                    backgroundColor: getStatusBg(order.status),
                                    color: getStatusColor(order.status),
                                    borderColor: getStatusColor(order.status),
                                }}>
                                    <span style={styles.statusIcon}>{getStatusIcon(order.status)}</span>
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        <div style={styles.divider} />

                        <div style={styles.cardContent}>
                            <div style={styles.section}>
                                <h4 style={styles.sectionTitle}>Items ({order.items})</h4>
                                <ul style={styles.itemsList}>
                                    {order.products.map((product, idx) => (
                                        <li key={idx} style={styles.item}>
                                            <span style={styles.productIcon}>🛍️</span>
                                            <div style={styles.itemDetails}>
                                                <div style={styles.itemName}>{product.name}</div>
                                                <div style={styles.itemCategory}>{product.category}</div>
                                            </div>
                                            <span style={styles.itemPrice}>₹{product.price.toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div style={styles.twoColumns}>
                                <div style={styles.section}>
                                    <h4 style={styles.sectionTitle}>Delivery Address</h4>
                                    <p style={styles.addressText}>{order.address}</p>
                                </div>

                                <div style={styles.section}>
                                    <h4 style={styles.sectionTitle}>
                                        {order.status === "Delivered" && "Delivered on"}
                                        {order.status === "Processing" && "Estimated Delivery"}
                                        {order.status === "Cancelled" && "Cancellation Reason"}
                                    </h4>
                                    <p style={styles.detailText}>
                                        {order.status === "Delivered" && order.deliveredDate}
                                        {order.status === "Processing" && order.estimatedDate}
                                        {order.status === "Cancelled" && order.reason}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={styles.divider} />

                        <div style={styles.cardFooter}>
                            <div style={styles.totalSection}>
                                <span style={styles.totalLabel}>Order Total</span>
                                <span style={styles.totalAmount}>₹{order.total.toLocaleString()}</span>
                            </div>
                            <button style={styles.actionBtn}>
                                {order.status === "Delivered" ? "View Details" : "Track Order"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const getStatusColor = (s) => {
    if (s === "Delivered") return "#4caf50";
    if (s === "Processing") return "#ff9800";
    return "#f44336";
};

const getStatusBg = (s) => {
    if (s === "Delivered") return "rgba(76, 175, 80, 0.15)";
    if (s === "Processing") return "rgba(255, 152, 0, 0.15)";
    return "rgba(244, 67, 54, 0.15)";
};

const styles = {
    page: { 
        padding: "40px 20px", 
        maxWidth: "1000px", 
        margin: "0 auto",
        background: "#ffffff",
        color: "#333",
        minHeight: "100vh",
    },
    header: {
        marginBottom: "40px",
        borderBottom: "2px solid #e0e0e0",
        paddingBottom: "24px",
    },
    title: { 
        fontSize: "2.5rem", 
        margin: "0 0 8px 0",
        fontWeight: "700",
    },
    subtitle: {
        color: "#999",
        margin: 0,
        fontSize: "1rem",
    },
    list: { 
        display: "flex", 
        flexDirection: "column", 
        gap: "24px" 
    },
    card: {
        background: "#ffffff",
        borderRadius: "12px",
        padding: "24px",
        border: "2px solid #e0e0e0",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    },
    cardTop: {
        marginBottom: "16px",
    },
    orderInfo: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    orderIdSection: {
        flex: 1,
    },
    orderId: { 
        margin: "0 0 4px 0",
        fontSize: "1.3rem", 
        fontWeight: "700",
        color: "#333",
    },
    orderDate: {
        margin: 0,
        color: "#999",
        fontSize: "0.9rem",
    },
    status: {
        padding: "8px 16px",
        borderRadius: "8px",
        fontSize: "0.9rem",
        fontWeight: "600",
        border: "2px solid",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
    },
    statusIcon: {
        fontSize: "1.1rem",
        fontWeight: "bold",
    },
    divider: {
        height: "1px",
        background: "#e0e0e0",
        margin: "16px 0",
    },
    cardContent: {
        marginBottom: "16px",
    },
    twoColumns: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        marginTop: "16px",
    },
    section: {
        marginBottom: "16px",
    },
    sectionTitle: {
        margin: "0 0 8px 0",
        fontSize: "0.95rem",
        fontWeight: "600",
        color: "#333",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    itemsList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    item: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 0",
        color: "#555",
        fontSize: "0.95rem",
    },
    productIcon: {
        fontSize: "1rem",
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        margin: "0 0 2px 0",
        fontWeight: "600",
        color: "#333",
    },
    itemCategory: {
        margin: 0,
        fontSize: "0.8rem",
        color: "#999",
    },
    itemPrice: {
        fontWeight: "bold",
        color: "#FF9900",
        minWidth: "80px",
        textAlign: "right",
    },
    addressText: {
        margin: 0,
        color: "#555",
        fontSize: "0.95rem",
        lineHeight: "1.5",
    },
    detailText: {
        margin: 0,
        color: "#555",
        fontSize: "0.95rem",
        fontWeight: "500",
    },
    cardFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    totalSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    totalLabel: {
        color: "#777",
        fontSize: "0.85rem",
        marginBottom: "4px",
    },
    totalAmount: {
        fontSize: "1.4rem",
        fontWeight: "bold",
        color: "#FF9900",
    },
    actionBtn: {
        background: "#FF9900",
        border: "none",
        color: "#fff",
        padding: "10px 24px",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.3s ease",
    }
};
