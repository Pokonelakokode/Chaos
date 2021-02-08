module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "js", "tsx"],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts"
  ]
};