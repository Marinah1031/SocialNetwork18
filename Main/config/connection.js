//importing mongoose library and creating a connection to a MongoDB database
const mongoose = require('mongoose');
//The connection URL is determined by this environment variable.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia');
//exporting connection object making it available for other parts of teh application to use
module.exports = mongoose.connection;