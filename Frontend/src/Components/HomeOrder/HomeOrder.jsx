import React, { useEffect, useRef, useState } from "react";
import {
  Wheat,
  ShieldCheck,
  Leaf,
  Sprout,
  Phone,
  MapPin,
} from "lucide-react";

import "./HomeOrder.css";

// =====================================================
// PRODUCT IMAGE IMPORTS
// =====================================================

import heroBesan from "../../assets/HeroBesan.png";
import mainLogo from "../../assets/rice-flour.jpeg";
import rollImage from "../../assets/sooji.jpeg";
import saladaImage from "../../assets/sattu.jpeg";

// =====================================================
// STATIC DATA
// =====================================================

const TRADE_PHONE = "9007252221";

const PRODUCTS = [
  {
    id: "chana-besan",
    variant: "hero",
    category: "Besan",
    name: "Chana Besan",
    hindi: "शुद्धता की पहचान, स्वाद का एहसास",
    description:
      "Finely stone-ground from selected chana dal. Smooth, aromatic and rich in protein for crisp pakoda, soft dhokla and golden cheela.",

    // Imported image
    image: heroBesan,

    features: [
      "100% Pure",
      "Rich in Protein",
      "Hygienically Packed",
    ],

    perfectFor: [
      "Pakoda",
      "Ladoo",
      "Dhokla",
      "Cheela",
    ],

    packs: "200g · 500g · 1kg",
  },

  {
    id: "rice-flour",
    variant: "compact",
    category: "Rice Flour",
    name: "Pure & Natural Rice Flour",
    hindi: "Healthy way of life",
    description:
      "Light, easy to digest and finely milled. Ideal for idli, dosa, appam and traditional snacks.",

    // Imported image
    image: rollImage,

    features: [
      "Easy to Digest",
      "Great Freshness",
    ],

    perfectFor: [
      "Idli",
      "Dosa",
      "Appam",
    ],

    packs: "500g · 1kg",
  },

  {
    id: "sattu",
    variant: "compact",
    category: "Sattu",
    name: "High-Protein Sattu",
    hindi: "Taakat ka desi khazana",
    description:
      "Roasted gram flour packed with natural protein and fibre. A cooling summer drink and a hearty paratha filling.",

    // Imported image
    image: saladaImage,

    features: [
      "Natural Goodness",
      "High Fibre",
    ],

    perfectFor: [
      "Sharbat",
      "Litti",
      "Paratha",
    ],

    packs: "200g · 500g",
  },

  {
    id: "sabudana",
    variant: "wide",
    category: "Sabudana",
    name: "Premium Sorted Sabudana",
    hindi: "Vrat ki pehli pasand",
    description:
      "Carefully cleaned and size-sorted pearls that cook up soft, separate and non-sticky. Perfect for khichdi, vada and kheer.",

    // Imported image
    image: mainLogo,

    features: [
      "Hand Sorted",
      "Non-Sticky",
      "Premium Quality",
    ],

    perfectFor: [
      "Khichdi",
      "Vada",
      "Kheer",
    ],

    packs: "250g · 500g · 1kg",
  },
];

// =====================================================
// FULL PRODUCT RANGE
// =====================================================

const RANGE = [
  "Sattoo",
  "Sooji",
  "Chana Besan",
  "Wheat Daliya",
  "Rice Flour",
  "Corn Flour",
  "Saboodana",
];

// =====================================================
// TRUST ITEMS
// =====================================================

const TRUST = [
  {
    icon: Leaf,
    title: "100% Pure",
    text: "No additives or fillers",
  },
  {
    icon: Wheat,
    title: "Stone Ground",
    text: "Fresh milled in small batches",
  },
  {
    icon: ShieldCheck,
    title: "Hygienically Packed",
    text: "Sealed for freshness",
  },
  {
    icon: Sprout,
    title: "Farm Selected",
    text: "Sourced from trusted growers",
  },
];

// =====================================================
// PRODUCT CARD
// =====================================================

