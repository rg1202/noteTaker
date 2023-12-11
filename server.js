const express = require('express');
const path = require('path');
const apiRouter = require('./routes/apiRoutes')

const PORT = process.env.PORT || 3001;

 
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRouter);


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// listens for the PORT and notifies you when it is running.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
  