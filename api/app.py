from flask import Flask, request, jsonify
from nova.planner import run_agent
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/agent", methods=["POST"])
def agent():

    data = request.json
    google_drive_token = data.get("google_drive_access_token")
    google_calendar_token = data.get("google_calendar_access_token")
    text_prompt = data.get("text_prompt")
    image_files = data.get("image_files")
    document_files = data.get("document_files")
    video_files = data.get("video_files")
    file_ext = data.get("file_ext")
    file_names = data.get("file_names")

    result = run_agent(
        text_prompt,
        google_drive_token,
        google_calendar_token,
        image_files,
        document_files,
        video_files,
        file_ext,
        file_names
    )

    return json.loads(result)

if __name__ == "__main__":
    app.run(debug=True)