from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend Running Successfully"

@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]

    # Read Excel file
    filename = file.filename

    if filename.endswith(".csv"):
        df = pd.read_csv(file)
    else:
        df = pd.read_excel(file)

    # Convert first 5 rows to JSON
    data = df.head().to_dict(orient="records")

    return jsonify({
        "message": "File uploaded successfully",
        "data": data
    })

if __name__ == "__main__":
    app.run(debug=True)