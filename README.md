# Space Debris Tracker - Stars and Stats: Mapping the Data behind Space Programs and Global Impact
## Overview
The Space Debris Tracker project is designed to track and visualize space debris in Earth's orbit, particularly focusing on satellites, rocket bodies, and fragments that have been launched into space. By leveraging the Space-Track API, this project aims to provide an interactive visualization of space debris, with a focus on analyzing data over time. The project uses Python (Flask) for the backend, JavaScript (Leaflet.js) for map visualizations, and D3.js for dynamic data rendering.

The primary goal of the project is to allow users to interactively explore the historical trends of space debris, its classification, and the amount of debris over time. It is aimed at raising awareness about the growing issue of space debris and its potential impact on satellite operations and space exploration.

## Instructions
## Running the Project
Clone the repository to your local machine using the following command:

bash
Copy
Edit
git clone https://github.com/your-username/space-debris-tracker.git
cd space-debris-tracker
Set up your Python environment:

## Create a virtual environment (optional but recommended):

bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
Install the required dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Run the Flask server:

Start the Flask application:

bash
Copy
Edit
python server.py
Open the project in a browser:

Navigate to http://127.0.0.1:5000 in your browser to see the Space Debris Tracker in action.

## Interacting with the Project:

Filter by satellite type: Use the dropdown to filter the debris by type (e.g., decommissioned satellites, rocket bodies, fragments).

Date filtering: Use the time slider to filter space debris based on the launch year.

Explore the map: View markers on the map representing space debris locations, with detailed information on each item.

Customizing the Project
To adjust or expand on the data sources:

Update the Space-Track API credentials in server.py.

Add new routes or modify existing ones in the Flask application for different data queries.

## Ethical Considerations
The Space Debris Tracker project prioritizes ethical data usage and aims to raise awareness of the growing issue of space debris, which has significant implications for both scientific research and commercial space ventures. All data retrieved from the Space-Track API is publicly available, and the project adheres to Space-Track's terms of service regarding data access.

While the project does not involve direct interaction with sensitive or personal data, it emphasizes the importance of responsible space exploration and satellite management. By providing public access to space debris data, this project advocates for more transparency and accountability in space missions. Ethical considerations also extend to the visualization of data, where efforts have been made to present clear, accessible, and non-misleading representations of the space debris problem, ensuring that the public can make informed decisions based on the data.

Furthermore, the project encourages ethical decision-making in space exploration, including the reduction of space debris through better satellite design, responsible decommissioning practices, and international collaboration.

## Data Sources
The data used in this project is sourced from Space-Track.org, which provides publicly available data on satellites and space debris. This data is gathered through the Space-Track API and includes information about satellites, their launch dates, and their classifications (e.g., decommissioned satellites, rocket bodies, fragments).

For more information on the Space-Track data and API, visit their official website.

## References
Space-Track API Documentation: https://www.space-track.org/documentation

Leaflet.js for Map Visualizations: https://leafletjs.com/

D3.js for Dynamic Data Visualizations: https://d3js.org/

OpenStreetMap for Tile Layer: https://www.openstreetmap.org/
