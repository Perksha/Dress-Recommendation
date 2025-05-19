from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import pickle  # For LabelEncoders
import json

app = Flask(__name__)
CORS(app)

# Load the trained model
model = tf.keras.models.load_model("dress_recommendation_model.h5")

# Load label encoders
with open("label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)

# Load price scaler
with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # Get JSON input from frontend

    # Convert input to array
    input_features = np.array([
        data["Color"], 
        data["Fabric"], 
        data["Sleeve_Length"], 
        data["Occasion"], 
        data["Skin_Tone"], 
        data["Body_Shape"], 
        len(data["Past_Purchase_History"]), 
        len(data["Extracted_Color_Preferences"]),
        scaler.transform([[data["Price"]]])[0][0]  # Scale price
    ]).reshape(1, -1)

    # Predict dress style
    prediction = np.argmax(model.predict(input_features), axis=1)[0]
    recommended_style = label_encoders["Style"].inverse_transform([prediction])[0]

    response = {"recommended_style": recommended_style}
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
