const express = require('express');
const morgan = require('morgan'); //HTTP request logger middleware function
const app = express();


app.use(express.static('public')); //routes all requests for static files to 'public' folder
app.use(morgan('common')); //request log using Morgans 'common' format


app.get('/', (req, res) => {
  res.send('Homepage');
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(8000, () => {
  console.log('Server started on port 8000');
})