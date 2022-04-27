from traceback import print_tb
from flask import Flask, jsonify, json, render_template, request, session
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
import MySQLdb.cursors
import re
import hashlib
# from UserLogin import UserLogin

app = Flask(__name__)
CORS(app)

app.config['MYSQL_USER'] ='root'
app.config['MYSQL_PASSWORD'] = '123'
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_DB'] = 'lyrics'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JSON_AS_ASCII'] = False

app.secret_key = 'some secret key'

mysql = MySQL(app)

@app.route('/login', methods=['POST'])
@cross_origin(origin='*')
def login():
    request.get_json(force=True)
    json = request.get_json(force=True)
    
    if not json['username'] or not json['password']:
        return jsonify("Не указано имя пользователя или пароль")
    else:
        username = json['username']
        password = json['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = % s AND password = % s', (username, hashlib.md5(json['password'].encode()).hexdigest()), )
        account = cursor.fetchone()
        if account:
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']
            return jsonify('OK')
        else:
            return jsonify('Неверный логин/пароль!')
  
@app.route('/logout', methods=['POST'])
@cross_origin(origin='*')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return jsonify('OK')
  
@app.route('/register', methods=['POST'])
@cross_origin(origin='*')
def register():

    request.get_json(force=True)
    json = request.get_json(force=True)
    print(json)
    if not json['username'] or not json['password']:
        return jsonify("Не указано имя пользователя или пароль")
    else:
        username = json['username']
        password = json['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = % s', (username, ))
        account = cursor.fetchone() 
        if account:
            msg = 'Такой аккаунт уже существует!'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Имя пользователя должно содержать только буквы латинского алфавита и цифры!'
        elif not username or not password:
            msg = 'Необходимо полностью заполнить форму!'
        else:
            cursor.execute('INSERT INTO users VALUES (NULL, % s, % s)', (username, hashlib.md5(json['password'].encode()).hexdigest()), )
            mysql.connection.commit()
            return jsonify('OK')
        return jsonify(msg)

@app.route("/lyrics", methods=['GET','OPTIONS'])
@cross_origin(origin='*')
def lyrics():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM lyrics.songs''')    
    res = cur.fetchall()
    return jsonify(res)

@app.route("/lyrics/<id>", methods=['GET','OPTIONS'])
@cross_origin(origin='*')
def lyricsid(id):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM lyrics.songs where id = ''' + id)    
    res = cur.fetchall()
    return jsonify(res)

@app.route("/lyrics/remove/<id>", methods=['DELETE'])
@cross_origin(origin='*')
def lyricsRemove(id):
    cur = mysql.connection.cursor()
    cur.execute('''delete from lyrics.songs where id = ''' + id)    
    mysql.connection.commit()
    return jsonify("Success")
    
@app.route('/addsong', methods=['POST'])
@cross_origin(origin='*')
def addsong():
    request.get_json(force=True)
    json = request.get_json(force=True)
    
    if not json['name'] or not json['text']:
        return jsonify("Не все поля были заполнены!")
    else:
        name = json['name']
        text = json['text']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('insert into `lyrics`.`songs` (name, text) values(% s, % s)', (name, text, ))
        mysql.connection.commit()
        return jsonify("Песня успешно добавлена!")

if __name__ == "__main__":
    app.run(debug=True)