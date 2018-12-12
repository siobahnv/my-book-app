"""Woo backend coding!"""

from model import User, Book, BookList, connect_to_db, db

from secrets import *

from flask import (Flask, render_template, redirect, request, flash,
                   session, jsonify, url_for)

app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = my_secret_key

@app.route("/")
def index():
  """Homepage."""

  return render_template("index.html")

if __name__ == "__main__":
    
    connect_to_db(app)

    app.run(port=5000, host='0.0.0.0')