const processed = new Set();

function handleEvent(event, handlers) {
  if (processed.has(event.eventId)) return { status: 'duplicate', eventId: event.eventId };
  try {
    const handler = handlers[event.type];
    if (!handler) throw new Error(`No handler for ${event.type}`);
    handler(event);
    processed.add(event.eventId);
    return { status: 'processed', eventId: event.eventId };
  } catch (error) {
    return { status: 'failed', eventId: event.eventId, error: error.message };
  }
}
module.exports = { handleEvent, processed };
