const express = require('express');
const db = require('./Main/config/connection');
const routes = require('./Main/routes');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`the API server is running on the port ${PORT}`);
    });
});