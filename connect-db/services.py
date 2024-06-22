from flask import Flask, jsonify
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

def get_services():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=DESKTOP-NL7MQT0;'
        'DATABASE=radical;'
        'UID=sa;'
        'PWD=@Hossein2021'
    )
    cursor = conn.cursor()
    cursor.execute("SELECT name, price FROM services")
    services = cursor.fetchall()
    conn.close()
    return services

@app.route('/api/services', methods=['GET'])
def services():
    try:
        services = get_services()
        services_list = [{'title': service[0], 'price': service[1]} for service in services]
        return jsonify(services_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
