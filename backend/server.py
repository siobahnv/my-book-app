"""Woo backend coding!"""

from model import User, Book, BookList, connect_to_db, db

from secrets import *

from flask import (Flask, make_response, render_template, redirect, request, flash,
                   session, jsonify, url_for)

from flask_cors import CORS, cross_origin

app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = my_secret_key

cors = CORS(app, resources={r"/*": { r"supports_credentials":True, r"origins": r"http://localhost:3000" }})

def get_booklist_from_uid():
  user_id = session['user_id']
  user = User.query.filter(User.user_id==user_id).one()
  user_booklist_id = user.booklists[0].booklist_id
  return user_booklist_id

@app.after_request
def after(response):
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

@app.route('/')
@cross_origin()
def index():
  pass

@app.route('/whoami')
@cross_origin()
def whoami():
  return jsonify ({ 'username' : session.get('username', 'nobody') })


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
  session['username'] = request.form['username']
  session['password'] = request.form['password']
  print("logging in: " + session['username'])
  session['user_id'] = 1 # TODO: fix later
  return "logged in successfully"

@app.route('/logout')
@cross_origin()
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route('/createBookList', methods=['GET', 'POST'])
@cross_origin()
def create_book_list():
  # if request.method == 'POST':
  #   booktitle = request.form['booktitle']
  #   print('POST ' + booktitle)
  #   return jsonify(booktitle)
  # else:
  # temporary list
  booklist = []
  books = []
  user_booklist_id = get_booklist_from_uid()
  book1 = Book(booklist_id=user_booklist_id, book_id=1, title="fake book 1")
  book2 = Book(booklist_id=user_booklist_id, book_id=2, title="fake book 2")
  book3 = Book(booklist_id=user_booklist_id, book_id=3, title="fake book 3")
  books.append(book1)
  books.append(book2)
  books.append(book3)
  print('GET ' + str(book1))

  for book in books:
    book = {
      'book_id': book.book_id,
      'title': book.title
    }
    booklist.append(book)

  return jsonify(booklist)

@app.route('/booklist')
@cross_origin()
def booklist():
  """Returns booklist."""
  
  if 'username' in session:
    print("Booklist user: " + session['username'])
  else:
    print("No user?")
  
  if 'user_id' in session:
    print("There's a user id! " + str(session['user_id']))

    # TODO: get "user" from session; for phase 0/1 store booklist_id as well as user_id?
    user_booklist_id = get_booklist_from_uid()
    books = Book.query.filter(Book.booklist_id==user_booklist_id).all()

    booklist = []
    for book in books:
      book = {
        'book_id': book.book_id,
        'title': book.title
      }
      booklist.append(book)

    return jsonify(booklist)

  else:
    return jsonify([])

# @app.route("/book/<book_id>")
# @cross_origin()
# def get_book(book_id):
#   """Returns a book."""
#   pass

@app.route('/book/save', methods=['POST'])
@cross_origin()
def save_book():
  """Saves/adds a book from a list to a list."""

  title = request.data.decode('UTF-8')

  user_booklist_id = get_booklist_from_uid()
  book = Book(booklist_id=user_booklist_id, title=title)
  print(book)
  db.session.add(book)
  db.session.commit()

  return jsonify("book saved")

@app.route('/book/<book_id>/delete')
@cross_origin()
def delete_book(book_id):
  """Removes a book from a list."""

  user_booklist_id = get_booklist_from_uid()
  book = Book.query.filter(Book.book_id==book_id, Book.booklist_id==user_booklist_id).one()
  print(book)
  db.session.delete(book)
  db.session.commit()

  return jsonify("book deleted")

if __name__ == "__main__":
    
    connect_to_db(app)

    app.run(port=5000, host='0.0.0.0')