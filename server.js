var express = require("express");
var bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

//get router
var router = express.Router();

//options for cors midddleware
const options = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:8080",
  preflightContinue: false
};

//use cors middleware
router.use(cors(options));

//enable pre-flight
router.options("*", cors(options));

// Create link to Angular build directory
var distDir = __dirname + "/dist/voicefront";
app.use(express.static(distDir));

app.listen(process.env.PORT || 4200);


// PathLocationStrategy
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/voicefront/index.html'));
});

console.log("Console listening!");