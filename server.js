const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();
const port = process.env.PORT || 8080;

app.use(history());

app.use(express.static(path.resolve(__dirname, 'build')));

app.listen(port, () => console.log(`Server started on ${port}`));
