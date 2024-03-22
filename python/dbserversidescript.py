from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors module
import mysql.connector

app = Flask(__name__)
CORS(app)  # Initialize CORS with your Flask app

# MySQL Configuration and routes...

mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'test'
}

# Initialize MySQL connection
db = mysql.connector.connect(**mysql_config)
cursor = db.cursor()

# Create table if not exists
cursor.execute("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))")

# Routes
@app.route('/users', methods=['GET'])
def get_users():
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    return jsonify(users)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    name = data['name']
    email = data['email']
    cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (name, email))
    db.commit()
    return 'User created successfully'

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    return jsonify(user)

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    name = data['name']
    email = data['email']
    cursor.execute("UPDATE users SET name = %s, email = %s WHERE id = %s", (name, email, user_id))
    db.commit()
    return 'User updated successfully'

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
    db.commit()
    return 'User deleted successfully'

if __name__ == '__main__':
    app.run(debug=True)