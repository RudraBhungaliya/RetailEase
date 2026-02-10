import { useState } from "react";

const initialProducts = [
  { id: "P001", name: "Wireless Headphones", costPrice: 3500, sellPrice: 4999, category: "Electronics", stock: 45, threshold: 10, barcode: "WH001", taxRate: 18 },
  { id: "P002", name: "Coffee Maker", costPrice: 2000, sellPrice: 2999, category: "Home & Kitchen", stock: 5, threshold: 10, barcode: "CM002", taxRate: 18 },
  { id: "P003", name: "Running Shoes", costPrice: 800, sellPrice: 1499, category: "Sports", stock: 23, threshold: 15, barcode: "RS003", taxRate: 12 },
  { id: "P004", name: "Cricket Bat", costPrice: 4500, sellPrice: 6999, category: "Sports", stock: 12, threshold: 8, barcode: "CB004", taxRate: 12 },
  { id: "P005", name: "Smart Watch", costPrice: 3800, sellPrice: 5499, category: "Electronics", stock: 3, threshold: 10, barcode: "SW005", taxRate: 18 },
  { id: "P006", name: "Yoga Mat", costPrice: 5500, sellPrice: 7999, category: "Sports", stock: 18, threshold: 12, barcode: "YM006", taxRate: 12 },
  { id: "P007", name: "Python Book", costPrice: 300, sellPrice: 499, category: "Books", stock: 30, threshold: 20, barcode: "PB007", taxRate: 5 },
  { id: "P008", name: "Toy Robot", costPrice: 1200, sellPrice: 1999, category: "Toys", stock: 7, threshold: 15, barcode: "TR008", taxRate: 12 }
];

