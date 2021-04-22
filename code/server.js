const express = require('express');
const app = express();
const colors = require('colors');
const morgan = require('morgan');
const connection = require('./config/db');
const env = require('dotenv');
const citiesRoute=require('./routes/cities')
const cors = require('cors');

app.use(express.json());

app.use(cors());
env.config({ path: './config/.env' });
connection();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const port = process.env.PORT || 8080;

const server = app.listen(port, () =>
	console.log(`Server is listen in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold)
);

const authRoute = require('./routes/auth');

app.use('/auth', authRoute);
app.use('/cities',citiesRoute)

const errorHandler = require('./middleware/error');
app.use(errorHandler);
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error :${err.message}`.red.bold);
	//Close Server
	server.close(() => process.exit(1));
});
