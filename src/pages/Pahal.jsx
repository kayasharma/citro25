import React, { useState, useMemo, memo } from "react";
import "./Robote.css";
import { Link } from "react-router-dom";
const products = [
  {
    id: 6,
    name: "PROJECT COMPETITION (S/W)",
    image: "/images/ppt.webp",
    price: "₹500/-",
    date: "27-Mar",
    time: "10:00 AM to 3:00 PM",
    prize: "₹50,000/-",
    "1st prize": "₹12,000/-",
    "2nd prize": "₹8,000/-",
    "3rd prize": "₹5,000/-",
    venue: "seminar hall 1",
    button: "See Details",
    author: "",
    author1: "HEAD(FACULTY):  name",
    "phone no": "number",
    facultyno: "",
    aboutFile: "/pdf/PAHALProjectCompetitionRulesRegulations_2025.pdf",
  },
  {
    id: 7,
    name: "PROJECT COMPETITION (H/W)",
    image: "/images/ppt.webp",
    price: "₹500/-",
    date: "27-Mar",
    time: "10:00 AM to 3:00 PM",
    prize: "₹50,000/-",
    "1st prize": "₹12,000/-",
    "2nd prize": "₹8,000/-",
    "3rd prize": "₹5,000/-",
    venue: "seminar hall 1",
    author: "",
    author1: "HEAD(FACULTY):",
    "phone no": "no",
    facultyno: "",
    button: "See Details",
    aboutFile: "/pdf/PAHALProjectCompetitionRulesRegulations_2025.pdf",
  },
];

// 🟢 Memoized ProductCard to prevent unnecessary re-renders
const ProductCard = memo(({ product, openPreview }) => {
  return (
    <div className="product" onClick={() => openPreview(product.id)}>
      <img
        src={product.image}
        alt={product.name}
        loading="lazy" // Lazy load product images
      />
      <div className="card-details">
        <div style={{ display: "flex", justifyContent: "space-between" }}></div>
        <p className="date">{product.date}</p>
        <h3>{product.name}</h3>
        <p className="author1">{product.author1}</p>
        <p className="author1"> Mobile Number: {product["phone no"]}</p>
        <div className="prizes">
          <p>Prize: {product["prize"]}</p>
        </div>
        <Link to="" className="button">
          {product.button}
        </Link>
      </div>
    </div>
  );
});

const Pahal = () => {
  const [activePreview, setActivePreview] = useState(null);

  // 🟢 Memoize filtered product to avoid unnecessary re-renders when the product list does not change
  const activeProduct = useMemo(
    () => products.find((product) => product.id === activePreview),
    [activePreview]
  );

  // Open the preview for the selected product
  const openPreview = (productId) => {
    console.log("Opening preview for product:", productId); // Debugging
    setActivePreview(productId);
  };

  // Close the preview
  const closePreview = () => {
    console.log("Closing preview");
    setActivePreview(null);
  };

  return (
    <div className="container">
      <h3 className="title">ROBOTICS</h3>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            openPreview={setActivePreview}
          />
        ))}
      </div>

      {activeProduct && (
        <div className="products-preview active">
          <div className="preview">
            <i
              className="fas fa-times"
              onClick={() => setActivePreview(null)}
            ></i>
            <img src={activeProduct.image} alt={activeProduct.name} />
            <h3>{activeProduct.name}</h3>

            <div className="details-row">
              <div className="detail-item">
                <strong>Time:</strong> {activeProduct.time}
                <strong> Head (student):</strong> {activeProduct.author}
              </div>
              <div className="detail-item">
                <strong>Venue:</strong> {activeProduct.venue}
                <strong> Head Number:</strong>
                {activeProduct.facultyno}
              </div>
              <div className="detail-item">
                <strong>1st Prize:</strong> {activeProduct["1st prize"]}
                <strong>2nd Prize:</strong> {activeProduct["2nd prize"]}
              </div>
            </div>
            <div className="price">{activeProduct.price}</div>
            <div className="buttons">
              <a
                href={activeProduct.aboutFile}
                className="buy"
                target="_blank" // Open the .pdf file in a new tab
                rel="noopener noreferrer"
              >
                About
              </a>
              <a href="/Register" className="cart">
                Participate now!
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pahal;
