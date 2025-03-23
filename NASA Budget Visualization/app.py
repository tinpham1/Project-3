from flask import Flask, jsonify

app = Flask(__name__)

# NASA budget data
budget_data = [
    {"year": 1959, "budget": 2320435000},
    {"year": 1960, "budget": 3622572000},
    {"year": 1961, "budget": 6577310000},
    {"year": 1962, "budget": 12326663000},
    {"year": 1963, "budget": 24521547000},
    {"year": 1964, "budget": 33619086000},
    {"year": 1965, "budget": 34020008000},
    {"year": 1966, "budget": 32831229000},
    {"year": 1967, "budget": 30586033000},
    {"year": 1968, "budget": 27302172000},
    {"year": 1969, "budget": 22709369000},
    {"year": 1970, "budget": 20231901000},
    {"year": 1971, "budget": 17019924000},
    {"year": 1972, "budget": 16226362000},
    {"year": 1973, "budget": 16016951000},
    {"year": 1974, "budget": 13330552000},
    {"year": 1975, "budget": 12847750000},
    {"year": 1976, "budget": 13212042000},
    {"year": 1977, "budget": 13445147000},
    {"year": 1978, "budget": 13793091000},
    {"year": 1979, "budget": 14263654000},
    {"year": 1980, "budget": 14799480000},
    {"year": 1981, "budget": 14189559000},
    {"year": 1982, "budget": 14600485000},
    {"year": 1983, "budget": 15941189000},
    {"year": 1984, "budget": 16246934000},
    {"year": 1985, "budget": 15964111000},
    {"year": 1986, "budget": 16097973000},
    {"year": 1987, "budget": 22028358000},
    {"year": 1988, "budget": 17701905000},
    {"year": 1989, "budget": 20413493000},
    {"year": 1990, "budget": 22135700000},
    {"year": 1991, "budget": 24509580000},
    {"year": 1992, "budget": 24426631000},
    {"year": 1993, "budget": 23854358000},
    {"year": 1994, "budget": 23769058000},
    {"year": 1995, "budget": 22130494000},
    {"year": 1996, "budget": 21772696000},
    {"year": 1997, "budget": 21121756000},
    {"year": 1998, "budget": 20768617000},
    {"year": 1999, "budget": 20514049000},
    {"year": 2000, "budget": 20023113000},
    {"year": 2001, "budget": 20499399000},
    {"year": 2002, "budget": 21080477000},
    {"year": 2003, "budget": 21395081000},
    {"year": 2004, "budget": 20877935000},
    {"year": 2005, "budget": 21338934000},
    {"year": 2006, "budget": 21265571000},
    {"year": 2007, "budget": 20236923000},
    {"year": 2008, "budget": 20958210000},
    {"year": 2009, "budget": 22609714000},
    {"year": 2010, "budget": 22346619000},
    {"year": 2011, "budget": 21584155000},
    {"year": 2012, "budget": 20404142000},
    {"year": 2013, "budget": 19033095000},
    {"year": 2014, "budget": 19520325000},
    {"year": 2015, "budget": 19682958000},
    {"year": 2016, "budget": 20883596000},
    {"year": 2017, "budget": 20903930000},
    {"year": 2018, "budget": 21598138000},
    {"year": 2019, "budget": 21937489000},
    {"year": 2020, "budget": 22629000000},
    {"year": 2021, "budget": 23271300000},
    {"year": 2022, "budget": 24801500000}
]

# Route to get all NASA budget data
@app.route('/api/nasa-budget', methods=['GET'])
def get_budget_data():
    return jsonify(budget_data)

# Route to get NASA budget for a specific year
@app.route('/api/nasa-budget/<int:year>', methods=['GET'])
def get_budget_for_year(year):
    data = next((item for item in budget_data if item["year"] == year), None)
    if data:
        return jsonify(data)
    else:
        return jsonify({"error": "Data not found for the year"}), 404

if __name__ == '__main__':
    app.run(debug=True)