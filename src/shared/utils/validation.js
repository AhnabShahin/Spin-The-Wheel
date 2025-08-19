/**
 * Validation utilities for form data
 */

/**
 * Validation rules
 */
export const validationRules = {
    required: (value, message = 'This field is required') => {
        if (value === null || value === undefined || value === '') {
            return message;
        }
        return null;
    },

    minLength: (minLength, message) => (value) => {
        if (value && value.length < minLength) {
            return message || `Minimum length is ${minLength} characters`;
        }
        return null;
    },

    maxLength: (maxLength, message) => (value) => {
        if (value && value.length > maxLength) {
            return message || `Maximum length is ${maxLength} characters`;
        }
        return null;
    },

    email: (value, message = 'Please enter a valid email address') => {
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return message;
        }
        return null;
    },

    number: (value, message = 'Please enter a valid number') => {
        if (value && isNaN(Number(value))) {
            return message;
        }
        return null;
    },

    min: (minimum, message) => (value) => {
        if (value && Number(value) < minimum) {
            return message || `Minimum value is ${minimum}`;
        }
        return null;
    },

    max: (maximum, message) => (value) => {
        if (value && Number(value) > maximum) {
            return message || `Maximum value is ${maximum}`;
        }
        return null;
    },

    pattern: (regex, message) => (value) => {
        if (value && !regex.test(value)) {
            return message || 'Invalid format';
        }
        return null;
    },

    url: (value, message = 'Please enter a valid URL') => {
        if (value) {
            try {
                new URL(value);
            } catch {
                return message;
            }
        }
        return null;
    },

    array: (value, message = 'This field must be an array') => {
        if (value && !Array.isArray(value)) {
            return message;
        }
        return null;
    },

    arrayMinLength: (minLength, message) => (value) => {
        if (value && Array.isArray(value) && value.length < minLength) {
            return message || `Minimum ${minLength} items required`;
        }
        return null;
    },

    arrayMaxLength: (maxLength, message) => (value) => {
        if (value && Array.isArray(value) && value.length > maxLength) {
            return message || `Maximum ${maxLength} items allowed`;
        }
        return null;
    },

    color: (value, message = 'Please enter a valid color') => {
        if (value && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
            return message;
        }
        return null;
    }
};

/**
 * Validate a single field
 */
export const validateField = (value, rules) => {
    if (!Array.isArray(rules)) {
        rules = [rules];
    }

    for (const rule of rules) {
        const error = typeof rule === 'function' ? rule(value) : rule;
        if (error) {
            return error;
        }
    }

    return null;
};

/**
 * Validate an object with multiple fields
 */
export const validateObject = (data, schema) => {
    const errors = {};

    Object.keys(schema).forEach(field => {
        const value = data[field];
        const rules = schema[field];
        const error = validateField(value, rules);
        
        if (error) {
            errors[field] = error;
        }
    });

    return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Theme validation schema
 */
export const themeValidationSchema = {
    theme_name: [validationRules.required, validationRules.minLength(3)],
    mustStartSpinning: [],
    prizeNumber: [validationRules.number, validationRules.min(0)],
    data: [validationRules.required, validationRules.array, validationRules.arrayMinLength(2)],
    backgroundColors: [validationRules.array],
    textColors: [validationRules.array],
    outerBorderColor: [validationRules.color],
    outerBorderWidth: [validationRules.number, validationRules.min(0)],
    innerRadius: [validationRules.number, validationRules.min(0)],
    innerBorderColor: [validationRules.color],
    innerBorderWidth: [validationRules.number, validationRules.min(0)],
    radiusLineColor: [validationRules.color],
    radiusLineWidth: [validationRules.number, validationRules.min(0)],
    fontFamily: [validationRules.required],
    fontSize: [validationRules.number, validationRules.min(8), validationRules.max(72)],
    fontWeight: [],
    fontStyle: [],
    perpendicularText: [],
    textDistance: [validationRules.number, validationRules.min(0)],
    spinDuration: [validationRules.number, validationRules.min(0.1), validationRules.max(10)],
    startingOptionIndex: [validationRules.number, validationRules.min(0)],
    disableInitialAnimation: []
};

/**
 * Wheel data validation schema
 */
export const wheelDataValidationSchema = {
    option: [validationRules.required, validationRules.minLength(1)],
    style: []
};

/**
 * Sanitize data for safe usage
 */
export const sanitizeData = {
    text: (value) => {
        if (typeof value !== 'string') return '';
        return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    },

    number: (value) => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    },

    array: (value) => {
        return Array.isArray(value) ? value : [];
    },

    color: (value) => {
        if (typeof value !== 'string') return '#000000';
        const colorMatch = value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
        return colorMatch ? colorMatch[0] : '#000000';
    },

    boolean: (value) => {
        return Boolean(value);
    },

    url: (value) => {
        if (typeof value !== 'string') return '';
        try {
            const url = new URL(value);
            return url.href;
        } catch {
            return '';
        }
    }
};

/**
 * Debounce function for validation
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Format validation errors for display
 */
export const formatValidationErrors = (errors) => {
    if (!errors || typeof errors !== 'object') {
        return [];
    }

    return Object.keys(errors).map(field => ({
        field,
        message: errors[field]
    }));
};
