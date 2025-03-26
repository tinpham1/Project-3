from flask import Flask, jsonify
import requests
import json

app = Flask(__name__)

# Space-Track credentials 
USERNAME = "melicontreras32@gmail.com"
PASSWORD = "MelicarrGrandma!"

# Space-Track login and data URLs
login_url = "https://www.space-track.org/ajaxauth/login"
data_url = "https://www.space-track.org/basicspacedata/query/class/gp/format/json"

@app.route("/get_debris", methods=["GET"])
def get_debris():
    session = requests.Session()

    # Log in to Space-Track
    login_payload = {"identity": USERNAME, "password": PASSWORD}
    login_response = session.post(login_url, data=login_payload)

    if login_response.status_code == 200 and login_response.text.strip():
        print("Login successful.")

        # Fetch space debris data
        response = session.get(data_url)
        if response.status_code == 200:
            return jsonify(response.json())  # Return JSON to frontend
        else:
            return jsonify({"error": f"Failed to fetch data: {response.status_code}"}), 500
    else:
        return jsonify({"error": "Login failed"}), 401

if __name__ == "__main__":
    app.run(debug=True)