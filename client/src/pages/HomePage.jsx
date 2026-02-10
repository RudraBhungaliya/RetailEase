import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    const featuredProducts = [
        { id: 1, name: "Premium Electronics", price: 24999, category: "Electronics" },
        { id: 2, name: "Home & Kitchen Essentials", price: 5999, category: "Home" },
        { id: 3, name: "Sports & Outdoors Gear", price: 3499, category: "Sports" }
    ];

    return (
        <div style={styles.page}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        Shop Everything. <span style={{ color: "#FF9900" }}>Anything.</span>
                    </h1>
                    <p style={styles.heroSubtitle}>
                        From electronics to home goods, fashion to sports equipment.
                        Find everything you need in one place.
                    </p>
                    <button style={styles.ctaButton} onClick={() => navigate("/productPage")}>
                        Shop Collection
                    </button>
                </div>
            </section>

            {/* Categories Section */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Shop by Category</h2>
                <div style={styles.categoryGrid}>
                    {["Electronics", "Home & Kitchen", "Fashion", "Sports", "Books", "Toys"].map((cat) => (
                        <div key={cat} style={styles.categoryCard}>
                            <div style={styles.categoryIcon}>👔</div>
                            <h3 style={styles.categoryName}>{cat}</h3>
                            <p style={styles.categoryDesc}>Browse {cat.toLowerCase()}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured / Trending Preview */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Trending Now</h2>
                <div style={styles.grid}>
                    {featuredProducts.map((product) => (
                        <div key={product.id} style={styles.card}>
                            <div style={styles.cardImagePlaceholder}>
                                <span style={{ fontSize: "3rem" }}>🛍️</span>
                            </div>
                            <div style={styles.cardInfo}>
                                <p style={styles.cardCategory}>{product.category}</p>
                                <h3 style={styles.cardTitle}>{product.name}</h3>
                                <p style={styles.cardPrice}>₹{product.price.toLocaleString()}</p>
                                <button style={styles.cardBtn} onClick={() => navigate("/productPage")}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

const styles = {
    page: {
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#ffffff",
        color: "#333",
    },
    hero: {
        textAlign: "center",
        padding: "80px 40px",
        marginBottom: "80px",
        background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
        borderRadius: "24px",
        border: "2px solid #FF9900",
        boxShadow: "0 8px 32px rgba(255, 153, 0, 0.1)",
    },
    heroTitle: {
        fontSize: "3.5rem",
        marginBottom: "24px",
        lineHeight: 1.1,
        fontWeight: "700",
    },
    heroSubtitle: {
        fontSize: "1.2rem",
        color: "#555",
        marginBottom: "40px",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
    },
    ctaButton: {
        padding: "16px 48px",
        fontSize: "18px",
        fontWeight: "bold",
        borderRadius: "12px",
        border: "none",
        background: "#ffffff",
        color: "#000000",
        cursor: "pointer",
        boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)",
        transition: "all 0.3s ease",
    },
    section: {
        marginBottom: "80px",
    },
    sectionTitle: {
        fontSize: "2.2rem",
        marginBottom: "40px",
        borderLeft: "4px solid #FF9900",
        paddingLeft: "16px",
        fontWeight: "600",
        color: "#333",
    },
    categoryGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "24px",
        marginBottom: "40px",
    },
    categoryCard: {
        background: "#f9f9f9",
        borderRadius: "16px",
        border: "2px solid #e0e0e0",
        padding: "32px 24px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    categoryIcon: {
        fontSize: "3rem",
        marginBottom: "16px",
    },
    categoryName: {
        fontSize: "1.3rem",
        margin: "12px 0 8px 0",
        color: "#333",
        fontWeight: "600",
    },
    categoryDesc: {
        color: "#999",
        margin: 0,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "28px",
    },
    card: {
        background: "#ffffff",
        borderRadius: "16px",
        border: "2px solid #e0e0e0",
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    },
    cardImagePlaceholder: {
        height: "220px",
        background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cardInfo: {
        padding: "24px",
    },
    cardCategory: {
        fontSize: "0.85rem",
        color: "#FF9900",
        fontWeight: "600",
        margin: "0 0 8px 0",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    cardTitle: {
        margin: "0 0 12px 0",
        fontSize: "1.1rem",
        fontWeight: "600",
        color: "#333",
    },
    cardPrice: {
        color: "#FF9900",
        fontWeight: "bold",
        fontSize: "1.2rem",
        margin: "0 0 16px 0",
    },
    cardBtn: {
        width: "100%",
        padding: "10px 16px",
        fontSize: "0.95rem",
        fontWeight: "600",
        borderRadius: "8px",
        border: "none",
        background: "#FF9900",
        color: "#ffffff",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
};
