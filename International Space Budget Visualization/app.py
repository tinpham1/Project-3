from flask import Flask, jsonify
import pandas as pd
from io import StringIO

app = Flask(__name__)

# The dataset as a CSV string (you can replace this with a file if desired)
data = """Name,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020
NASA (USA),17.3,17.74,18.72,18.45,17.77,16.87,17.65,18.01,19.3,19.51,20.74,21.5,22.6
CNSA (China),1.3,1.3,2.24,2.4,4.66,6.11,2.66,3.23,4.91,5.37,5.83,11.0,
Roscosmos (Russia),2.85,2.4,3.1,3.8,4.7,5.6,4.39,3.27,3.18,3.68,4.17,4.17,
CNES (France),2.43,2.43,2.5,2.4,2.5,2.42,2.17,2.48,2.79,2.7,3.16,3.16,
JAXA (Japan),1.71,1.71,2.46,2.35,2.19,2.03,1.76,2.39,3.02,1.7,3.06,3.06,
DLR (Germany),0.9,0.9,2.0,1.97,1.93,1.89,1.9,2.5,1.98,4.27,2.15,2.15,
ASI (Italy),0.92,0.92,0.92,0.92,0.92,0.92,1.8,1.8,1.8,1.8,1.8,1.8,
ISRO (India),0.3,0.3,0.4,0.4,0.62,1.17,1.19,1.2,1.3,1.4,1.41,1.42,
ESA (Europe),3.0,3.9,4.13,4.72,4.68,4.77,4.57,5.2,5.84,6.4,6.23,6.37"""

# Load the dataset into a pandas DataFrame
df = pd.read_csv(StringIO(data))

@app.route('/api/space_agencies', methods=['GET'])
def get_agencies():
    # Return the entire dataset as a JSON response
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/space_agencies/<string:agency_name>', methods=['GET'])
def get_agency(agency_name):
    # Return data for a specific agency
    agency_data = df[df['Name'].str.contains(agency_name, case=False, na=False)]
    if agency_data.empty:
        return jsonify({'error': 'Agency not found'}), 404
    return jsonify(agency_data.to_dict(orient='records'))

@app.route('/api/space_agencies/<string:agency_name>/<int:year>', methods=['GET'])
def get_agency_year(agency_name, year):
    # Return data for a specific agency and year
    agency_data = df[df['Name'].str.contains(agency_name, case=False, na=False)]
    if agency_data.empty:
        return jsonify({'error': 'Agency not found'}), 404
    
    # Check if the year exists in the dataset
    if str(year) not in df.columns:
        return jsonify({'error': 'Year not found in dataset'}), 404

    # Extract the data for the requested agency and year
    value = agency_data[str(year)].values[0]
    return jsonify({'agency': agency_name, 'year': year, 'value': value})

if __name__ == '__main__':
    app.run(debug=True)
