// Reference for .eslinkrc file: https://gist.github.com/geordyjames/b071e0bb13e74dea94ec37a704d26b8b

module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2024
    },
    "rules": {
        // Allow console.log in non-production environments
        "no-console": "off",
        // Allow both named and default exports
        "import/prefer-default-export": "off"
    }
};
