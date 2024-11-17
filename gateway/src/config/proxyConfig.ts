export default () => ({
  proxy: [
    {
      target: 'http://localhost:9001', //代理地址
      prefix: '/pc', //前缀
      rewritePrefix: '', //实际请求将pc 替换成 '' 因为后端服务器没有pc这个路由
      httpMethods: ['GET', 'POST'], //允许的请求方式
    },
    {
      target: 'http://localhost:9002',
      prefix: '/mobile',
      rewritePrefix: '',
      httpMethods: ['GET', 'POST'],
    },
  ],
});
