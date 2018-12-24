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
    username = db.Column(db.String(64), nullable=False)
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

    # # In case tables haven't been created, create them
    # db.create_all()
    # # Import different types of data
    # load_data()
