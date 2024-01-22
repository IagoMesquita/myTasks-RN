module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spect.tsx"
  ],
  coverageReporters: ["lcov"]
};
