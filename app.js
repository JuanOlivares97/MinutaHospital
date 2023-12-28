const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const corsOptions = {
  origin: 'https://supercharly.cl'
};
app.use(cors(corsOptions));

const LoginRoutes = require('./routes/LoginRoutes.js')
const NutricionistaJefeRoutes = require("./routes/NutricionistaJefeRoutes.js")
const apiRoutes = require('./routes/apiRoutes.js')

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secreto', resave: false, saveUninitialized: false }));
app.use(express.static('public'))
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.redirect('/auth')
});

app.get('/recuperar', (req, res) => {
  res.render('recuperarContrasenia')
});


app.use('/auth', LoginRoutes);
app.use('/NutricionistaJefe', NutricionistaJefeRoutes);
app.use('/api', apiRoutes) 
app.get('/logout', (req, res) => {
  // Destruye la sesión
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      res.send('Error al cerrar sesión');
    } else {
      res.redirect('/auth');  // Redirige a la página de inicio de sesión
    }
  });
});
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});