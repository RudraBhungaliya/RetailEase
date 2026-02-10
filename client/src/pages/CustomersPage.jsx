import { useState } from "react";

const initialCustomers = [
  { id: "C001", name: "Rajesh Kumar", phone: "9876543210", email: "rajesh@example.com", creditLimit: 50000, outstandingBalance: 5200, purchaseCount: 25, createdAt: "2025-01-15" },
  { id: "C002", name: "Priya Sharma", phone: "9876543211", email: "priya@example.com", creditLimit: 30000, outstandingBalance: 0, purchaseCount: 18, createdAt: "2025-02-01" },
  { id: "C003", name: "Amit Patel", phone: "9876543212", email: "amit@example.com", creditLimit: 40000, outstandingBalance: 3400, purchaseCount: 15, createdAt: "2024-12-10" },
  { id: "C004", name: "Neha Gupta", phone: "9876543213", email: "neha@example.com", creditLimit: 25000, outstandingBalance: 12000, purchaseCount: 22, createdAt: "2025-01-20" },
  { id: "C005", name: "Vikram Singh", phone: "9876543214", email: "vikram@example.com", creditLimit: 60000, outstandingBalance: 0, purchaseCount: 30, createdAt: "2024-11-05" },
  { id: "C006", name: "Anita Desai", phone: "9876543215", email: "anita@example.com", creditLimit: 35000, outstandingBalance: 7800, purchaseCount: 12, createdAt: "2025-02-05" }
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", creditLimit: ""
  });

  const filtered = customers.filter(c => {
    const matchesFilter = filter === "All" || 
                         (filter === "Outstanding" ? c.outstandingBalance > 0 : c.outstandingBalance === 0);
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = () => {
    const newCustomer = {
      id: `C${String(customers.length + 1).padStart(3, '0')}`,
      ...formData,
      creditLimit: parseFloat(formData.creditLimit),
      outstandingBalance: 0,
      purchaseCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCustomers([...customers, newCustomer]);
    setShowModal(false);
    setFormData({ name: "", phone: "", email: "", creditLimit: "" });
  };

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (amount > 0 && amount <= selectedCustomer.outstandingBalance) {
      setCustomers(customers.map(c => 
        c.id === selectedCustomer.id 
          ? { ...c, outstandingBalance: c.outstandingBalance - amount }
          : c
      ));
      setShowPaymentModal(false);
      setSelectedCustomer(null);
      setPaymentAmount("");
    }
  };

  const openPaymentModal = (customer) => {
    setSelectedCustomer(customer);
    setPaymentAmount("");
    setShowPaymentModal(true);
  };

  const totalOutstanding = customers.reduce((sum, c) => sum + c.outstandingBalance, 0);
  const customersWithDues = customers.filter(c => c.outstandingBalance > 0).length;

  return (
    <div style={styles.page}>
      {/* Header */}
      <section style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Customer <span style={{ color: "#FF9900" }}>Management</span></h1>
          <p style={styles.subtitle}>Track customers, credit limits, and outstanding payments</p>
        </div>
        <button style={styles.addBtn} onClick={() => setShowModal(true)}>
          + Add New Customer
        </button>
      </section>

      {/* Stats */}
      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <div>
            <p style={styles.statLabel}>Total Customers</p>
            <h2 style={styles.statValue}>{customers.length}</h2>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⚠️</div>
          <div>
            <p style={styles.statLabel}>With Outstanding Dues</p>
            <h2 style={styles.statValue}>{customersWithDues}</h2>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div>
            <p style={styles.statLabel}>Total Outstanding</p>
            <h2 style={styles.statValue}>₹{totalOutstanding.toLocaleString()}</h2>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section style={styles.filterSection}>
        <div style={styles.filterButtons}>
          <button
            onClick={() => setFilter("All")}
            style={{
              ...styles.filterBtn,
              background: filter === "All" ? "#FF9900" : "transparent",
              color: filter === "All" ? "#fff" : "#FF9900"
            }}
          >
            All Customers
          </button>
          <button
            onClick={() => setFilter("Outstanding")}
            style={{
              ...styles.filterBtn,
              background: filter === "Outstanding" ? "#FF9900" : "transparent",
              color: filter === "Outstanding" ? "#fff" : "#FF9900"
            }}
          >
            With Dues
          </button>
          <button
            onClick={() => setFilter("Clear")}
            style={{
              ...styles.filterBtn,
              background: filter === "Clear" ? "#FF9900" : "transparent",
              color: filter === "Clear" ? "#fff" : "#FF9900"
            }}
          >
            Clear Payment
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by name, ID, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </section>

      {/* Customers Table */}
      <section style={styles.tableSection}>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Customer ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Purchases</th>
                <th style={styles.th}>Credit Limit</th>
                <th style={styles.th}>Outstanding</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(customer => (
                <tr key={customer.id} style={{
                  ...styles.tr,
                  background: customer.outstandingBalance > customer.creditLimit * 0.8 ? "#ffebee" : "#fff"
                }}>
                  <td style={styles.td}><strong>{customer.id}</strong></td>
                  <td style={styles.td}>{customer.name}</td>
                  <td style={styles.td}>{customer.phone}</td>
                  <td style={styles.td}>{customer.email}</td>
                  <td style={styles.td}>{customer.purchaseCount}</td>
                  <td style={styles.td}>₹{customer.creditLimit.toLocaleString()}</td>
                  <td style={styles.td}>
                    <span style={{
                      fontWeight: "700",
                      color: customer.outstandingBalance > 0 ? "#f44336" : "#4CAF50"
                    }}>
                      ₹{customer.outstandingBalance.toLocaleString()}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      background: customer.outstandingBalance === 0 ? "#4CAF50" : 
                                 customer.outstandingBalance > customer.creditLimit * 0.8 ? "#f44336" : "#FF9900"
                    }}>
                      {customer.outstandingBalance === 0 ? "Clear" : 
                       customer.outstandingBalance > customer.creditLimit * 0.8 ? "High Risk" : "Active"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {customer.outstandingBalance > 0 && (
                      <button
                        style={styles.payBtn}
                        onClick={() => openPaymentModal(customer)}
                      >
                        Receive Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Customer Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Add New Customer</h2>
            <div style={styles.formGrid}>
              <input
                type="text"
                name="name"
                placeholder="Customer Name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="number"
                name="creditLimit"
                placeholder="Credit Limit"
                value={formData.creditLimit}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button style={styles.saveBtn} onClick={handleAddCustomer}>
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedCustomer && (
        <div style={styles.modalOverlay} onClick={() => setShowPaymentModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Receive Payment</h2>
            <div style={styles.paymentInfo}>
              <p><strong>Customer:</strong> {selectedCustomer.name}</p>
              <p><strong>Outstanding Balance:</strong> ₹{selectedCustomer.outstandingBalance.toLocaleString()}</p>
            </div>
            <input
              type="number"
              placeholder="Payment Amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              style={styles.input}
              max={selectedCustomer.outstandingBalance}
            />
            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={() => setShowPaymentModal(false)}>
                Cancel
              </button>
              <button style={styles.saveBtn} onClick={handlePayment}>
                Record Payment
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
  statusBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "#fff"
  },
  payBtn: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "6px",
    border: "none",
    background: "#4CAF50",
    color: "#fff",
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
    maxWidth: "600px",
    width: "90%"
  },
  modalTitle: {
    fontSize: "1.8rem",
    margin: "0 0 24px 0",
    fontWeight: "700",
    color: "#333"
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "24px"
  },
  input: {
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "2px solid #e0e0e0",
    outline: "none",
    width: "100%"
  },
  paymentInfo: {
    background: "#f9f9f9",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px"
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px"
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
