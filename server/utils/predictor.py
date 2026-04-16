import random

def predict_image(path):
    labels = ["plastic", "glass", "metal", "paper", "trash"]
    label = random.choice(labels)
    confidence = round(random.uniform(0.7, 0.99), 2)

    return {
        "label": label,
        "confidence": confidence,
        "recyclable": label != "trash"
    }