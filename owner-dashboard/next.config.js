const withLess = require('next-with-less')

/** @type {import('next').NextConfig} */
const nextConfig = withLess({
  reactStrictMode: true,
})

module.exports = nextConfig
