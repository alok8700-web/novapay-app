import client from 'prom-client';

client.collectDefaultMetrics();

export const register = client.register;

export const httpRequestsTotal = new client.Counter({
  name: 'novapay_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

export const httpRequestDuration = new client.Histogram({
  name: 'novapay_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.005, 0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5],
});

export const loginSuccessTotal = new client.Counter({
  name: 'novapay_login_success_total',
  help: 'Total successful logins',
});

export const loginFailedTotal = new client.Counter({
  name: 'novapay_login_failed_total',
  help: 'Total failed logins',
});

export const transferTotal = new client.Counter({
  name: 'novapay_transfer_total',
  help: 'Total successful money transfers',
});
