##### App by **Heather Ransome**, read more about the developer on her [LinkedIn]<br>
###### Deployed Site: [www.bestlistevar.me]<br>

## Table of Contents
* [Technologies Used](#techused)
* [Features](#features)
* [Wireframe](#wireframe)
* [Setup Installation](#setup)

## <a name="techused"></a>Technologies Used
__Backend:__ Python, Flask, PostgreSQL, SQLAlchemy<br>
__Frontend:__ Javascript, React, Redux, Bootstrap<br>
__APIs:__ TasteDive<br>
__Deployed:__ AWS Lightsail<br>

## <a name="features"></a>Features
# TODO

## <a name="wireframe"></a>Wireframe
![wireframe](/static/HB Project_ Phase 1.jpeg) 

## ## <a name="setup"></a>Setup and Installation

### Backend

1. Create a virtual environment:
   ```
   $ virtualenv env
   ```

2. Activate the virtual environment:
   ```
   $ source env/bin/activate
   ```

3. Install dependencies:
   ```
   $ pip3 install -r requirements.txt
   ```

4. Create database:
   ```
   $ createdb booklists
   ```

5. Add your own [TasteDive API Key](https://tastedive.com/read/api) to a `secrets.sh` file. Your file should look like:
```
export my_secret_key="[YOUR-KEY]"
export MY_TASTEDIVE_API_KEY="[YOUR-KEY]"
```

6. Source your secrets.sh file:
```
$ source secrets.sh
```

7. Start backend:
   ```
   $ python3 server.py
   ```

### Frontend

1. Go to frontend folder:
  ```
  $ cd frontend/
  ```

2. Install packages:
  ```
  $ npm install
  ```

3. Start frontend:
  ```
  $ npm run start
  ```

4. Open [http://localhost:3000/](http://localhost:3000/)