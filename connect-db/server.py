from flask import Flask, jsonify, request
import pyodbc
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # اضافه کردن CORS با اجازه دسترسی به همه مبداها

# تنظیمات اتصال به SQL Server
conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=DESKTOP-KAQD1TM;'
    'DATABASE=radical;'
    'UID=sa;'
    'PWD=@Hossein2023'
)

@app.route('/api/check_code', methods=['POST'])
def check_code():
    data = request.get_json()
    code = data.get('code')
    
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM login_code WHERE ID = ?', (code,))
    row = cursor.fetchone()
    
    if row:
        return jsonify({'exists': True})
    else:
        return jsonify({'exists': False})
 #-------------------------------------------------------------------------   

def get_services():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=DESKTOP-KAQD1TM;'
        'DATABASE=radical;'
        'UID=sa;'
        'PWD=@Hossein2023'
    )
    cursor = conn.cursor()
    cursor.execute("SELECT ID, name, price FROM services")
    services = cursor.fetchall()
    conn.close()
    return services

@app.route('/api/services', methods=['GET'])
def services():
    try:
        services = get_services()
        services_list = [{'id': service[0], 'title': service[1], 'price': service[2]} for service in services]
        return jsonify(services_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def check_discount_code(code):
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=DESKTOP-KAQD1TM;'
        'DATABASE=radical;'
        'UID=sa;'
        'PWD=@Hossein2023'
    )
    cursor = conn.cursor()
    cursor.execute("SELECT offer_price FROM offer_code WHERE ID=?", code)
    discount = cursor.fetchone()
    conn.close()
    return discount

@app.route('/api/check_discount', methods=['POST'])
def check_discount():
    data = request.get_json()
    discount_code = data.get('discount_code')
    try:
        discount = check_discount_code(discount_code)
        if discount:
            return jsonify({'discount_price': discount[0]})
        else:
            return jsonify({'error': 'Invalid discount code'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
#-------------------------------------------------------------------------------
    
conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=DESKTOP-KAQD1TM;'
    'DATABASE=radical;'
    'UID=sa;'
    'PWD=@Hossein2023'
)

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    fullname = data.get('fullname')
    phonenumber = data.get('phonenumber')
    email = data.get('email')
    nationalcode = data.get('nationalcode')

    # جداسازی fullname به name و lastName
    name_parts = fullname.split()
    name = name_parts[0]
    lastName = ' '.join(name_parts[1:]) if len(name_parts) > 1 else ''

    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO user_profile (name, last_name, phone_number, email, national_code) 
        OUTPUT INSERTED.id 
        VALUES (?, ?, ?, ?, ?)
    ''', (name, lastName, phonenumber, email, nationalcode))
    
    inserted_id = cursor.fetchone()[0]
    conn.commit()
    
    return jsonify({'success': True, 'id': inserted_id})
#-------------------------------------------------------------------------------


if __name__ == '__main__':
    app.run(debug=True)
