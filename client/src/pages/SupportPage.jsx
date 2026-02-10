export default function SupportPage() {
    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Help & Support</h1>
                <p style={styles.subtitle}>We're here to help you</p>
            </div>

            <div style={styles.layout}>
                <div style={styles.faqSec}>
                    <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
                    <div style={styles.faqList}>
                        <div style={styles.faqItem}>
                            <h3 style={styles.q}>🗓️ How do I track my order?</h3>
                            <p style={styles.a}>You can track your order status in the "Orders" section of your account dashboard. You'll receive SMS and email notifications for every status update.</p>
                        </div>
                        <div style={styles.faqItem}>
                            <h3 style={styles.q}>🛍️ What is the return policy?</h3>
                            <p style={styles.a}>We offer a hassle-free 30-day return policy for all unused items in original packaging. Visit our Returns page for detailed instructions.</p>
                        </div>
                        <div style={styles.faqItem}>
                            <h3 style={styles.q}>💳 What payment methods do you accept?</h3>
                            <p style={styles.a}>We accept all major credit/debit cards, digital wallets (Apple Pay, Google Pay), net banking, and cash on delivery in select areas.</p>
                        </div>
                        <div style={styles.faqItem}>
                            <h3 style={styles.q}>🚲 Do you offer free shipping?</h3>
                            <p style={styles.a}>Yes! We offer free shipping on orders above ₹1000. For orders below, shipping charges apply based on your location.</p>
                        </div>
                    </div>
                </div>

                <div style={styles.formSec}>
                    <h2 style={styles.sectionTitle}>Contact Us</h2>
                    <p style={styles.formSubtext}>Have a question? Send us a message and we'll respond within 24 hours.</p>
                    <form style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Your Name</label>
                            <input style={styles.input} placeholder="John Doe" />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email Address</label>
                            <input style={styles.input} type="email" placeholder="your@email.com" />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Subject</label>
                            <input style={styles.input} placeholder="How can we help?" />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Message</label>
                            <textarea style={styles.textarea} placeholder="Tell us more about your issue..." rows={6} />
                        </div>
                        <button type="submit" style={styles.btn}>Send Message</button>
                    </form>
                </div>
            </div>
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
        marginBottom: "60px",
        textAlign: "center",
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
    layout: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
    },
    faqSec: {
        order: 0,
    },
    faqList: {
        marginTop: "24px",
    },
    faqItem: { 
        marginBottom: "32px",
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
    },
    sectionTitle: { 
        fontSize: "1.5rem", 
        marginBottom: "24px", 
        color: "#333",
        fontWeight: "700",
    },
    q: { 
        fontSize: "1.05rem", 
        marginBottom: "12px", 
        color: "#333",
        fontWeight: "600",
    },
    a: { 
        color: "#555", 
        lineHeight: "1.6",
        margin: 0,
        fontSize: "0.95rem",
    },
    formSec: {
        background: "#ffffff",
        padding: "32px",
        borderRadius: "12px",
        border: "2px solid #e0e0e0",
    },
    formSubtext: {
        color: "#555",
        marginBottom: "24px",
        fontSize: "0.95rem",
    },
    form: { 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    label: {
        fontSize: "13px",
        fontWeight: "600",
        color: "#FF9900",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    input: {
        padding: "12px 14px",
        borderRadius: "8px",
        border: "2px solid #FF9900",
        outline: "none",
        background: "#fafafa",
        color: "#333",
        fontFamily: "inherit",
        transition: "all 0.3s ease",
    },
    textarea: {
        padding: "12px 14px",
        borderRadius: "8px",
        border: "2px solid #FF9900",
        outline: "none",
        background: "#fafafa",
        color: "#333",
        fontFamily: "inherit",
        resize: "vertical",
        transition: "all 0.3s ease",
    },
    btn: {
        padding: "12px 24px",
        borderRadius: "8px",
        border: "none",
        background: "#FF9900",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease",
        fontSize: "15px",
    }
};
