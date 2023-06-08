const express = require('express');
const connectDB = require('./src/db/connect');
const dataRoutes = require('./src/routes/data.routes');

const app = express();
const port = 3000;

// Connect to the database
connectDB();

// Parse JSON request bodies
app.use(express.json());

// Use dataRoutes
app.use('/data', dataRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});