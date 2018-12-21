"""Woo backend coding!"""

from model import User, Book, BookList, connect_to_db, db

from secrets import *

from flask import (Flask, make_response, render_template, redirect, request, flash,
                   session, jsonify, url_for)

# from flask.ext.session.SqlAlchemySessionInterface import Session
# from flask.ext.session import Session
# from flask_session import Session

from flask_cors import CORS, cross_origin

app = Flask(__name__)

# SESSION_TYPE = 'redis' # screw redis....
# app.config.from_object(__name__)
# Session(app)

# Required to use Flask sessions and the debug toolbar
app.secret_key = my_secret_key

cors = CORS(app, resources={r"/*": { r"supports_credentials":True, r"origins": r"http://localhost:3000" }})

@app.after_request
def after(response):
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

@app.route('/')
@cross_origin()
def index():
    if 'username' in session:
        return 'Logged in'
    return 'You are not logged in'

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    print("woooooooooooooooo")
    print(request)
    if 'username' in session:
      print("Logout")
      session.pop('username', None)
      return "logged out successfully"
    else:
      print("do it come here...")
      session['username'] = request.form['username']
      print(session['username'])
      session['user_id'] = 1
      return "logged in successfully"

@app.route('/whoami')
@cross_origin()
def whoami():
  print(request.headers)
  return jsonify ({ 'username' : session.get('username', 'nobody') })

# @app.route('/logout')
# @cross_origin()
# def logout():
#     # remove the username from the session if it's there
#     session.pop('username', None)
#     return redirect(url_for('index'))

@app.route("/booklist")
@cross_origin()
def booklist():
  """Returns booklist."""
  
  if session.get('user_id'):
    print(session['user_id'])
  else:
    print("No session user") # this prints...

  if 'user_id' in session:
    print("User!")
  else:
    print("No user?")
  # TODO: get "user" from session; for phase 0/1 store booklist_id as well as user_id?
  # user = User.query.filter(User.user_id==2).one()
  # mybooklist = BookList.query.filter(BookList.user_id==2).all()
  # books = Book.query.filter(Book.booklist_id==mybooklist[0].booklist_id).all()
  user = User.query.filter(User.user_id==1).one()
  user_booklist_id = user.booklists[0].booklist_id
  books = Book.query.filter(Book.booklist_id==user_booklist_id).all()

  booklist = []
  for book in books:
    book = {
      'book_id': book.book_id,
      'title': book.title
    }
    booklist.append(book)

  return jsonify(booklist)

  # response = make_response(jsonify({'book1': 1, 'book2': 2}))
  # response.headers['Access-Control-Allow-Origin'] = '*' # fine for testing...
  # return response
  # return jsonify({'book1': 1, 'book2': 2})

@app.route("/book/<book_id>")
def get_book(book_id):
  """Returns a book."""
  pass

@app.route("/book/<book_id>/delete")
def delete_book(book_id):
  """Removes a book from a list."""

  # need to get booklist?
  # delete book from booklist

  pass

if __name__ == "__main__":
    
    connect_to_db(app)

    app.run(port=5000, host='0.0.0.0')