function ProductCard({ product, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = cardRef.current;

    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`pcard pcard--${product.variant} ${
        visible ? "pcard--visible" : ""
      }`}
      style={{
        "--reveal-index": index,
      }}
    >
      <div className="pcard__frame">

        {/* ================= IMAGE ================= */}

        <div className="pcard__media">
          <img
            className="pcard__image"
            src={product.image}
            alt={`${product.name} - Foodigo`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />

          <span
            className="pcard__scrim"
            aria-hidden="true"
          />
        </div>

        {/* ================= BADGE ================= */}

        <span className="pcard__badge">
          <Leaf size={12} />
          100% Pure &amp; Natural
        </span>

        {/* ================= CONTENT ================= */}

        <div className="pcard__content">

          <div className="pcard__text">

            <span className="pcard__category">
              {product.category}
            </span>

            <h3 className="pcard__title">
              {product.name}
            </h3>

            <p className="pcard__hindi">
              {product.hindi}
            </p>

            <p className="pcard__note">
              {product.description}
            </p>

            {/* FEATURES */}

            <ul className="pcard__chips">
              {product.features.map((feature) => (
                <li key={feature}>
                  {feature}
                </li>
              ))}
            </ul>

          </div>

          {/* ================= FOOTER ================= */}

          <div className="pcard__footer">

            <div className="pcard__meta">

              <span className="pcard__meta-label">
                Perfect for
              </span>

              <span className="pcard__meta-value">
                {product.perfectFor.join(" • ")}
              </span>

            </div>

            <div className="pcard__meta pcard__meta--right">

              <span className="pcard__meta-label">
                Pack sizes
              </span>

              <span className="pcard__meta-value">
                {product.packs}
              </span>

            </div>

          </div>

        </div>
      </div>
    </article>
  );
}

// =====================================================
// HOME ORDER
// =====================================================

const HomeOrder = () => {
  return (
    <section
      className="home-order"
      aria-labelledby="home-order-heading"
    >

      {/* ================= BACKGROUND ================= */}

      <div
        className="home-order__bg"
        aria-hidden="true"
      >
        <span className="home-order__bloom home-order__bloom--one" />
        <span className="home-order__bloom home-order__bloom--two" />
      </div>

      <div className="home-order__inner">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="home-order__intro">

          <div className="home-order__badge">
            <span className="home-order__badge-dot" />
            Direct From Mill
          </div>

          <h2
            id="home-order-heading"
            className="home-order__heading"
          >
            Fresh Daily Staples,{" "}
            <em>Purity Guaranteed</em>
          </h2>

          <p className="home-order__sub">
            Stone-ground Besan, high-protein Sattu,
            fine Rice Flour and pristine Sabudana,
            freshly milled and packed in Siliguri.
          </p>

        </header>

        {/* =================================================
            TRUST STRIP
        ================================================= */}

        <ul className="home-order__trust">

          {TRUST.map(
            ({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="home-order__trust-item"
              >

                <span className="home-order__trust-icon">
                  <Icon size={20} />
                </span>

                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>

              </li>
            )
          )}

        </ul>

        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        <div className="home-order__grid">

          {PRODUCTS.map(
            (product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            )
          )}

        </div>

        {/* =================================================
            FULL RANGE + TRADE ENQUIRY
        ================================================= */}

        <div className="home-order__range">

          <div className="home-order__range-text">

            <span className="home-order__range-label">
              Our full range
            </span>

            <ul className="home-order__range-list">

              {RANGE.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}

            </ul>

            <p className="home-order__range-addr">
              <MapPin size={14} />

              <span>
                Patiramjote, Matigara, Siliguri,
                Dist. Darjiling, West Bengal
              </span>
            </p>

          </div>

          <a
            className="home-order__trade"
            href={`tel:${TRADE_PHONE}`}
            aria-label={`Call trade enquiry ${TRADE_PHONE}`}
          >

            <Phone size={18} />

            <span>
              <small>Trade enquiry</small>
              <strong>{TRADE_PHONE}</strong>
            </span>

          </a>

        </div>

      </div>
    </section>
  );
};

export default HomeOrder;