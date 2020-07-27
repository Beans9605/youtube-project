// api http-proxy-middleware : 같은 서버 내에 서로 다른 포트간의 자원 이동 및 사용이 불가능해서 proxy를 이용해서 CORS문제를 해결
// 실제 IP를 전달할때 실제 IP를 모르게 만들어주기도 함, 데이터를 보내는데 중간에서 proxy로 바꿔줄 수도 있음,
// 방화벽, filter 기능도 대체 할 수 있음

// proxy server를 사용 이유?
// 회사에서 직원들이나 집아네서 아이들 인터넷 사용 제어
// 캐쉬를 이용해 더 빠른 인터넷 이용 제공 (proxy server에 데이터를 저장해서 사용)
// 더 나은 보안 제공
// 이용 제한된 사이트 접근 가능

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};