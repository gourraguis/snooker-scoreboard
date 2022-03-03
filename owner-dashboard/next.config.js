/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const Less = require('next-with-less')
const PWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')

/** @type {import('next').NextConfig} */
module.exports = withPlugins(
  [
    [
      Less,
      {
        rewrites: async () => {
          return [
            {
              source: '/:any*',
              destination: '/',
            },
          ]
        },
      },
    ],
    [
      PWA,
      {
        pwa: {
          dest: 'public',
          register: true,
          skipWaiting: true,
          disable: process.env.NODE_ENV === 'development',
        },
      },
    ],
  ],
  {
    env: {
      API_ENDPOINT: process.env.API_ENDPOINT,
    },
  }
)
