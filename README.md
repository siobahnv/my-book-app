
## Starting Guide

### Backend

1. Create isolated Python environments:

   ```
   virtualenv env
   ```

2. Enter this environment:

   ```
   source env/bin/activate
   ```

3. Install python packages:

   ```
   pip3 install -r requirements.txt
   ```

4. Create database:

   ```
   createdb booklists
   ```

5. Start backend:

   ```
   python3 server.py
   ```

### Frontend

1. Go to frontend folder:

  ```
  cd frontend/
  ```

2. Install packages:

  ```
  npm install
  ```

3. Start frontend:

  ```
  npm run start
  ```

4. Open [http://localhost:3000/](http://localhost:3000/)