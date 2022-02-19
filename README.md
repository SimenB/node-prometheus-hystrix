# prometheus-hystrix

> Expose Hystrix stream as Prometheus data

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

## Usage

This module has a peer dependency on [`prom-client`][prom-client-url]. Currently, version 10-14 are supported.

This module exports a single function, taking a [`Stream`][node-stream-api-url] of [Hystrix data][hystrix-data-stream-url], and
returning a [`Subscription`][rxjs-url] of the same data, which can be unsubscribed if you so wish.

## Where to get Hystrix data

[brakes][brakes-url] exposes Hystrix data as a stream.

```js
import { getGlobalStats } from 'brakes';
import prometheusHystrix from 'prometheus-hystrix';
import prometheusRegister from 'prom-client/lib/register';

prometheusHystrix(getGlobalStats().getHystrixStream());

setInterval(() => {
  console.log(prometheusRegister.metrics());
}, 500);
```

## Metrics exposed

This module exposes 17 metrics, all using the name of the `HystrixCommand` as the label:

1. `hystrix_errors_total`: Rolling number of times the breaker has errored
2. `hystrix_requests_total`: Rolling number of requests made to the breaker
3. `hystrix_collapsed_requests_total`: Rolling number of times a requests has been collapsed.
4. `hystrix_exceptions_thrown_total`: Rolling number of times an exception has been thrown.
5. `hystrix_failures_total`: Rolling number of times a call has failed.
6. `hystrix_fallback_failures_total`: Rolling number of times a fallback has failed.
7. `hystrix_fallback_rejections_total`: Rolling number of times a fallback has rejected.
8. `hystrix_fallback_successes_total`: Rolling number of times a fallback has been successful.
9. `hystrix_responses_from_cache_total`: Rolling number of times a response has been returned from the cache.
10. `hystrix_semaphore_rejections_total`: Rolling number of times a request failed because of empty semaphore.
11. `hystrix_short_circuits_total`: Rolling number of times a request short circuited.
12. `hystrix_successes_total`: Rolling number of times a request succeeded.
13. `hystrix_thread_pool_rejections_total`: Rolling number of times a the thread pool rejected.
14. `hystrix_timeouts_total`: Rolling number of times a request timed out.
15. `hystrix_current_concurrent_executions_total`: Rolling number of requests going concurrently.
16. `hystrix_latency_execute_mean`: Mean latency of all executions.
17. `hystrix_latency_total_mean`: Mean latency of all requests.
18. `hystrix_timeouts_total_counter`: Total number of times a request timed out.
19. `hystrix_requests_total_counter`: Total number of requests made to the breaker
20. `hystrix_failures_total_counter`: Total number of times a call has failed.
21. `hystrix_short_circuits_total_counter`: Total number of times a request short circuited.
22. `hystrix_successes_total_counter`: Total number of times a request succeeded.

## TODO

There are currently no metrics for the calculated percentiles `latencyExecute` and `latencyTotal`.

[travis-url]: https://travis-ci.org/SimenB/node-prometheus-hystrix
[travis-image]: https://img.shields.io/travis/SimenB/node-prometheus-hystrix.svg
[npm-url]: https://npmjs.org/package/prometheus-hystrix
[npm-image]: https://img.shields.io/npm/v/prometheus-hystrix.svg
[david-url]: https://david-dm.org/SimenB/node-prometheus-hystrix
[david-image]: https://img.shields.io/david/SimenB/node-prometheus-hystrix.svg
[david-dev-url]: https://david-dm.org/SimenB/node-prometheus-hystrix?type=dev
[david-dev-image]: https://img.shields.io/david/dev/SimenB/node-prometheus-hystrix.svg
[david-peer-url]: https://david-dm.org/SimenB/node-prometheus-hystrix?type=peer
[david-peer-image]: https://img.shields.io/david/peer/SimenB/node-prometheus-hystrix.svg
[greenkeeper-url]: https://greenkeeper.io/
[greenkeeper-image]: https://badges.greenkeeper.io/SimenB/node-prometheus-hystrix.svg
[prom-client-url]: https://github.com/siimon/prom-client
[node-stream-api-url]: https://nodejs.org/api/stream.html
[hystrix-data-stream-url]: https://github.com/Netflix/Hystrix/tree/master/hystrix-contrib/hystrix-metrics-event-stream
[rxjs-url]: https://github.com/ReactiveX/rxjs
[brakes-url]: https://github.com/awolden/brakes
