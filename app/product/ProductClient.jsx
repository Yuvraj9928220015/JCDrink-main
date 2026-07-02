"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./product.module.css";

const API_BASE_URL = "https://api.jcdrink.com";

function getPriceRange(product) {
  if (!product.priceVariations?.length)
    return `₹${Number(product.price || 0).toFixed(2)}`;
  const prices = product.priceVariations.map((v) => Number(v.price));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max
    ? `₹${min.toFixed(2)}`
    : `₹${min.toFixed(2)} - ₹${max.toFixed(2)}`;
}

function getImageUrl(imagePath) {
  if (!imagePath) return "https://via.placeholder.com/300x300?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE_URL}/${imagePath.replace(/\\/g, "/").replace(/^\/+/, "")}`;
}

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/products`);

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];
      setProducts(arr.filter((p) => p?.slug));
    } catch (err) {
      console.error("fetchProducts error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.productContainer}>
      <div className={styles.productContainerContent}>
        <h1 className={styles.aboutHeading}>Our Products</h1>
        <div className={styles.productContainerContentDes}>
          Browse our collection of amazing products.
        </div>
      </div>

      <div className={styles.productsContainer}>

        {/* ── Loading ── */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div
              style={{
                width: 48,
                height: 48,
                margin: "0 auto 16px",
                border: "4px solid #ffd93d33",
                borderTop: "4px solid #ffd93d",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <p style={{ color: "#888" }}>Loading products...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ color: "#e53e3e", marginBottom: 16 }}>
              ⚠️ Failed to load products: {error}
            </p>
            <button
              onClick={fetchProducts}
              style={{
                padding: "10px 24px",
                background: "#ffd93d",
                color: "#000",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && !error && products.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ color: "#888" }}>No products found.</p>
          </div>
        )}

        {/* ── Products Grid ── */}
        {!loading && !error && products.length > 0 && (
          <div className={styles.productsGrid}>
            {products.map((product) => {
              const productId = product._id || product.id || product.slug;
              return (
                <Link
                  key={productId}
                  href={`/product/${product.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className={styles.productCard}>
                    <div className={styles.productImageContainer}>
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.title || "Product"}
                        className={styles.productImage}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x300?text=Image+Error";
                        }}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <div className={styles.productContainerCategory}>
                        {product.category || "Uncategorized"}
                      </div>
                      <h3 className={styles.productContainerTitle}>
                        {product.title || "Untitled Product"}
                      </h3>
                      <div className={styles.productBottom}>
                        <span className={styles.price}>
                          {getPriceRange(product)}
                        </span>
                        {product.priceVariations?.length > 0 && (
                          <div className={styles.sizesAvailable}>
                            {product.priceVariations.length} size
                            {product.priceVariations.length !== 1 ? "s" : ""}{" "}
                            available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}