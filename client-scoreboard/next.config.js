/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const withLess = require('next-with-less')

/** @type {import('next').NextConfig} */
const nextConfig = withLess({
  async rewrites() {
    return [
      // Rewrite everything to `pages/index`
      {
        source: '/:any*',
        destination: '/',
      },
    ]
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    MAX_UNDO_COUNT: process.env.MAX_UNDO_COUNT,
  },
})

module.exports = nextConfig
