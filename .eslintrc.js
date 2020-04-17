module.exports =
    {
        "parserOptions": {
            "ecmaVersion": 2015,
            "sourceType": "module"
        },
        "extends": [
            "eslint:recommended",
            "plugin:jest/recommended"
        ],
        "env": {
            "browser": true,
            "es6": true,
        },
        "rules": {
            "class-methods-use-this": "error",
            "no-unused-expressions": "error",
            "prefer-const": "error"
        },

    }
