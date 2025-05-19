import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ onImageUploaded }) => {
  const [image, setImage] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("http://localhost:5000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    onImageUploaded(res.data.imagePath); // callback to parent
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
