import os
from flask import Blueprint, request, jsonify, current_app

from utils.predictor import predict_image
from utils.db import get_connection
from werkzeug.utils import secure_filename

predict_bp = Blueprint("predict", __name__)


@predict_bp.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    filename = secure_filename(file.filename)
    path = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)

    file.save(path)

    result = predict_image(path)

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO predictions(username,image,label,confidence) VALUES (?,?,?,?)",
        ("anonymous", filename, result["label"], result["confidence"])
    )

    conn.commit()
    conn.close()

    return jsonify(result)