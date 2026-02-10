import { useState } from "react";

const initialOrders = [
  { 
    id: "INV-001", 
    date: "2026-02-10 10:30",
    customer: { id: "C001", name: "Rajesh Kumar", phone: "9876543210" },
    items: [
      { productId: "P001", name: "Wireless Headphones", quantity: 2, price: 4999, tax: 18 },
      { productId: "P003", name: "Running Shoes", quantity: 1, price: 1499, tax: 12 }
    ],
    status: "Completed",
    paymentStatus: "Paid",
    subtotal: 11497,
    taxAmount: 1930,
    totalAmount: 13427
  },
  { 
    id: "INV-002", 
    date: "2026-02-10 11:15",
    customer: { id: "C002", name: "Priya Sharma", phone: "9876543211" },
    items: [
      { productId: "P002", name: "Coffee Maker", quantity: 1, price: 2999, tax: 18 }
    ],
    status: "Pending",
    paymentStatus: "Pending",
    subtotal: 2999,
    taxAmount: 540,
    totalAmount: 3539
  },
  { 
    id: "INV-003", 
    date: "2026-02-10 09:45",
    customer: { id: "C003", name: "Amit Patel", phone: "9876543212" },
    items: [
      { productId: "P004", name: "Cricket Bat", quantity: 1, price: 6999, tax: 12 },
      { productId: "P006", name: "Yoga Mat", quantity: 1, price: 7999, tax: 12 }
    ],
    status: "Completed",
    paymentStatus: "Partial",
    subtotal: 14998,
    taxAmount: 1800,
    totalAmount: 16798
  },
  { 
    id: "INV-004", 
    date: "2026-02-09 16:20",
    customer: { id: "C004", name: "Neha Gupta", phone: "9876543213" },
    items: [
      { productId: "P007", name: "Python Book", quantity: 3, price: 499, tax: 5 }
    ],
    status: "Cancelled",
    paymentStatus: "Refunded",
    subtotal: 1497,
    taxAmount: 75,
    totalAmount: 1572
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = orders.filter(order => {
    const matchesFilter = filter === "All" || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const updatePaymentStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, paymentStatus: newStatus } : o));
  };

  const todayOrders = orders.filter(o => o.date.startsWith("2026-02-10")).length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  const cancelledOrders = orders.filter(o => o.status === "Cancelled").length;
  const totalRevenue = orders.filter(o => o.status === "Completed").reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div style={styles.page}>
      {/* Header */}
      <section style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Order <span style={{ color: "#FF9900" }}>Management</span></h1>
          <p style={styles.subtitle}>Create and manage customer orders and invoices</p>
        </div>
        <button style={styles.addBtn} onClick={() => setShowCreateOrder(true)}>
          + Create New Order
        </button>
      </section>

      {/* Stats */}
      <section style={styles.statsGrid}>
        <div style={{...styles.statCard, borderTop: "4px solid #2196F3"}}>
          <div style={styles.statIcon}>📋</div>
          <div>
            <p style={styles.statLabel}>Today's Orders</p>
            <h2 style={styles.statValue}>{todayOrders}</h2>
          </div>
        </div>
        <div style={{...styles.statCard, borderTop: "4px solid #4CAF50"}}>
          <div style={styles.statIcon}>✅</div>
          <div>
            <p style={styles.statLabel}>Completed</p>
            <h2 style={styles.statValue}>{completedOrders}</h2>
          </div>
        </div>
        <div style={{...styles.statCard, borderTop: "4px solid #f44336"}}>
          <div style={styles.statIcon}>❌</div>
          <div>
            <p style={styles.statLabel}>Cancelled</p>
            <h2 style={styles.statValue}>{cancelledOrders}</h2>
          </div>
        </div>
        <div style={{...styles.statCard, borderTop: "4px solid #FF9900"}}>
          <div style={styles.statIcon}>💰</div>
          <div>
            <p style={styles.statLabel}>Revenue</p>
            <h2 style={styles.statValue}>₹{totalRevenue.toLocaleString()}</h2>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={styles.filterSection}>
        <div style={styles.filterButtons}>
          {["All", "Completed", "Pending", "Cancelled"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                ...styles.filterBtn,
                background: filter === status ? "#FF9900" : "transparent",
                color: filter === status ? "#fff" : "#FF9900"
              }}
            >
              {status}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by invoice ID or customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </section>

      {/* Orders Table */}
      <section style={styles.tableSection}>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Invoice ID</th>
                <th style={styles.th}>Date & Time</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Items</th>
                <th style={styles.th}>Subtotal</th>
                <th style={styles.th}>Tax</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Payment</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} style={styles.tr}>
                  <td style={styles.td}><strong>{order.id}</strong></td>
                  <td style={styles.td}>{new Date(order.date).toLocaleString()}</td>
                  <td style={styles.td}>
                    <div>
                      <div>{order.customer.name}</div>
                      <div style={{fontSize: "0.85rem", color: "#666"}}>{order.customer.phone}</div>
                    </div>
                  </td>
                  <td style={styles.td}>{order.items.length}</td>
                  <td style={styles.td}>₹{order.subtotal.toLocaleString()}</td>
                  <td style={styles.td}>₹{order.taxAmount.toLocaleString()}</td>
                  <td style={styles.td}><strong>₹{order.totalAmount.toLocaleString()}</strong></td>
                  <td style={styles.td}>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{
                        ...styles.statusSelect,
                        background: order.status === "Completed" ? "#4CAF50" :
                                   order.status === "Pending" ? "#FF9900" : "#f44336"
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={styles.td}>
                    <select
                      value={order.paymentStatus}
                      onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
                      style={{
                        ...styles.statusSelect,
                        background: order.paymentStatus === "Paid" ? "#4CAF50" :
                                   order.paymentStatus === "Partial" ? "#FF9900" : "#f44336"
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Partial">Partial</option>
                      <option value="Paid">Paid</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.viewBtn}
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div style={styles.modalOverlay} onClick={() => setSelectedOrder(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Invoice: {selectedOrder.id}</h2>
            <div style={styles.invoiceDetails}>
              <div style={styles.invoiceSection}>
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                <p><strong>Customer ID:</strong> {selectedOrder.customer.id}</p>
              </div>
              <div style={styles.invoiceSection}>
                <h3>Order Information</h3>
                <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p><strong>Payment:</strong> {selectedOrder.paymentStatus}</p>
              </div>
            </div>
            <div style={styles.invoiceSection}>
              <h3>Items</h3>
              <table style={styles.itemsTable}>
                <thead>
                  <tr>
                    <th style={styles.th}>Product</th>
                    <th style={styles.th}>Quantity</th>
                    <th style={styles.th}>Price</th>
                    <th style={styles.th}>Tax</th>
                    <th style={styles.th}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{item.name}</td>
                      <td style={styles.td}>{item.quantity}</td>
                      <td style={styles.td}>₹{item.price.toLocaleString()}</td>
                      <td style={styles.td}>{item.tax}%</td>
                      <td style={styles.td}>₹{(item.quantity * item.price).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={styles.invoiceSummary}>
              <div style={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Tax:</span>
                <span>₹{selectedOrder.taxAmount.toLocaleString()}</span>
              </div>
              <div style={{...styles.summaryRow, fontSize: "1.3rem", fontWeight: "700", color: "#FF9900"}}>
                <span>Total:</span>
                <span>₹{selectedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>
            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={() => setSelectedOrder(null)}>
                Close
              </button>
              <button style={styles.saveBtn}>
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Order Modal */}
      {showCreateOrder && (
        <div style={styles.modalOverlay} onClick={() => setShowCreateOrder(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Create New Order</h2>
            <div style={styles.formGrid}>
              <p style={{fontSize: "1rem", color: "#666", gridColumn: "1 / -1"}}>
                Order creation interface would go here with customer selection, product selection, quantity inputs, etc.
              </p>
            </div>
            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={() => setShowCreateOrder(false)}>
                Cancel
              </button>
              <button style={styles.saveBtn}>
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}
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
  addBtn: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    background: "#FF9900",
    color: "#fff",
    cursor: "pointer"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  statCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  statIcon: {
    fontSize: "3rem"
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#666",
    margin: "0 0 8px 0",
    textTransform: "uppercase"
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "700",
    margin: 0,
    color: "#333"
  },
  filterSection: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  filterButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px"
  },
  filterBtn: {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "2px solid #FF9900",
    cursor: "pointer"
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "2px solid #e0e0e0",
    outline: "none"
  },
  tableSection: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
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
    whiteSpace: "nowrap"
  },
  tr: {
    borderBottom: "1px solid #f0f0f0"
  },
  td: {
    padding: "16px 12px",
    fontSize: "0.95rem",
    whiteSpace: "nowrap"
  },
  statusSelect: {
    padding: "6px 12px",
    borderRadius: "12px",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    fontSize: "0.85rem",
    cursor: "pointer"
  },
  viewBtn: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "6px",
    border: "2px solid #2196F3",
    background: "transparent",
    color: "#2196F3",
    cursor: "pointer"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    borderRadius: "12px",
    padding: "32px",
    maxWidth: "800px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto"
  },
  modalTitle: {
    fontSize: "1.8rem",
    margin: "0 0 24px 0",
    fontWeight: "700",
    color: "#333"
  },
  invoiceDetails: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px"
  },
  invoiceSection: {
    background: "#f9f9f9",
    padding: "16px",
    borderRadius: "8px"
  },
  itemsTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px"
  },
  invoiceSummary: {
    marginTop: "20px",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px"
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    fontSize: "1.1rem"
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "24px"
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px"
  },
  cancelBtn: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "2px solid #ddd",
    background: "transparent",
    cursor: "pointer"
  },
  saveBtn: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    background: "#FF9900",
    color: "#fff",
    cursor: "pointer"
  }
};
