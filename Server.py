import json
import os
import re
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from openai import OpenAI
# Load secrets from .env in this folder. The key never goes to the browser.
load_dotenv()
# Model name is configured here only (not in index.html).
OPENAI_MODEL = "gpt-4o-mini"
ALLOWED_TYPES = {
    "Assignment",
    "Reading",
    "Quiz",
    "Exam",
    "Project",
    "Other",
}
DATE_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}$")
SYSTEM_INSTRUCTIONS = """
You extract graded work and readings from a course syllabus.
Rules:
- Only extract items that are clearly written in the syllabus.
- Do not invent assignments, readings, quizzes, exams, projects, or dates.
- Do not guess missing details.
- Ignore office hours, grading weights, policies, and contact information unless they are themselves an assignment.
- type must be one of: Assignment, Reading, Quiz, Exam, Project, Other.
- due must be YYYY-MM-DD when the syllabus gives a real calendar date.
- If a date is missing, TBD, TBA, unclear, or only a weekday with no date, set due to an empty string.
- If the year is not stated and cannot be known from the syllabus, set due to an empty string.
- source must be a short quote copied from the syllabus that supports the item. Do not paraphrase if you can copy.
- If nothing can be extracted, return {"items": []}.
""".strip()
ITEM_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "required": ["items"],
    "properties": {
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "additionalProperties": False,
                "required": ["type", "item", "due", "source"],
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": [
                            "Assignment",
                            "Reading",
                            "Quiz",
                            "Exam",
                            "Project",
                            "Other",
                        ],
                    },
                    "item": {"type": "string"},
                    "due": {"type": "string"},
                    "source": {"type": "string"},
                },
            },
        }
    },
}
app = Flask(__name__)
ROOT = os.path.dirname(os.path.abspath(__file__))
def json_error(message, status_code):
    return jsonify({"error": message}), status_code
def valid_due_date(value):
    if not value:
        return ""
    text = str(value).strip()
    if not DATE_PATTERN.fullmatch(text):
        return ""
    try:
        datetime.strptime(text, "%Y-%m-%d")
    except ValueError:
        return ""
    return text
def clean_items(raw_items):
    cleaned = []
    for raw in raw_items or []:
        if not isinstance(raw, dict):
            continue
        name = str(raw.get("item") or "").strip()
        if not name:
            continue
        item_type = str(raw.get("type") or "Other").strip()
        if item_type not in ALLOWED_TYPES:
            item_type = "Other"
        due = valid_due_date(raw.get("due"))
        source = str(raw.get("source") or "").strip()
        cleaned.append(
            {
                "type": item_type,
                "item": name,
                "due": due,
                "source": source,
            }
        )
    return cleaned
def extract_items(syllabus, course):
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key or api_key == "paste_your_openai_api_key_here":
        raise RuntimeError(
            "OPENAI_API_KEY is missing. Put your key in the .env file."
        )
    client = OpenAI(api_key=api_key)
    user_message = (
        "Course name: "
        + (course or "(not provided)")
        + "\n\nSyllabus text:\n"
        + syllabus
    )
    response = client.responses.create(
        model=OPENAI_MODEL,
        instructions=SYSTEM_INSTRUCTIONS,
        input=user_message,
        text={
            "format": {
                "type": "json_schema",
                "name": "syllabus_items",
                "schema": ITEM_SCHEMA,
                "strict": True,
            }
        },
    )
    raw_text = (response.output_text or "").strip()
    if not raw_text:
        raise RuntimeError("The AI returned an empty response.")
    try:
        parsed = json.loads(raw_text)
    except json.JSONDecodeError:
        raise RuntimeError("The AI did not return valid JSON.")
    return clean_items(parsed.get("items"))
@app.route("/")
def home():
    return send_from_directory(ROOT, "index.html")
@app.route("/extract", methods=["POST"])
def extract():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return json_error("Send JSON with a syllabus field.", 400)
    syllabus = str(data.get("syllabus") or "").strip()
    course = str(data.get("course") or "").strip()
    if not syllabus:
        return json_error("Paste a syllabus first.", 400)
    try:
        items = extract_items(syllabus, course)
    except Exception as error:
        return json_error(str(error), 500)
    return jsonify({"items": items})
@app.errorhandler(404)
def not_found(_error):
    return json_error("That page or API route was not found.", 404)
@app.errorhandler(500)
def server_error(error):
    return json_error(str(error), 500)
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)