from flask import Blueprint, redirect, url_for, request, jsonify

from .extensions import db
from .models import User

main = Blueprint('main', __name__)

@main.route('/')
def index():
    users = User.query.all()
    users_list_html = [f"<li>{ user.username }</li>" for user in users]
    return f"<ul>{''.join(users_list_html)}</ul>"

@main.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    print(username, password)

    if not username or not password:
        return jsonify({'error': 'Username and password are required.'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username already exists.'}), 400

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User added successfully.'}), 201

@main.route('/delete_user', methods=['DELETE'])
def delete_user():
    data = request.get_json()
    username = data.get('username')

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted successfully.'}), 200

@main.route('/update_user', methods=['PUT'])
def update_user():
    data = request.get_json()
    username = data.get('username')
    new_username = data.get('new_username')

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    user.username = new_username
    db.session.commit()

    return jsonify({'message': 'User updated successfully.'}), 200

@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # if user/pass is provided
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # Find the user in the database
    user = User.query.filter_by(username=username).first()

    # Check if the user exists and the password is correct
    if user and user.password == password:
        # You can add additional logic here, such as creating a session or generating a token
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401



