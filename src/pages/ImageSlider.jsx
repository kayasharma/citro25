import React from "react";
import "./ImageSlider.css";

const images = [
  "a.jpg",
  "aaa.jpg",
  "b.jpg",
  "two.jpg",
  "ccc.jpg",
  "d.jpg",
  "e.jpg",
  "four.jpg",
  "g.jpg",
  "h.jpg",
  "j.jpg",
  "jj.jpg",
  "jjj.jpg",
  "kk.jpg",
  "i.jpg",
  "m.jpg",
  "nine.PNG",
  "one.jpg",
  "six.PNG",
  "ten.PNG",
  "thre.jpg",
  "13.PNG",
  "21.PNG",
  "22.PNG",
];

const tallImages = [3, 6, 11, 12, 15, 16, 18, 19, 20, 22];

function ImageSlider() {
  return (
    <div>
      <h1 className="photos-heading">Photos</h1>
      <div className="zoo">
        {images.map((image, index) => (
          <div
            key={index}
            className={`animal ${
              tallImages.includes(index + 1) ? "giraffe" : ""
            }`}
          >
            <img
              className="full-size-image"
              src={`/img/${image}`}
              alt={`Animal ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
