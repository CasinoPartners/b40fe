const port = process.env.PORT || 8080

const express = require('express') 
var history = require('connect-history-api-fallback');
const app = express() 
app.use(history());
app.use(express.static('dist'))

// start the server
app.listen(port, () => console.log(`Listening on port ${port}`))
