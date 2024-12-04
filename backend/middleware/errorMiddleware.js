// Error handling middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Log error for debugging
    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query,
    });

    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

// Not Found middleware
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Rate limiting error handler
const handleRateLimitError = (err, req, res, next) => {
    if (err.status === 429) {
        res.status(429).json({
            message: 'Too many requests, please try again later.',
            retryAfter: err.retryAfter
        });
    } else {
        next(err);
    }
};

// Validation error handler
const handleValidationError = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => error.message);
        res.status(400).json({
            message: 'Validation Error',
            errors
        });
    } else {
        next(err);
    }
};

module.exports = {
    errorHandler,
    notFound,
    handleRateLimitError,
    handleValidationError
};
