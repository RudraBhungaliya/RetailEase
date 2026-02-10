import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
    const navigate = useNavigate();
    const wishlist = [
        { id: 2, name: "White Hoodie", price: 2999, rating: 4.3 },
        { id: 4, name: "Classic Watch", price: 6999, rating: 4.6 }
    ];

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>My Wishlist</h1>
                <p style={styles.subtitle}>Save your favorite items</p>
            </div>

            {wishlist.length === 0 ? (
                <div style={styles.empty}>
                    <div style={styles.emptyIcon}>📲</div>
                    <p style={styles.emptyText}>Your wishlist is empty.</p>
                    <button style={styles.ctaBtn} onClick={() => navigate("/productPage")}>Browse Products</button>
                </div>
            ) : (
                <div style={styles.grid}>
                    {wishlist.map(item => (
                        <div key={item.id} style={styles.card}>
                            <div style={styles.imagePlaceholder}>
                                <span style={{ fontSize: "4rem" }}>🛍️</span>
                                <button style={styles.wishlistBtn}>❥</button>
                            </div>
                            <div style={styles.info}>
                                <h3 style={styles.productName}>{item.name}</h3>
                                <div style={styles.rating}>
                                    <span style={styles.stars}>★★★★☆</span>
                                    <span style={styles.ratingText}>{item.rating}</span>
                                </div>
                                <p style={styles.price}>₹{item.price.toLocaleString()}</p>
                                <button style={styles.cartBtn}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
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
    empty: { 
        textAlign: "center", 
        color: "#666", 
        marginTop: "120px",
        paddingBottom: "120px",
    },
    emptyIcon: {
        fontSize: "4rem",
        marginBottom: "24px",
    },
    emptyText: {
        fontSize: "1.1rem",
        marginBottom: "24px",
        color: "#666",
    },
    ctaBtn: {
        background: "#FF9900",
        border: "none",
        color: "#fff",
        padding: "12px 32px",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "28px",
    },
    card: {
        background: "#ffffff",
        borderRadius: "12px",
        border: "2px solid #e0e0e0",
        overflow: "hidden",
        transition: "all 0.3s ease",
    },
    imagePlaceholder: {
        height: "240px",
        background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    wishlistBtn: {
        position: "absolute",
        top: "12px",
        right: "12px",
        background: "#f44336",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        fontSize: "1.2rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    info: { 
        padding: "20px" 
    },
    productName: {
        margin: "0 0 12px 0",
        fontSize: "1.1rem",
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
        color: "#666",
        fontSize: "0.85rem",
    },
    price: { 
        color: "#FF9900", 
        fontWeight: "bold", 
        margin: "0 0 16px 0",
        fontSize: "1.2rem",
    },
    cartBtn: {
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        background: "#FF9900",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease",
    }
};
