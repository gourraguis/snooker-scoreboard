// P.S: A new env variable need to be added on the next.config.js too
export const getApiEndpoint = () => process.env.API_ENDPOINT || 'http://localhost:5000/'
