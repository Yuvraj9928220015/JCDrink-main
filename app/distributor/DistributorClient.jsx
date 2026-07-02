"use client";

import React, { useState } from 'react';
import "./distributor.css";

const products = [
  {
    id: 1,
    title: "DESI JEERA",
    bg: "whisky-bg",
    img: "Distributor-8.png",
    reverse: false,
    link: "/product/desi-jeera/",
    des: "DESI JEERA bursts with a bold, refreshing kick that instantly cools you down and wakes up your senses. Packed with the classic Indian jeera zing, it boosts digestion while delivering a crisp, energizing flavor that never fails to refresh. Whether you're chilling after a heavy meal or beating the heat, this drink brings pure desi power in every sip. DESI JEERA—the ultimate cool, spicy, and feel-good refreshment!"
  },
  {
    id: 2,
    title: "APPLE FIIZI",
    bg: "vodka-bg",
    img: "Distributor-2.png",
    reverse: true,
    link: "/product/apple-fiizi/",
    des: "APPLE FIIZI bursts with a juicy apple kick and a lively fizz that instantly refreshes your mood. Every sip blends crisp sweetness with bubbly energy, giving you a bright, uplifting boost. Perfect for hot days, busy moments, or anytime you crave a fresh, fruity spark. APPLE FIIZI — the bubbly apple blast that keeps you refreshed and energized!"
  },
  {
    id: 3,
    title: "SWEET LEMON",
    bg: "tequila-bg",
    img: "Distributor-3.png",
    reverse: false,
    link: "/product/sweet-lemon/",
    des: "SWEET LEMON hits with a smooth, refreshing blend of sweetness and zesty lemon that instantly lifts your mood. Its light, crisp flavor gives you a clean, energizing boost that keeps you feeling fresh all day. Perfect for relaxing, recharging, or beating the heat. SWEET LEMON — the sweet, sunny refreshment that brightens every moment!"
  },
  {
    id: 4,
    title: "COLA DRINK",
    img: "Distributor-4.png",
    reverse: true,
    link: "/product/cola-drink/",
    des: "COLA DRINK delivers a bold, fizzy punch that instantly lifts your energy and refreshes your vibe. With its rich cola flavor and crisp carbonation, every sip hits with classic taste and unstoppable freshness. Whether you're chilling, working, or on the move, this drink keeps the momentum high. COLA DRINK — the timeless spark that keeps you charged!"
  },
  {
    id: 5,
    title: "CLEAR LEMON",
    bg: "vodka-bg",
    img: "Distributor-5.png",
    reverse: false,
    link: "/product/clear-lemon/",
    des: "CLEAR LEMON hits with a sharp, zesty blast that instantly refreshes your mood and wakes up your senses. Its pure, crisp lemon flavor brings an icy-cool kick that keeps you feeling light, fresh, and fully recharged. Perfect for hot days, busy hours, or anytime you need a clean burst of energy. CLEAR LEMON — pure freshness, pure power, in every sip!"
  },
  {
    id: 6,
    title: "TANGY ORANGE",
    bg: "brandy-bg",
    img: "Distributor-6.png",
    reverse: true,
    link: "/product/tangy-orange/",
    des: "TANGY ORANGE explodes with a bold citrus burst that instantly wakes you up and refreshes your senses. Its sharp, juicy orange kick combined with lively fizz gives you a bright, energizing lift every time. Perfect for sunny days, busy hours, or whenever you need a zesty boost. TANGY ORANGE — the vibrant citrus rush that keeps you refreshed and unstoppable!"
  },
  {
    id: 7,
    title: "ENERGY DRINK",
    bg: "liqueur-bg",
    img: "Distributor-7.png",
    reverse: false,
    link: "/product/energy-drink/",
    des: "X FACTOR ENERGY DRINK hits you with a fast, electrifying boost that fires up your focus and instantly elevates your stamina. Its crisp, bold taste and explosive formula keep your energy raging through intense workouts, long hours, and high-pressure moments. Powered by natural energizers for clean, long-lasting strength, it's the ultimate fuel for anyone ready to feel unstoppable—anytime, anywhere."
  }
];

export default function Distributor() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNo: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ firstName: '', lastName: '', contactNo: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <div className="distributor-page-banner">
        <img src="/Just-Drink-Banner.jpg" alt="Just Drink Banner" />
      </div>

      <div className="distributor-page">
        <div className="distributor-page-title">Become a JC Cold Drink Distributor in India – Grow Your Business</div>

        {products.map((p) => (
          <section key={p.id} className={`product-hero ${p.bg || ''}`}>
            <div className={`product-container ${p.reverse ? 'reverse' : ''}`}>
              <div className="product-image-box">
                <img src={`/${p.img}`} alt={p.title} className="floating-bottle" />
              </div>
              <div className="product-info">
                <h2 className="gold-title">{p.title}</h2>
                <p className="description">{p.des}</p>
                <a
                  href={p.link}
                  className={p.reverse ? "dark-btn" : "ghost-btn"}
                  aria-label={`View ${p.title} collection`}
                >
                  View Product
                </a>
              </div>
            </div>
          </section>
        ))}

        {/* Partnership Contact Section */}
        <section className="distributor-contact">
          <div className="contact-inner">

            {/* Left: Info */}
            <div className="contact-details">
              <span className="contact-eyebrow">Get In Touch</span>
              <h3 className="contact-heading">Become a<br /><span className="gold-text">Partner</span></h3>
              <div className="contact-divider" />
              <p className="contact-desc">
                Join our growing network of distributors and bring Savoy's premium spirits to your market. Fill in the form and our team will reach out to you.
              </p>
              <ul className="contact-info-list">
                <li>
                  <span className="info-icon">📍</span>
                  <span>Ajmer, Rajasthan, India</span>
                </li>
                <li>
                  <span className="info-icon">📞</span>
                  <span>+91-8432221711</span>
                </li>
                <li>
                  <span className="info-icon">✉️</span>
                  <span>info@balajibeverages.com</span>
                </li>
              </ul>
            </div>

            {/* Right: Form */}
            <div className="contact-form-wrapper">
              {submitted && (
                <div className="form-success">
                  Thank you! We'll be in touch soon.
                </div>
              )}
              <form className="contact-form-grid" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactNo">Contact No.</label>
                    <input
                      type="tel"
                      id="contactNo"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-mail ID</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your distribution region, experience, and goals..."
                    rows={6}
                    required
                  />
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}