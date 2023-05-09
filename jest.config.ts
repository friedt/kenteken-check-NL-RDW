import type { Config } from '@jest/types'
const config: Config.InitialOptions = {
  verbose: true,
  testMatch:[ "**/?(*.)+(test).ts"],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  "collectCoverage": true,
    "collectCoverageFrom": [
        "src/kenteken-check-nl-class.ts",
        "!**/node_modules/**",

    ],
    "coverageDirectory": "coverageTS",
    "coverageReporters": ["text", "lcov"] // "lcov"
}

export default config
