const express = require('express');
const db = require('./config/connection');
const routes = require('/routes');

const PORT = process.env.PORT || 3001;
const app = express();