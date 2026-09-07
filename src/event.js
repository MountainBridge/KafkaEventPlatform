const { z } = require('zod');

const Event = z.object({
  eventId: z.string().min(1),
  type: z.enum(['order.created','order.cancelled']),
  aggregateId: z.string().min(1),
  occurredAt: z.string().datetime(),
  version: z.number().int().positive(),
  payload: z.record(z.any())
});

function validateEvent(value) { return Event.parse(value); }
module.exports = { Event, validateEvent };
