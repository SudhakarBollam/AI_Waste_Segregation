import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

# Get server root directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Model path
MODEL_PATH = os.path.join(BASE_DIR, "model", "mobilenetv2_waste_classifier.h5")

model = load_model(MODEL_PATH)

CLASSES = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

RECYCLABLE = ['cardboard', 'glass', 'metal', 'paper', 'plastic']


def predict_image(path):

    img = load_img(path, target_size=(128, 128))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)

    class_index = np.argmax(prediction)
    confidence = float(np.max(prediction))

    label = CLASSES[class_index]

    return {
        "label": label,
        "confidence": confidence,
        "recyclable": label in RECYCLABLE
    }