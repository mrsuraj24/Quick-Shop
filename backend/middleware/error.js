import HandleError from "../utils/handleError.js";

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    // Cast error
    if (err.name === 'CastError') {
        const message = `Invalid resource. Field ${err.path}`;
        err = new HandleError(message, 404)
    }
    //Duplicate key error
    if (err.code === 11000) {
        const message = `This ${Object.keys(err.keyValue)} already registered. Please Login to continue`;
        err = new HandleError(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}