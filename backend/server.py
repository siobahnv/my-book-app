"""Woo backend coding!"""

from model import User, Book, BookList, BookListPair, connect_to_db, db
from seed import *

from secrets import *

from flask import (Flask, make_response, redirect, request, flash,
                   session, jsonify, url_for)

from flask_cors import CORS, cross_origin

app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = my_secret_key

cors = CORS(app, resources={r"/*": { r"supports_credentials":True, r"origins": r"http://localhost:3000" }})

##############################################################################

def get_books_from_blid(blid):
  """Returns a list of books from a booklist id."""
  # TODO: does following the relationship do another query? Probably not?

  pairs = BookListPair.query.filter(BookListPair.booklist_id==blid).all()

  books = []
  for pair in pairs:
    books.append(pair.book)

  return books

def get_books_from_temp_list(list):
  """Returns a list of books queried from a list of book ids."""

  return Book.query.filter(Book.book_id.in_(list)).all()

def get_blid_from_uid():
  """Returns a booklist id from based on user id if logged in or temp_user; defaults to 1."""

  if 'user_id' in session:
    user_id = session['user_id']
    user = User.query.filter(User.user_id==user_id).one()
    print('GBFUID user ' + str(user))
    print('booklists ' + str(user.booklists))

    if (user.booklists != []):
      user_booklist_id = user.booklists[0].booklist_id
      print("GBFUID UBLID " + str(user_booklist_id))
      return user_booklist_id
    else:
      return 1 #TODO: fix later
  else:
    #TODO: no user...
    if 'temp_booklist_id' in session:
      temp_booklist_id = session['temp_booklist_id']
      print("GBFUID no user, bl: " + str(session['temp_booklist']))
      return temp_booklist_id
    else:
      return 1 #TODO: fix later

def get_or_create_book_from_title(title):
  """(Creates and) Returns a book from title."""

  book = Book.query.filter(Book.title==title).first()
  if book is not None:
    return book
  book = Book(title=title)
  db.session.add(book)
  db.session.commit()
  return Book.query.filter(Book.title==title).first()


##############################################################################

@app.after_request
def after(response):
  """Adds headers to all responses to satisfy CORS."""
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

# @app.route('/')
# @cross_origin()
# def index():
#   pass

@app.route('/whoami')
@cross_origin()
def whoami():
  """"Returns username if exists or defaults to 'nobody'."""
  return jsonify ({ 'username' : session.get('username', 'nobody') })

@app.route('/register', methods=['POST'])
@cross_origin()
def register():
  """Gets user info from form; creates & adds to session new user & booklist."""

  session['username'] = request.form['username']
  session['email'] = request.form['email']
  session['password'] = request.form['password']
  print("registering: " + session['username'])

  # create new user
  user = User(username=session['username'], email=session['email'], password=session['password'])
  db.session.add(user)
  db.session.commit()

  new_user = User.query.filter(User.username==session['username']).one()
  session['user_id'] = new_user.user_id

  # create new booklist
  # new_booklist = BookList(user_id=user.user_id)
  # db.session.add(new_booklist)
  # db.session.commit()
  # TODO: add temporary booklist to new booklist

  return jsonify("registered successfully")

#TODO: fix App.js + components to handle None case
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
  """ Gets user info from form & adds to session, checks if exists...?"""

  session['username'] = request.form['username']
  session['password'] = request.form['password']
  print("logging in: " + session['username'])

  # need to check if in database
  # https://docs.sqlalchemy.org/en/latest/orm/query.html
  user_q = User.query.filter(User.username==session['username'])
  q = user_q.scalar()
  print(q)

  if q is not None:
    # get user id?
    user = user_q.one()
    session['user_id'] = user.user_id
    return jsonify("logged in successfully")
  else:
    # else return to register?
    # flash("Please register.")
    # session['user_id'] = 1 # TODO: fix later
    return jsonify("login not successful")

@app.route('/logout')
@cross_origin()
def logout():
  """Clears session."""

  # session.pop('username', None)
  # session.pop('user_id', None)
  session.clear()
  return jsonify("logged out")

@app.route('/createBookList')
@cross_origin()
def create_book_list():
  """Returns a list of books based on entered book title."""

  # if request.method == 'POST':
  #   booktitle = request.form['booktitle']
  #   print('POST ' + booktitle)
  #   return jsonify(booktitle)
  # else:

  # TODO: replace with API
  # temporary list
  booklist = []
  titles = ["fake book 1", "fake book 2", "fake book 3"]

  for title in titles:
    new_book = get_or_create_book_from_title(title)

    book = {
      'book_id': new_book.book_id,
      'title': new_book.title
    }
    booklist.append(book)

  return jsonify(booklist)

@app.route('/booklist')
@cross_origin()
def booklist():
  """Returns booklist."""

  # TODO: get "user" from session; for phase 0/1 store booklist_id as well as user_id?
  if 'username' in session:
    user_booklist_id = get_blid_from_uid()
    books = get_books_from_blid(user_booklist_id)
  else:
    if 'temp_booklist' in session:
      books = get_books_from_temp_list(session['temp_booklist'])
      print("no user in session and temp_bl exists")
    else:
      session['temp_booklist'] = []
      books = []
      print("no user, no booklist")

  booklist = []
  for book in books:
    print(book)
    book_obj = {
      'book_id': book.book_id,
      'title': book.title
    }
    print(book_obj)
    booklist.append(book_obj)
  
  print(booklist)
  
  return jsonify(booklist)

# @app.route("/book/<book_id>")
# @cross_origin()
# def get_book(book_id):
#   """Returns a book."""
#   pass

@app.route('/book/save', methods=['POST'])
@cross_origin()
def save_book():
  """Saves/adds a book from a list to a list."""

  #TODO: make save send the id instead of the title
  title = request.data.decode('UTF-8')

  # book is created in /createBookList
  new_book_id = Book.query.filter(Book.title==title).first().book_id

  if 'user_id' in session:
    user_booklist_id = get_blid_from_uid()
    blp = BookListPair(booklist_id=user_booklist_id, book_id=new_book_id )
    db.session.add(blp)
    db.session.commit()
  elif 'temp_booklist' in session:
    temp_bl = session['temp_booklist']
    #TODO: check if that id is already in the list
    temp_bl.append(new_book_id)
    session['temp_booklist'] = temp_bl
    print('My temp booklist: ')
    print(session['temp_booklist'])

  # TODO: else?

  return jsonify("book saved")

@app.route('/book/<book_id>/delete')
@cross_origin()
def delete_book(book_id):
  """Removes a book from a list."""

  if 'user_id' in session:
    user_booklist_id = get_blid_from_uid()
    # book = Book.query.filter(Book.book_id==book_id).one()
    # print(book)
    blp = BookListPair.query.filter(BookListPair.book_id==book_id, BookListPair.booklist_id==user_booklist_id).one()
    db.session.delete(blp)
    # db.session.delete(book)
    db.session.commit()

  elif 'temp_booklist' in session:
    temp_bl = session['temp_booklist']

    if int(book_id) in temp_bl:
      temp_bl.remove(int(book_id))
    else:
      print("can't delete")

    session['temp_booklist'] = temp_bl
    print(session['temp_booklist'])
  
  return jsonify("book deleted")

##############################################################################

if __name__ == "__main__":
    
    connect_to_db(app)

    # In case tables haven't been created, create them
    db.create_all()
    # Import different types of data
    load_data()

    app.run(port=5000, host='0.0.0.0')