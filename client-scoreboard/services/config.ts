// P.S: A new env variable need to be added on the next.config.js too
export const getApiEndpoint = () => process.env.API_ENDPOINT

export const getMaxUndoCount = () => parseInt(process.env.MAX_UNDO_COUNT as string, 10)
