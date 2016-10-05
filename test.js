/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true }] */

import test from 'ava';
import { Writable as WritableStream } from 'stream';

const pathToModule = require.resolve('./hystrix-stream');

test.beforeEach(t => {
  delete require.cache[pathToModule];

  // eslint-disable-next-line no-param-reassign, global-require
  t.context.module = require('./hystrix-stream');
});

test.cb('meh', t => {
  const stream = new WritableStream();
  const subscription = t.context.module(stream);



  subscription.subscribe(d => console.log(d));
});
