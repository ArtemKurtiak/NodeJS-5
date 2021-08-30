const express = require('express');
const mongoose = require('mongoose');

const { usersRouter, authRouter, laptopRouter } = require('./routers');
const { PORT } = require('./constants/config');

mongoose.connect('mongodb://localhost:27017/database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);

app.use('/users', usersRouter);

app.use('/laptops', laptopRouter);

app.use(_errorHandler);

// eslint-disable-next-line
function _errorHandler(err, req, res, next) {
    const { message = 'Something wrong', status = 500 } = err;

    return res
        .status(status)
        .json({
            message
        });
}

app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`);
});
