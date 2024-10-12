export default {
  extensionsToTreatAsEsm: [".js", ".jsx"], // Handle ESModules
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",  // Use babel-jest for transformation
    "^.+\\.m?[tj]sx?$": "jest-esm-transformer"  // Use the ESM transformer for ESModules
  },
  testEnvironment: "jest-environment-jsdom",  // Set the test environment
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',  // Mock CSS imports
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"]  // Ensure Testing Library is available
};
