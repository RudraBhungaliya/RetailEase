import { useState } from "react";

const products = [
  { id: 1, name: "Wireless Headphones", price: 4999, category: "Electronics", rating: 4.5 },
  { id: 2, name: "Coffee Maker", price: 2999, category: "Home & Kitchen", rating: 4.3 },
  { id: 3, name: "Running Shoes", price: 1499, category: "Sports", rating: 4.7 },
  { id: 4, name: "Cricket Bat", price: 6999, category: "Sports", rating: 4.6 },
  { id: 5, name: "Smart Watch", price: 5499, category: "Electronics", rating: 4.4 },
  { id: 6, name: "Yoga Mat", price: 7999, category: "Sports", rating: 4.5 },
  { id: 7, name: "Python Programming Book", price: 499, category: "Books", rating: 4.8 },
  { id: 8, name: "Toy Robot", price: 1999, category: "Toys", rating: 4.2 }
];

export default function ProductPage() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");

  const add = p => setCart([...cart, p]);
  const remove = i => setCart(cart.filter((_, x) => x !== i));
  const total = cart.reduce((s, p) => s + p.price, 0);
  
  const categories = ["All", ...new Set(products.map(p => p.category))];
  const filtered = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <div style={styles.page}>
      {/* Products Section */}
      <div style={styles.container}>
        {/* Filters */}
        <div style={styles.filterSection}>
          <h2 style={styles.filterTitle}>Product Categories</h2>
          <div style={styles.filterButtons}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  ...styles.filterBtn,
                  background: filter === cat ? "#FF9900" : "transparent",
                  color: filter === cat ? "#000" : "#FF9900",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div style={styles.productsWrapper}>
          <div style={styles.productsSection}>
            <h1 style={styles.pageTitle}>Our Products</h1>
            <p style={styles.subtitle}>Showing {filtered.length} products</p>
            
            <div style={styles.grid}>
              {filtered.map(p => (
                <div key={p.id} style={styles.card}>
                  <div style={styles.cardImage}>
                    <span style={{ fontSize: "4rem" }}>🛍️</span>
                    <div style={styles.categoryBadge}>{p.category}</div>
                  </div>
                  <div style={styles.cardBody}>
                    <h3 style={styles.productName}>{p.name}</h3>
                    <div style={styles.rating}>
                      <span style={styles.stars}>★★★★☆</span>
                      <span style={styles.ratingText}>{p.rating}</span>
                    </div>
                    <div style={styles.priceSection}>
                      <p style={styles.price}>₹{p.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => add(p)}
                      style={styles.addBtn}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div style={styles.cartSection}>
            <div style={styles.cartCard}>
              <h2 style={styles.cartTitle}>Your Cart</h2>
              <div style={styles.cartDivider} />
              
              {cart.length === 0 ? (
                <p style={styles.emptyCart}>Your cart is empty</p>
              ) : (
                <>
                  <div style={styles.cartItems}>
                    {cart.map((p, i) => (
                      <div key={i} style={styles.cartItem}>
                        <div style={styles.cartItemInfo}>
                          <p style={styles.cartItemName}>{p.name}</p>
                          <p style={styles.cartItemPrice}>₹{p.price.toLocaleString()}</p>
                        </div>
                        <button
                          style={styles.removeBtn}
                          onClick={() => remove(i)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <div style={styles.cartDivider} />
                  <div style={styles.cartSummary}>
                    <div style={styles.summaryRow}>
                      <span>Subtotal ({cart.length} items)</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                    <div style={styles.summaryRow}>
                      <span>Shipping</span>
                      <span style={{ color: "#4caf50" }}>Free</span>
                    </div>
                    <div style={styles.cartDivider} />
                    <div style={styles.totalRow}>
                      <span>Total</span>
                      <span style={styles.totalAmount}>₹{total.toLocaleString()}</span>
                    </div>
                    <button style={styles.checkoutBtn}>
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#333",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  filterSection: {
    marginBottom: "40px",
  },
  filterTitle: {
    fontSize: "1.5rem",
    marginBottom: "16px",
    color: "#333",
  },
  filterButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "2px solid #FF9900",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  productsWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: "32px",
  },
  productsSection: {
    flex: 1,
  },
  pageTitle: {
    fontSize: "2.5rem",
    marginBottom: "8px",
    fontWeight: "700",
  },
  subtitle: {
    color: "#999",
    marginBottom: "24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "2px solid #e0e0e0",
    overflow: "hidden",
    transition: "all 0.3s ease",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  cardImage: {
    height: "200px",
    background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  categoryBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "#FF9900",
    color: "#fff",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
  cardBody: {
    padding: "16px",
  },
  productName: {
    margin: "0 0 12px 0",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#333",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  stars: {
    color: "#FF9900",
    fontSize: "0.9rem",
  },
  ratingText: {
    color: "#999",
    fontSize: "0.85rem",
  },
  priceSection: {
    marginBottom: "12px",
  },
  price: {
    margin: 0,
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#FF9900",
  },
  addBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#FF9900",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  cartSection: {
    position: "sticky",
    top: "100px",
    height: "fit-content",
  },
  cartCard: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "2px solid #e0e0e0",
    padding: "20px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
  },
  cartTitle: {
    margin: "0 0 16px 0",
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#333",
  },
  cartDivider: {
    height: "1px",
    background: "#e0e0e0",
    margin: "16px 0",
  },
  emptyCart: {
    color: "#999",
    textAlign: "center",
    padding: "20px 0",
  },
  cartItems: {
    maxHeight: "250px",
    overflowY: "auto",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
    paddingBottom: "12px",
    borderBottom: "1px solid #e0e0e0",
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    margin: "0 0 4px 0",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#333",
  },
  cartItemPrice: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#FF9900",
    fontWeight: "bold",
  },
  removeBtn: {
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8rem",
  },
  cartSummary: {
    marginTop: "16px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.9rem",
    marginBottom: "8px",
    color: "#555",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "16px",
  },
  totalAmount: {
    color: "#FF9900",
  },
  checkoutBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#FF9900",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};
