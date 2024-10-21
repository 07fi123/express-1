// Import the Express.js framework
import express from "express";
import data from "../data/mock2.json" assert { type: "json" };

const app = express();

// Import required dependencies for PostgreSQL connection and JSON parsing
import Pool from "pg-pool";
import bodyParser from "body-parser";

// Configure body-parser to parse JSON bodies in incoming requests
app.use(bodyParser.json());

// Create a new pool object with the specified database credentials
const pool = new Pool({
  user: "username",
  host: "localhost",
  database: "mydatabase",
  password: "password",
  port: 5432,
});

// Define an Express.js route to handle POST requests to the /data endpoint
app.post("/data", (req, res) => {
  // Extract JSON data from the request body and parse it into a JavaScript object
  const jsonData = req.body;

  // Insert the parsed JSON data into the PostgreSQL database using a query
  pool.query(
    "INSERT INTO data (data) VALUES ($1)",
    [JSON.stringify(jsonData)],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error inserting data into database" });
      } else {
        res.send({ message: "Data saved successfully to database" });
      }
    }
  );
});

app.get('/region/:diection', (request, response)=> {
  const regionPeram = String(request.params.diection);
  console.log(regionPeram);
  const filtered = data.filter((customer) => {
    console.log(customer);
    return customer.region === regionPeram
  });
  response.send(filtered)
})


app.get("/class", (req, res) => {
  // Send back some example data in response to the request
  const data = "Yo, Momma!";
  res.send(data);
});

app.get("/class/:id", (request, response) => {
  const bleeID = Number(request.params.id);

  const filteredBlee = data.filter((blee) => blee.id === bleeID);
  console.log(filteredBlee);
  response.send(filteredBlee);
});


app.get("/class/:to/:from", (request, response) => {
  const idTo = Number(request.params.to);
  const idFrom = Number(request.params.from);

  const filteredBlee = data.filter((student) => student.id >= idTo && student.id <= idFrom);
  console.log(filteredBlee);
  response.send(filteredBlee);
});

app.get(
  "/next",
  (req, res, next) => {
    console.log("This resonse will be sent by the next function.");
    next();
  },
  (req, res) => {
    console.log("This response will not be sent.");
    res.send({ message: "Next function called" });
  }
);

app.get("/classByName/:name", (request, response) => {
  const name = request.params.name;
  console.log(name);

  const filteredBlee = data.filter(
    (blee) => blee.first_name.toLowerCase() === name.toLowerCase()
  );
  console.log(filteredBlee);
  response.send(filteredBlee);
});

// Enable static files
app.use(express.static("./static"));

// Start the Express.js server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
