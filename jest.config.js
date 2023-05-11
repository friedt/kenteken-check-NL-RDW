// jest.config.js
module.exports = {
    verbose: true,
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.js?$': 'babel-jest',
        "^.+\\.ts?$": "ts-jest"
    },
    "collectCoverage": true,
    "collectCoverageFrom": [
        "src/kenteken-check-nl-class*.{js,ts}",
        "!**/node_modules/**",

    ],
    "coverageDirectory": "coverage",
    "coverageReporters": ["text", "lcov"] // "lcov"
};
