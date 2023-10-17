const express = require('express');
const session = require('express-session');


const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const corsOptions = {
  origin: 'https://lowedev.cl'
};
app.use(cors(corsOptions));
const connection = require("./database/database.js");
const LoginRoutes = require('./routes/LoginRoutes.js')

app.set("view engine", "ejs");
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secreto', resave: false, saveUninitialized: false }));

app.use('/login', LoginRoutes);

app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});