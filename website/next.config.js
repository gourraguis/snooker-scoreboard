/* eslint-disable @typescript-eslint/no-var-requires */
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
})

module.exports = nextConfig
