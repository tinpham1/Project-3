from flask import Flask, jsonify, request, send_file, render_template
import sqlite3

app = Flask(__name__, static_folder='static')

# Function to connect to SQLite database
def get_db_connection():
    conn = sqlite3.connect("space_data.db")
    conn.row_factory = sqlite3.Row 
    return conn

# Home route
@app.route("/")
def home():
    return render_template("index.html")

# Fetch all rockets
@app.route('/rockets', methods=['GET'])
def get_rockets():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM us_operation_time")
    rockets = cursor.fetchall()
    conn.close()

    rockets_list = [dict(row) for row in rockets]
    return jsonify(rockets_list)

# Fetch a single rocket by name
@app.route('/rockets/<string:rocket_name>', methods=['GET'])
def get_rocket(rocket_name):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM us_operation_time WHERE rocket = ?", (rocket_name,))
    rocket = cursor.fetchone()
    conn.close()

    if rocket:
        return jsonify(dict(rocket))
    else:
        return jsonify({"error": "Rocket not found"}), 404

# Fetch active rockets
@app.route('/rockets/active', methods=['GET'])
def get_active_rockets():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM us_operation_time WHERE rocketstatus = 'Active'")
    active_rockets = cursor.fetchall()
    conn.close()

    active_rockets_list = [dict(row) for row in active_rockets]
    return jsonify(active_rockets_list)

# Fetch retired rockets
@app.route('/rockets/retired', methods=['GET'])
def get_retired_rockets():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM us_operation_time WHERE rocketstatus = 'Retired'")
    retired_rockets = cursor.fetchall()
    conn.close()

    retired_rockets_list = [dict(row) for row in retired_rockets]
    return jsonify(retired_rockets_list)

# Fetch reusable rockets
@app.route('/rockets/reusable', methods=['GET'])
def get_reusable_rockets():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM us_operation_time WHERE reusability = 'Reusable'")
    reusable_rockets = cursor.fetchall()
    conn.close()

    reusable_rockets_list = [dict(row) for row in reusable_rockets]
    return jsonify(reusable_rockets_list)

# Fetch expendable rockets
@app.route('/rockets/expendable', methods=['GET'])
def get_expendable_rockets():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM us_operation_time WHERE reusability = 'Expendable'")
    expendable_rockets = cursor.fetchall()
    conn.close()

    expendable_rockets_list = [dict(row) for row in expendable_rockets]
    return jsonify(expendable_rockets_list)

# Fetch Missions per Year
@app.route('/missions-per-year', methods=['GET'])
def get_missions_per_year():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Query to count missions per year from the SQLite database
    cursor.execute("""
        SELECT strftime('%Y', date) AS year, COUNT(*) AS mission_count
        FROM missions
        GROUP BY year
        ORDER BY year ASC;
    """)
    
    missions_per_year = cursor.fetchall()
    conn.close()

    # Convert to JSON format
    data = [{"year": row["year"], "mission_count": row["mission_count"]} for row in missions_per_year]
    
    return jsonify(data)

# Print Available Routes
print(app.url_map)  

if __name__ == '__main__':
    app.run(debug=True)
