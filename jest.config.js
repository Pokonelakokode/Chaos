module.exports = {
  roots: ["src/actions/"],
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(scss|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js"],
  // globals: {
  //   "window": 5
  // }
};