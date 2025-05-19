import React, { useState } from "react";

const DressRecommendation = () => {
  const [features, setFeatures] = useState([/* Your input values */]);
  const [recommendation, setRecommendation] = useState("");

  const getRecommendation = async () => {
    try {
      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });

      const data = await response.json();
      setRecommendation(data.recommended_dress);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };

  return (
    <div>
      <h1>Dress Recommendation System</h1>
      <button onClick={getRecommendation}>Get Recommendation</button>
      {recommendation && <p>Recommended Dress: {recommendation}</p>}
    </div>
  );
};

export default DressRecommendation;
