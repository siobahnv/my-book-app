from model import User, Book, BookList, BookListPair, connect_to_db, db

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
    BookListPair.query.delete()

    print("Adding sample data")

    testuser1 = User(username='test', email='test@test.com', password='test')
    testuser2 = User(username='gmail', email='gmail.com', password='password')
    testuser3 = User(username='yahoo', email='@yahoo.com', password='blank')

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

    book1 = Book(title="fake book 1")
    book2 = Book(title="fake book 2")
    book3 = Book(title="fake book 3")

    db.session.add(book1)
    db.session.add(book2)
    db.session.add(book3)
    db.session.commit()

    blp1 = BookListPair(booklist_id=booklist1.booklist_id, book_id=book1.book_id)
    blp2 = BookListPair(booklist_id=booklist1.booklist_id, book_id=book2.book_id)
    blp3 = BookListPair(booklist_id=booklist1.booklist_id, book_id=book3.book_id)

    db.session.add(blp1)
    db.session.add(blp2)
    db.session.add(blp3)
    db.session.commit()