export default () => ({
  broadcast: {
    driver: process.env.BROADCAST_DRIVER,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD,
  },
});
