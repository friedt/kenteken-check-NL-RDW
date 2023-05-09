// jest.config.js
module.exports = {
    verbose: true,
    testMatch:[ "**/?(*.)+(spec).[jt]s"]
       
    ,
    "collectCoverage": true,
    "collectCoverageFrom": [
        "src/kenteken-check-nl-class.js",
        "!**/node_modules/**",

    ],
    "coverageDirectory": "coverage",
    "coverageReporters": ["text", "lcov"] // "lcov"
};
