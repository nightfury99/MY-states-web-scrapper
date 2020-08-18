const express = require('express');

const getMYStates = require('./getMYStates');
const app = express();
app.use(express.static('public'));

app.get('/api/states', async(req, res) => {
    const states = await getMYStates();
    res.json(states);
});

const port = process.env.PORT || 4242;
app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});

