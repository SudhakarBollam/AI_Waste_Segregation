import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D

# Step 1: Recreate SAME architecture
base_model = MobileNetV2(
    input_shape=(128, 128, 3),
    include_top=False,
    weights=None   # IMPORTANT
)

base_model.trainable = False

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.5)(x)
outputs = Dense(6, activation='softmax')(x)  # 6 classes

model = Model(inputs=base_model.input, outputs=outputs)

# Step 2: Load weights (skip mismatch safely)
model.load_weights("model/mobilenetv2_waste_classifier.h5", by_name=True, skip_mismatch=True)

# Step 3: Save new compatible model
model.save("model/new_model.keras")

print("✅ Model rebuilt and converted successfully!")