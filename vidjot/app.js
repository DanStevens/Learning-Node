const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Map global promose to remove get rid of deprecation warning
// mongoose.Promise = global.Promise;

// Connect to Mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {useNewUrlParser: true})
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error(err));

// Load idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method-override middleware
app.use(methodOverride('_method'));

// Index page
app.get('/', (req, res) => {
  const title = 'Welcome to VidJot';
  res.render('index', {title: title});
})

// About page
app.get('/about', (req, res) => {
  res.render('about');
})

// Add idea form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
})

// Ideas page
app.get('/ideas', (req, res) => {
  Idea.find({}).sort({date: 'desc'})
    .then(ideas => {
      res.render('ideas/index', {ideas: ideas});
    })
});

// About page
app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({_id: req.params.id}).then(idea => {
    res.render('ideas/edit', {idea: idea});
  });
})

// Edit form process
app.put('/ideas/:id', (req, res) => {
  Idea.findOne({_id: req.params.id}).then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save().then(idea => {
      res.redirect('/ideas');
    });
  });
})

app.post('/ideas', (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({text: 'Please add a title'});
  }
  if (!req.body.details) {
    errors.push({text: 'Please add some details'});
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newUser).save().then(idea => {
      res.redirect('/ideas');
    });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});