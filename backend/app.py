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

    # CSV SUPPORT
    if filename.endswith(".csv"):
        df = pd.read_csv(file)
        data = df.to_dict(orient="records")
        return jsonify({
            "message": "CSV uploaded successfully",
            "data": data,
            "sheets": ["CSV"]
        })

    # EXCEL SUPPORT
    excel_file = pd.ExcelFile(file)
    sheet_names = excel_file.sheet_names
    first_sheet = sheet_names[0]
    df = pd.read_excel(
        excel_file,
        sheet_name=first_sheet
    )
    data = df.to_dict(orient="records")
    return jsonify({
        "message": "Excel uploaded successfully",
        "data": data,
        "sheets": sheet_names
    })

if __name__ == "__main__":
    app.run(debug=True)