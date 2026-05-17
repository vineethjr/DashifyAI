from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/upload", methods=["POST"])
def upload_file():

    if "file" not in request.files:
        return jsonify({
            "message": "No file uploaded"
        }), 400

    file = request.files["file"]

    # FIX: Validate filename exists
    if not file.filename:
        return jsonify({
            "message": "Invalid file"
        }), 400

    filename = file.filename

    try:
        # CSV SUPPORT
        if filename.lower().endswith(".csv"):
            df = pd.read_csv(file)

            # FIX: Validate data exists
            if df.empty:
                return jsonify({
                    "message": "CSV file is empty",
                    "data": [],
                    "sheets": ["CSV"]
                }), 200

            data = df.to_dict(orient="records")

            return jsonify({
                "message": "CSV uploaded successfully",
                "data": data,
                "sheets": ["CSV"]
            }), 200

        # EXCEL SUPPORT
        elif filename.lower().endswith((".xlsx", ".xls",".xlsm")):
            # FIX: Safe Excel file reading
            try:
                excel_file = pd.ExcelFile(file)
            except Exception as e:
                return jsonify({
                    "message": f"Invalid Excel file: {str(e)}"
                }), 400

            sheet_names = excel_file.sheet_names

            # FIX: Validate sheets exist
            if not sheet_names:
                return jsonify({
                    "message": "Excel file has no sheets",
                    "data": [],
                    "sheets": []
                }), 200

            first_sheet = sheet_names[0]

            # FIX: Safe sheet reading
            try:
                df = pd.read_excel(
                    excel_file,
                    sheet_name=first_sheet
                )
            except Exception as e:
                return jsonify({
                    "message": f"Error reading sheet '{first_sheet}': {str(e)}"
                }), 400

            # FIX: Validate data exists
            if df.empty:
                return jsonify({
                    "message": f"Sheet '{first_sheet}' is empty",
                    "data": [],
                    "sheets": sheet_names
                }), 200

            data = df.to_dict(orient="records")

            return jsonify({
                "message": "Excel uploaded successfully",
                "data": data,
                "sheets": sheet_names
            }), 200

        else:
            # FIX: Reject unsupported file types
            return jsonify({
                "message": "Unsupported file type. Please upload .csv or .xlsx/.xls"
            }), 400

    except Exception as e:
        # FIX: Catch all unexpected errors
        print(f"Upload error: {str(e)}")
        return jsonify({
            "message": f"Upload failed: {str(e)}"
        }), 500

if __name__ == "__main__":
    app.run(debug=True)