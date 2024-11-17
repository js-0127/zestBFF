export default () => ({
  breakerConfig: {
    errorThresholdPercentage: 40, //超过 40% 会触发熔断
    timeout: 4000, //超过 1s 会触发熔断
    resetTimeout: 5000, //熔断后 5s 会重置
  },
});
