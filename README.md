# airbnb-crud

<img width="951" alt="Screenshot 2023-05-09 190333" src="https://github.com/CristiSavca/airbnb-crud/assets/58373811/97bacb34-9485-4355-8102-fbcf93a9b61f">

Set password in server.js file to your PostgreSQL password.

Create 'airbnb_crud' database in PostgreSQL on Port 5432.

Create table in the database:
```
CREATE TABLE IF NOT EXISTS airbnb_listings (
  list_id INTEGER PRIMARY KEY NOT NULL,
  airbnb_name VARCHAR(255) NOT NULL,
  host_id INTEGER NOT NULL,
  host_phone VARCHAR(255) NOT NULL,
  host_name VARCHAR(255) NOT NULL,
  neighbourhood VARCHAR(255) NOT NULL,
  same_day_booking BOOLEAN NOT NULL,
  room_type VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  number_of_reviews INTEGER NOT NULL,
  review_rate_number INTEGER NOT NULL
);
```

node server.js // runs the server

// run index.html in your browser

