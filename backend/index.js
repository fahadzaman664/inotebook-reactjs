const connectToMongoo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongoo();

const app = express()
const port = 5000
app.use(express.json());


app.use(cors())
// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


// app.get('/', (req, res) => {
//   res.send('Hello fahad!')
// })

 app.listen(port, () => {
  console.log(`Example app listening on https://localhost:${port}`);
});

