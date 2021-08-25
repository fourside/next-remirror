const withLinaria = require("next-linaria");

/** @type {import('next').NextConfig} */
module.exports = withLinaria({
  linaria: {
    displayName: true,
  },
  reactStrictMode: true,
});
