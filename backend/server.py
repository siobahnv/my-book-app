"""Woo backend coding!"""

from model import User, Book, BookList, connect_to_db, db

from secrets import *

from flask import (Flask, make_response, render_template, redirect, request, flash,
                   session, jsonify, url_for)

from flask_cors import CORS, cross_origin

app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = my_secret_key

cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def index():
  """Homepage."""
  session['user_id'] = 1 # fix later

  if session.get('user_id'):
    return "homepage"
  else:
    return "login"

@app.route("/booklist")
@cross_origin()
def booklist():
  """Returns booklist."""
  
  # TODO: get "user" from session; for phase 0/1 store booklist_id as well as user_id?
  user = User.query.filter(User.user_id==1).one()
  mybooklist = BookList.query.filter(BookList.user_id==user.user_id).all()
  books = Book.query.filter(Book.booklist_id==mybooklist[0].booklist_id).all()

  print(books)

  booklist = []
  for book in books:
    book = {
      'book_id': book.book_id,
      'title': book.title
    }
    booklist.append(book)

  print(booklist)
  return jsonify(booklist)

  # response = make_response(jsonify({'book1': 1, 'book2': 2}))
  # response.headers['Access-Control-Allow-Origin'] = '*' # fine for testing...
  # return response
  # return jsonify({'book1': 1, 'book2': 2})

@app.route("/book/<book_id>")
def get_book(book_id):
  """Returns a book."""
  pass

if __name__ == "__main__":
    
    connect_to_db(app)

    app.run(port=5000, host='0.0.0.0')