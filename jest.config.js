module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@view/(.*)$': '<rootDir>/src/view/$1',
  },
  transform: {
    "\\.[jt]sx?$": "ts-jest"
  }
};