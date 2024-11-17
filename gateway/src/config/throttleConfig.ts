export default () => ({
  throttleConfig: {
    short: {
      name: 'short',
      ttl: 1000,
      limit: 3,
    },
    medium: {
      name: 'medium',
      ttl: 10000,
      limit: 20,
    },
    long: {
      name: 'long',
      ttl: 60000,
      limit: 100,
    },
  },
});
