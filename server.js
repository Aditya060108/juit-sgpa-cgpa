const express = require('express');
const session = require('express-session');
const app = express();


app.use(express.static('public'));
app.use(express.json());


app.use(session({
secret: 'juit-secret-key',
resave: false,
saveUninitialized: true
}));


app.post('/login', (req, res) => {
const { roll } = req.body;
if (roll) {
    req.session.roll = roll;
    res.json({ success: true });
} else {
res.json({ success: false });
}
});


app.get('/check', (req, res) => {
res.json({ loggedIn: !!req.session.roll });
});


app.listen(3000, () => {
console.log('Server running at http://localhost:3000');
});