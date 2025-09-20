import React from "react";

const Pictures = () => {
  const images = [
    "https://cdn.pixabay.com/photo/2014/09/02/15/28/styggkarret-433688_1280.jpg",
    "https://cdn.pixabay.com/photo/2025/05/21/15/34/snow-mountain-9614087_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/12/11/12/51/lynx-8443540_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/04/05/21/09/bird-7902319_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/09/11/14/11/fisherman-2739115_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/07/01/10/50/flycatcher-8864922_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/07/08/19/28/leaves-8115077_1280.jpg",
  ];

  return (
    <div className="pictures-container">
      <h2 className="pictures-heading">Always Makes Me Smile</h2>
      <div className="pictures-grid">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index}`}
            className="pictures-image"
          />
        ))}
      </div>
    </div>
  );
};

export default Pictures;