export default function InventoryPage() {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "", costPrice: "", sellPrice: "", category: "", stock: "", threshold: "", barcode: "", taxRate: ""
  });

  const categories = ["All", "Low Stock", ...new Set(products.map(p => p.category))];
  
  const filtered = products.filter(p => {
    const matchesCategory = filter === "All" || 
                           (filter === "Low Stock" ? p.stock <= p.threshold : p.category === filter);
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.barcode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: `P${String(products.length + 1).padStart(3, '0')}`,
      ...formData,
      costPrice: parseFloat(formData.costPrice),
      sellPrice: parseFloat(formData.sellPrice),
      stock: parseInt(formData.stock),
      threshold: parseInt(formData.threshold),
      taxRate: parseFloat(formData.taxRate)
    };
    setProducts([...products, newProduct]);
    setShowModal(false);
    setFormData({ name: "", costPrice: "", sellPrice: "", category: "", stock: "", threshold: "", barcode: "", taxRate: "" });
  };

  const handleEditProduct = () => {
    setProducts(products.map(p => p.id === editingProduct.id ? {
      ...editingProduct,
      ...formData,
      costPrice: parseFloat(formData.costPrice),
      sellPrice: parseFloat(formData.sellPrice),
      stock: parseInt(formData.stock),
      threshold: parseInt(formData.threshold),
      taxRate: parseFloat(formData.taxRate)
    } : p));
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: "", costPrice: "", sellPrice: "", category: "", stock: "", threshold: "", barcode: "", taxRate: "" });
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: "", costPrice: "", sellPrice: "", category: "", stock: "", threshold: "", barcode: "", taxRate: "" });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      costPrice: product.costPrice,
      sellPrice: product.sellPrice,
      category: product.category,
      stock: product.stock,
      threshold: product.threshold,
      barcode: product.barcode,
      taxRate: product.taxRate
    });
    setShowModal(true);
  };

  const updateStock = (id, amount) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: p.stock + amount } : p));
  };

  const lowStockCount = products.filter(p => p.stock <= p.threshold).length;
  const totalValue = products.reduce((sum, p) => sum + (p.stock * p.costPrice), 0);

  return (
    <div style={styles.page}>
      {/* Header */}
      <section style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Inventory <span style={{ color: "#FF9900" }}>Management</span></h1>
          <p style={styles.subtitle}>Manage products, stock levels, and pricing</p>
        </div>
        <button style={styles.addBtn} onClick={openAddModal}>
          + Add New Product
        </button>
      </section>

      {/* Stats */}
      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📦</div>
          <div>
            <p style={styles.statLabel}>Total Products</p>
            <h2 style={styles.statValue}>{products.length}</h2>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⚠️</div>
          <div>
            <p style={styles.statLabel}>Low Stock Items</p>
            <h2 style={styles.statValue}>{lowStockCount}</h2>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div>
            <p style={styles.statLabel}>Total Inventory Value</p>
            <h2 style={styles.statValue}>₹{totalValue.toLocaleString()}</h2>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section style={styles.filterSection}>
        <div style={styles.filterButtons}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                ...styles.filterBtn,
                background: filter === cat ? "#FF9900" : "transparent",
                color: filter === cat ? "#fff" : "#FF9900",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products by name, ID, or barcode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </section>

      {/* Products Table */}
      <section style={styles.tableSection}>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Product ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Barcode</th>
                <th style={styles.th}>Cost Price</th>
                <th style={styles.th}>Sell Price</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Tax Rate</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} style={{
                  ...styles.tr,
                  background: product.stock <= product.threshold ? "#fff3e0" : "#fff"
                }}>
                  <td style={styles.td}><strong>{product.id}</strong></td>
                  <td style={styles.td}>{product.name}</td>
                  <td style={styles.td}>{product.category}</td>
                  <td style={styles.td}><code>{product.barcode}</code></td>
                  <td style={styles.td}>₹{product.costPrice.toLocaleString()}</td>
                  <td style={styles.td}>₹{product.sellPrice.toLocaleString()}</td>
                  <td style={styles.td}>
                    <div style={styles.stockControl}>
                      <button
                        style={styles.stockBtn}
                        onClick={() => updateStock(product.id, -1)}
                        disabled={product.stock === 0}
                      >
                        -
                      </button>
                      <span style={{
                        ...styles.stockValue,
                        color: product.stock <= product.threshold ? "#f44336" : "#333"
                      }}>
                        {product.stock}
                      </span>
                      <button
                        style={styles.stockBtn}
                        onClick={() => updateStock(product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td style={styles.td}>{product.taxRate}%</td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button
                        style={styles.editBtnSmall}
                        onClick={() => openEditModal(product)}
                      >
                        ✏️
                      </button>
                      <button
                        style={styles.deleteBtnSmall}
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <div style={styles.formGrid}>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="barcode"
                placeholder="Barcode"
                value={formData.barcode}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="number"
                name="costPrice"
                placeholder="Cost Price"
                value={formData.costPrice}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="number"
                name="sellPrice"
                placeholder="Sell Price"
                value={formData.sellPrice}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock Quantity"
                value={formData.stock}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="number"
                name="threshold"
                placeholder="Low Stock Threshold"
                value={formData.threshold}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="number"
                name="taxRate"
                placeholder="Tax Rate (%)"
                value={formData.taxRate}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                style={styles.saveBtn}
                onClick={editingProduct ? handleEditProduct : handleAddProduct}
              >
                {editingProduct ? "Update" : "Add"} Product
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
    cursor: "pointer",
    transition: "all 0.3s ease"
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
    cursor: "pointer",
    transition: "all 0.3s ease"
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
  stockControl: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  stockBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    background: "#f9f9f9",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  },
  stockValue: {
    fontWeight: "600",
    minWidth: "30px",
    textAlign: "center"
  },
  actionButtons: {
    display: "flex",
    gap: "8px"
  },
  editBtnSmall: {
    padding: "6px 12px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "none",
    background: "#2196F3",
    color: "#fff",
    cursor: "pointer"
  },
  deleteBtnSmall: {
    padding: "6px 12px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "none",
    background: "#f44336",
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
    outline: "none"
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
