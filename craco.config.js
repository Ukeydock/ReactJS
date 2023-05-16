const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@root": path.resolve(__dirname, "src/"),
      "@css": path.resolve(__dirname, "src/css/"),
      "@script": path.resolve(__dirname, "src/components/scripts/"),
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
