const test = require('node:test');
const assert = require('node:assert/strict');
const { validateEvent } = require('../src/event');
const { handleEvent, processed } = require('../src/consumer');

test('rejects invalid event contracts', () => assert.throws(() => validateEvent({ type:'order.created' })));
test('processes once and ignores duplicate delivery', () => {
  processed.clear(); let calls=0;
  const event={eventId:'e1',type:'order.created',aggregateId:'o1',occurredAt:new Date().toISOString(),version:1,payload:{}};
  assert.equal(handleEvent(event, {'order.created':()=>calls++}).status,'processed');
  assert.equal(handleEvent(event, {'order.created':()=>calls++}).status,'duplicate');
  assert.equal(calls,1);
});
