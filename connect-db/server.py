import pyodbc
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# تنظیمات اتصال به SQL Server
conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=DESKTOP-NL7MQT0;'
    'DATABASE=radical;'
    'UID=sa;'
    'PWD=@Hossein2021'
)

@app.route('/api/data', methods=['GET'])
def get_data():
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM login_code')  # جایگزین YourTable با نام جدول مورد نظر خود
    rows = cursor.fetchall()
    data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
