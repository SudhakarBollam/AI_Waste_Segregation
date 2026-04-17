from flask import Flask
from flask_cors import CORS
import os

from routes.auth_routes import auth_bp
from routes.predict_routes import predict_bp
from utils.db import init_db

app = Flask(__name__)

# ✅ CORS FIX (VERY IMPORTANT)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Create uploads folder if not exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize database
init_db()

# Register APIs
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(predict_bp, url_prefix="/api")

PORT = int(os.environ.get("PORT", 7860))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)