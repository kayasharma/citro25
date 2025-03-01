import React, { useState, memo, useMemo } from "react";
import "./Robote.css";
import { Link } from "react-router-dom";

const products = [
  {
    id: 21,
    name: "ROBO-RACE",
    image: "/images/robot-car.jpg",
    price: "₹500/-",

    venue: "Area Near Gym",
    date: "27-28 Mar",
    time: "10:00 AM to 3:00 PM",
    prize: "₹12000/-",
    "1st prize": "₹8,000/-",
    "2nd prize": "₹4,000/-",
    aboutFile: "/pdf/ECEventDetails.pdf",
    button: "See Details",
    author: "lead",
    author1: "HEAD(FACULTY): Mr. Vishal Vyas",
    "phone no": "7879173756",
    facultyno: "number",
  },
  {
    id: 39,
    name: "ROBO-SOCCER",
    image: "/images/robot-playing-soccer.jpg",
    price: "₹500/-",

    date: "28-29 Mar",
    time: "10:00 AM to 3:00 PM",
    venue: "lawn",
    prize: "₹12000/-",
    "1st prize": "₹8,000/-",
    "2nd prize": "₹4,000/-",
    aboutFile: "/pdf/ECEventDetails.pdf",
    button: "See Details",
    author: "lead",
    author1: "HEAD(FACULTY):  Ms. Mitali Sisodiya",
    "phone no": "8770997394",
    facultyno: "number",
  },
  {
    id: 38,
    name: "LINE FOLLOWER",
    image: "/images/robot-carrying-wheelbarrow.jpg",
    price: "₹500/-",

    venue: "classroom near sports cabin",
    date: "28-29 Mar",
    time: "10:00 AM to 3:00 PM",
    prize: "₹15000/-",
    "1st prize": "₹10,000/-",
    "2nd prize": "₹5,000/-",
    aboutFile: "/pdf/ECEventDetails.pdf",
    button: "See Details",
    author: "lead",
    author1: "HEAD(FACULTY): Ms. Manisha Gaud",
    "phone no": "9669988288",
    facultyno: "number",
  },
];

// 🟢 Memoized ProductCard to prevent unnecessary re-renders
const ProductCard = memo(({ product, openPreview }) => {
  return (
    <div className="product" onClick={() => openPreview(product.id)}>
      <img
        src={product.image}
        srcSet={`${product.image}?w=300 300w, ${product.image}?w=600 600w`}
        sizes="(max-width: 600px) 300px, 600px"
        alt={product.name}
        loading="lazy"
        decoding="async"
        width="300"
        height="200"
        style={{ objectFit: "cover" }}
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

const Robote = () => {
  const [activePreview, setActivePreview] = useState(null);

  // 🟢 Memoize filtered product to prevent recalculating on every render
  const activeProduct = useMemo(
    () => products.find((product) => product.id === activePreview),
    [activePreview]
  );

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

export default Robote;
