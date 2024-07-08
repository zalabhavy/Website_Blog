const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../tempelates');
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
app.set('views', templatePath);

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => 
{ 
    res.render('about'); 
});
app.get('/News', (req, res) => 
{ 
    res.render('News'); 
});

app.get('/contact', (req, res) => { // Define route for /contact
    res.render('contact'); // Render contact.hbs template
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    try {
        const checking = await LogInCollection.findOne({ name: req.body.name });
        if (checking) {
            return res.send("User already exists");
        } else {
            const data = {
                name: req.body.name,
                password: req.body.password
            };
            await LogInCollection.create(data);
            return res.status(201).render("home");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await LogInCollection.findOne({ name: req.body.name });

        if (!user) {
            return res.send("User not found");
        }

        if (user.password === req.body.password) {
            return res.status(201).render("home");
        } else {
            return res.send("Incorrect password");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});
