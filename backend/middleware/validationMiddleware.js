const { validationResult, check } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Monitor validation rules
const monitorValidationRules = [
    check('name')
        .trim()
        .notEmpty()
        .withMessage('Monitor name is required')
        .isLength({ max: 100 })
        .withMessage('Monitor name must be less than 100 characters'),
    check('url')
        .trim()
        .notEmpty()
        .withMessage('URL is required')
        .isURL()
        .withMessage('Invalid URL format'),
    check('type')
        .isIn(['http', 'ping', 'port'])
        .withMessage('Invalid monitor type'),
    check('interval')
        .optional()
        .isInt({ min: 1, max: 1440 })
        .withMessage('Interval must be between 1 and 1440 minutes'),
    check('notifications.emails.*')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
];

// Auth validation rules
const authValidationRules = {
    register: [
        check('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required'),
        check('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format'),
        check('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    login: [
        check('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format'),
        check('password')
            .notEmpty()
            .withMessage('Password is required'),
    ],
};

module.exports = {
    validate,
    monitorValidationRules,
    authValidationRules,
}; 