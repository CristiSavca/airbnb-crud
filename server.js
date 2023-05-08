const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'airbnb_crud',
    password: '2424',
    port: 5432,
});

app.get('/listings', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM airbnb_listings');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching listings' });
    }
});

app.post('/listings', async (req, res) => {
    try {
        const {
            list_id,
            airbnb_name,
            host_id,
            host_phone,
            host_name,
            neighbourhood,
            same_day_booking,
            room_type,
            price,
            number_of_reviews,
            review_rate_number
        } = req.body;

        const { rows } = await pool.query(
            `
          INSERT INTO airbnb_listings (
            list_id,
            airbnb_name,
            host_id,
            host_phone,
            host_name,
            neighbourhood,
            same_day_booking,
            room_type,
            price,
            number_of_reviews,
            review_rate_number
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
        `,
            [
                list_id,
                airbnb_name,
                host_id,
                host_phone,
                host_name,
                neighbourhood,
                same_day_booking,
                room_type,
                price,
                number_of_reviews,
                review_rate_number
            ]
        );

        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating a listing' });
    }
});


app.put('/listings/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {
            list_id,
            airbnb_name,
            host_id,
            host_phone,
            host_name,
            neighbourhood,
            same_day_booking,
            room_type,
            price,
            number_of_reviews,
            review_rate_number
        } = req.body;

        // Log the parameters to the console
        console.log('Parameters:', [
            list_id,
            airbnb_name,
            host_id,
            host_phone,
            host_name,
            neighbourhood,
            same_day_booking,
            room_type,
            price,
            number_of_reviews,
            review_rate_number,
            id
        ]);

        const { rowCount } = await pool.query(
            `
          UPDATE airbnb_listings SET
            list_id = $1,
            airbnb_name = $2,
            host_id = $3,
            host_phone = $4,
            host_name = $5,
            neighbourhood = $6,
            same_day_booking = $7,
            room_type = $8,
            price = $9,
            number_of_reviews = $10,
            review_rate_number = $11
          WHERE list_id = $12
        `,
            [
                list_id,
                airbnb_name,
                host_id,
                host_phone,
                host_name,
                neighbourhood,
                same_day_booking,
                room_type,
                price,
                number_of_reviews,
                review_rate_number,
                id // add the ID parameter here
            ]
        );

        if (rowCount === 0) {
            res.status(404).json({ error: 'Listing not found' });
        } else {
            res.status(200).json({ message: 'Listing updated successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the listing' });
    }
});

app.delete('/listings/:list_id', async (req, res) => {
    try {
        const list_id = parseInt(req.params.list_id);
        const { rowCount } = await pool.query('DELETE FROM airbnb_listings WHERE list_id = $1', [list_id]);

        if (rowCount === 0) {
            res.status(404).json({ error: 'Listing not found' });
        } else {
            res.status(200).json({ message: 'Listing deleted successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the listing' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});