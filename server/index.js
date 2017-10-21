//Other peeps' code
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var massive = require('massive');
var cors = require('cors');

require('dotenv').config();

//Middleware
const createInitialSession = require( `${__dirname}/middlewares/sessions.js` );

//Controllers
const property = require('./controllers/property_controller');
const user = require('./controllers/user_controller');

//Setting up the app
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use( session({
  secret: "SECRET GOES HERE",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10000 }
}));
app.use( ( req, res, next ) => createInitialSession( req, res, next ) );
app.use(express.static('../front/build'));

//Connecting the db
massive( process.env.CONNECTION_STRING ).then( dbInstance => app.set('db', dbInstance) );


//ENDPOINTS
//User Endpoints
app.post('/api/auth/login', user.login);
app.post('/api/auth/register', user.register);
app.post('/api/auth/logout', user.logout);

//Property Endpoints
app.get('/api/properties', property.getAllProperties);
app.get('/api/properties/filter', property.getFilteredProperties); //Will take queries!
// app.post('/api/properties', property.createProperty);
// app.delete('/api/properties/:id', property.deleteProperty);

const port = 3200;
app.listen(port, () => {console.log(`Server listening on port ${port}`)});
