const withLinaria = require("next-linaria");

/** @type {import('next').NextConfig} */
module.exports = withLinaria({
  linaria: {
    displayName: true,
  },
  target: "experimental-serverless-trace",
  reactStrictMode: true,
});
