"""Models and database functions for project."""

from flask_sqlalchemy import SQLAlchemy

# This is the connection to the PostgreSQL database; we're getting this through
# the Flask-SQLAlchemy helper library. On this, we can find the `session`
# object, where we do most of our interactions (like committing, etc.)

db = SQLAlchemy()


##############################################################################
# Model definitions

class User(db.Model):
    """User of website."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(64), nullable=False)
    password = db.Column(db.String(64), nullable=False)
    first_name = db.Column(db.String(64), nullable=True)
    last_name = db.Column(db.String(64), nullable=True)

    booklists = db.relationship('BookList')

    def __repr__(self):
        """Provide helpful representation when printed."""

        return f"<User user_id={self.user_id} email={self.email}>"

class BookList(db.Model):
    """Main book list..."""

    __tablename__ = "booklists"

    booklist_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    user = db.relationship('User')
    books = db.relationship('Book')

    def __repr__(self):
        """Provide helpful representation when printed."""
        return f"<Booklist booklist_id={self.booklist_id}>"

class Book(db.Model):
    """Book of website."""

    __tablename__ = "books"

    book_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    booklist_id = db.Column(db.Integer, db.ForeignKey('booklists.booklist_id'))
    title = db.Column(db.String(120), nullable=False)
    isbn = db.Column(db.String(13), nullable=True)
    author = db.Column(db.String(64), nullable=True)
    amazon_url = db.Column(db.String(120), nullable=True)
    goodreads_rating = db.Column(db.Integer, nullable=True)
    # generator_book = db.Column()

    booklist = db.relationship('BookList')


    def __repr__(self):
        """Provide helpful representation when printed."""
        return f"<Book book_id={self.book_id} title={self.title}>"

##############################################################################
# Sample Data

def load_data():
    """Load sample users into database."""

    print("Deleting tables")

    # Delete all rows in table, so if we need to run this a second time,
    # we won't be trying to add duplicate users
    User.query.delete()
    BookList.query.delete()
    Book.query.delete()

    testuser1 = User(email='test@test.com', password='test')
    testuser2 = User(email='gmail.com', password='password')
    testuser3 = User(email='@yahoo.com', password='blank')

    db.session.add(testuser1)
    db.session.add(testuser2)
    db.session.add(testuser3)
    db.session.commit()

    booklist1 = BookList(user_id=testuser1.user_id)
    booklist2 = BookList(user_id=testuser2.user_id)
    booklist3 = BookList(user_id=testuser3.user_id)

    db.session.add(booklist1)
    db.session.add(booklist2)
    db.session.add(booklist3)
    db.session.commit()

    book1 = Book(booklist_id=booklist1.booklist_id, title="fake book 1")
    book2 = Book(booklist_id=booklist1.booklist_id, title="fake book 2")
    book3 = Book(booklist_id=booklist1.booklist_id, title="fake book 3")

    db.session.add(book1)
    db.session.add(book2)
    db.session.add(book3)
    db.session.commit()

##############################################################################
# Helper functions

def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our PstgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///booklists'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    from server import app
    connect_to_db(app)
    print("Connected to DB.")

    # In case tables haven't been created, create them
    db.create_all()
    # Import different types of data
    load_data()
