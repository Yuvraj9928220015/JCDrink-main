"use client";
import { useEffect, useState } from "react";
import { marked } from "marked";
import "../blog.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jcdrink.com";

function getSlugFromURL() {
  if (typeof window === "undefined") return null;
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export default function BlogClient({ initialBlog }) {
  const [blog, setBlog] = useState(initialBlog || null);
  const [loading, setLoading] = useState(!initialBlog);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (initialBlog) return; // SSR se content mil chuka hai, dobara fetch mat karo

    const slug = getSlugFromURL();
    if (!slug || slug === "placeholder") {
      setLoading(false);
      setNotFound(true);
      return;
    }

    fetch(`${API_URL}/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.message === "Blog not found") {
          setNotFound(true);
        } else {
          setBlog(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [initialBlog]);

  if (loading) {
    return <div style={{ padding: "60px", textAlign: "center" }}>Loading...</div>;
  }

  if (notFound || !blog) {
    return <div style={{ padding: "60px", textAlign: "center" }}><p>Blog not found.</p></div>;
  }

  const imageSrc = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `${API_URL}${blog.image}`
    : "/Blog-image.png";

  const htmlContent = marked.parse(blog.content || "");

  return (
    <div className="Blog">
      <div className="Blog-line"></div>
      <div className="BlogDetail-wrapper">
        <div className="BlogDetail-hero">
          <img src={imageSrc} alt={blog.altTag || blog.title} />
          <div className="BlogDetail-hero-overlay"></div>
        </div>

        <div className="BlogDetail-body">
          <h1 className="Blog-main-h1">{blog.title}</h1>
          <div className="BlogDetail-meta" style={{ marginBottom: "20px", color: "#888" }}>
            <span>{blog.author}</span>
            <span style={{ marginLeft: "12px" }}>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div
            className="BlogDetail-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
}