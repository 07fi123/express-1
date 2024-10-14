// Import the Express.js framework
import express from 'express';


const app = express();

// Import required dependencies for PostgreSQL connection and JSON parsing
import Pool from 'pg-pool';
import bodyParser from 'body-parser';

// Configure body-parser to parse JSON bodies in incoming requests
app.use(bodyParser.json());

// Create a new pool object with the specified database credentials
const pool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'mydatabase',
  password: 'password',
  port: 5432,
});

// Define an Express.js route to handle POST requests to the /data endpoint
app.post('/data', (req, res) => {
  // Extract JSON data from the request body and parse it into a JavaScript object
  const jsonData = req.body;

  // Insert the parsed JSON data into the PostgreSQL database using a query
  pool.query('INSERT INTO data (data) VALUES ($1)', [JSON.stringify(jsonData)], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error inserting data into database' });
    } else {
      res.send({ message: 'Data saved successfully to database' });
    }
  });
});

app.get('/yo', (req, res) => {
    // Send back some example data in response to the request
    const data = { message: 'Yo, Momma!' };
    res.json(data);
  });
  

// Start the Express.js server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
