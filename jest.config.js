// jest.config.js
module.exports = {
    verbose: true,
    transform: {
        '^.+\\.js?$': 'babel-jest',
        "^.+\\.tsx?$": "ts-jest"
    },
    "collectCoverage": true,
    "collectCoverageFrom": [
        "src/kenteken-check-nl-class.js",
        "!**/node_modules/**",

    ],
    "coverageDirectory": "coverage",
    "coverageReporters": ["text", "lcov"] // "lcov"
};
