import { fromStream } from 'rx-node';
import Gauge from 'prom-client/lib/gauge';

const errorCount = new Gauge('hystrix_errors_total', 'Total number of times the breaker has errored.', ['breakerName']);
const requestCount = new Gauge('hystrix_requests_total', 'Total number of requests made to the breaker', ['breakerName']);
const rollingCountCollapsedRequests = new Gauge(
  'hystrix_collapsed_requests_total',
  'Total number of times a requests has been collapsed.',
  ['breakerName']
);
const rollingCountExceptionsThrown = new Gauge('hystrix_exceptions_thrown_total', 'Total number of times an exception has been thrown.', [
  'breakerName',
]);
const rollingCountFailure = new Gauge('hystrix_failures_total', 'Total number of times a call has failed.', ['breakerName']);
const rollingCountFallbackFailure = new Gauge('hystrix_fallback_failures_total', 'Total number of times a fallback has failed.', [
  'breakerName',
]);
const rollingCountFallbackRejection = new Gauge('hystrix_fallback_rejections_total', 'Total number of times a fallback has rejected.', [
  'breakerName',
]);
const rollingCountFallbackSuccess = new Gauge('hystrix_fallback_successes_total', 'Total number of times a fallback has been successful.', [
  'breakerName',
]);
const rollingCountResponsesFromCache = new Gauge(
  'hystrix_responses_from_cache_total',
  'Total number of times a response has been returned from the cache.',
  ['breakerName']
);
const rollingCountSemaphoreRejected = new Gauge(
  'hystrix_semaphore_rejections_total',
  'Total number of times a request failed because of empty semaphore.',
  ['breakerName']
);
const rollingCountShortCircuited = new Gauge('hystrix_short_circuits_total', 'Total number of times a request short circuited.', [
  'breakerName',
]);
const rollingCountSuccess = new Gauge('hystrix_successes_total', 'Total number of times a request succeeded.', ['breakerName']);
const rollingCountThreadPoolRejected = new Gauge(
  'hystrix_thread_pool_rejections_total',
  'Total number of times a the thread pool rejected.',
  ['breakerName']
);
const rollingCountTimeout = new Gauge('hystrix_timeouts_total', 'Total number of times a request timed out.', ['breakerName']);
const currentConcurrentExecutionCount = new Gauge(
  'hystrix_current_concurrent_executions_total',
  'Total number of requests going concurrently.',
  ['breakerName']
);
const latencyExecuteMean = new Gauge('hystrix_latency_execute_mean', 'Mean latency of all executions.', ['breakerName']);
const latencyTotalMean = new Gauge('hystrix_latency_total_mean', 'Mean latency of all requests.', ['breakerName']);

export default stream => fromStream(stream).map(data => data.replace(/^data: /, '')).map(JSON.parse).subscribe(({ name, ...data }) => {
  errorCount.labels(name).set(data.errorCount);
  requestCount.labels(name).set(data.requestCount);

  rollingCountCollapsedRequests.labels(name).set(data.rollingCountCollapsedRequests);
  rollingCountExceptionsThrown.labels(name).set(data.rollingCountExceptionsThrown);
  rollingCountFailure.labels(name).set(data.rollingCountFailure);
  rollingCountFallbackFailure.labels(name).set(data.rollingCountFallbackFailure);
  rollingCountFallbackRejection.labels(name).set(data.rollingCountFallbackRejection);
  rollingCountFallbackSuccess.labels(name).set(data.rollingCountFallbackSuccess);
  rollingCountResponsesFromCache.labels(name).set(data.rollingCountResponsesFromCache);
  rollingCountSemaphoreRejected.labels(name).set(data.rollingCountSemaphoreRejected);
  rollingCountShortCircuited.labels(name).set(data.rollingCountShortCircuited);
  rollingCountSuccess.labels(name).set(data.rollingCountSuccess);
  rollingCountThreadPoolRejected.labels(name).set(data.rollingCountThreadPoolRejected);
  rollingCountTimeout.labels(name).set(data.rollingCountTimeout);

  currentConcurrentExecutionCount.labels(name).set(data.currentConcurrentExecutionCount);

  latencyExecuteMean.labels(name).set(data.latencyExecute_mean);

  latencyTotalMean.labels(name).set(data.latencyTotal_mean);
});

// Missing data:
/*
 latencyExecute:
 { '0': 100,
 '25': 103,
 '50': 104,
 '75': 105,
 '90': 105,
 '95': 106,
 '99': 106,
 '100': 106,
 '99.5': 106 },
 latencyTotal:
 { '0': 100,
 '25': 103,
 '50': 104,
 '75': 105,
 '90': 105,
 '95': 106,
 '99': 106,
 '100': 106,
 '99.5': 106 }}
 */
