'use strict';

const fromStream = require('rx-node').fromStream;
const Gauge = require('prom-client').Gauge;

const errorCount = new Gauge({
  name: 'hystrix_errors_total',
  help: 'Total number of times the breaker has errored.',
  labelNames: ['breakerName'],
});
const requestCount = new Gauge({
  name: 'hystrix_requests_total',
  help: 'Total number of requests made to the breaker',
  labelNames: ['breakerName'],
});
const rollingCountCollapsedRequests = new Gauge({
  name: 'hystrix_collapsed_requests_total',
  help: 'Total number of times a requests has been collapsed.',
  labelNames: ['breakerName'],
});
const rollingCountExceptionsThrown = new Gauge({
  name: 'hystrix_exceptions_thrown_total',
  help: 'Total number of times an exception has been thrown.',
  labelNames: ['breakerName'],
});
const rollingCountFailure = new Gauge({
  name: 'hystrix_failures_total',
  help: 'Total number of times a call has failed.',
  labelNames: ['breakerName'],
});
const rollingCountFallbackFailure = new Gauge({
  name: 'hystrix_fallback_failures_total',
  help: 'Total number of times a fallback has failed.',
  labelNames: ['breakerName'],
});
const rollingCountFallbackRejection = new Gauge({
  name: 'hystrix_fallback_rejections_total',
  help: 'Total number of times a fallback has rejected.',
  labelNames: ['breakerName'],
});
const rollingCountFallbackSuccess = new Gauge({
  name: 'hystrix_fallback_successes_total',
  help: 'Total number of times a fallback has been successful.',
  labelNames: ['breakerName'],
});
const rollingCountResponsesFromCache = new Gauge({
  name: 'hystrix_responses_from_cache_total',
  help: 'Total number of times a response has been returned from the cache.',
  labelNames: ['breakerName'],
});
const rollingCountSemaphoreRejected = new Gauge({
  name: 'hystrix_semaphore_rejections_total',
  help: 'Total number of times a request failed because of empty semaphore.',
  labelNames: ['breakerName'],
});
const rollingCountShortCircuited = new Gauge({
  name: 'hystrix_short_circuits_total',
  help: 'Total number of times a request short circuited.',
  labelNames: ['breakerName'],
});
const rollingCountSuccess = new Gauge({
  name: 'hystrix_successes_total',
  help: 'Total number of times a request succeeded.',
  labelNames: ['breakerName'],
});
const rollingCountThreadPoolRejected = new Gauge({
  name: 'hystrix_thread_pool_rejections_total',
  help: 'Total number of times a the thread pool rejected.',
  labelNames: ['breakerName'],
});
const rollingCountTimeout = new Gauge({
  name: 'hystrix_timeouts_total',
  help: 'Total number of times a request timed out.',
  labelNames: ['breakerName'],
});
const currentConcurrentExecutionCount = new Gauge({
  name: 'hystrix_current_concurrent_executions_total',
  help: 'Total number of requests going concurrently.',
  labelNames: ['breakerName'],
});
const latencyExecuteMean = new Gauge({
  name: 'hystrix_latency_execute_mean',
  help: 'Mean latency of all executions.',
  labelNames: ['breakerName'],
});
const latencyTotalMean = new Gauge({
  name: 'hystrix_latency_total_mean',
  help: 'Mean latency of all requests.',
  labelNames: ['breakerName'],
});

module.exports = stream =>
  fromStream(stream)
    .map(data => data.replace(/^data: /, ''))
    .map(JSON.parse)
    .subscribe(data => {
      const name = data.name;

      errorCount.labels(name).set(data.errorCount);
      requestCount.labels(name).set(data.requestCount);

      rollingCountCollapsedRequests
        .labels(name)
        .set(data.rollingCountCollapsedRequests);
      rollingCountExceptionsThrown
        .labels(name)
        .set(data.rollingCountExceptionsThrown);
      rollingCountFailure.labels(name).set(data.rollingCountFailure);
      rollingCountFallbackFailure
        .labels(name)
        .set(data.rollingCountFallbackFailure);
      rollingCountFallbackRejection
        .labels(name)
        .set(data.rollingCountFallbackRejection);
      rollingCountFallbackSuccess
        .labels(name)
        .set(data.rollingCountFallbackSuccess);
      rollingCountResponsesFromCache
        .labels(name)
        .set(data.rollingCountResponsesFromCache);
      rollingCountSemaphoreRejected
        .labels(name)
        .set(data.rollingCountSemaphoreRejected);
      rollingCountShortCircuited
        .labels(name)
        .set(data.rollingCountShortCircuited);
      rollingCountSuccess.labels(name).set(data.rollingCountSuccess);
      rollingCountThreadPoolRejected
        .labels(name)
        .set(data.rollingCountThreadPoolRejected);
      rollingCountTimeout.labels(name).set(data.rollingCountTimeout);

      currentConcurrentExecutionCount
        .labels(name)
        .set(data.currentConcurrentExecutionCount);

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
