const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@root": path.resolve(__dirname, "src/"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@(.*)$": "<rootDir>/src$1",
      },
    },
  },
};
