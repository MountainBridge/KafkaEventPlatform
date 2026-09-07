const { Kafka } = require('kafkajs');
const { validateEvent } = require('./event');
const { handleEvent } = require('./consumer');

const kafka = new Kafka({ clientId: 'engineering-lab', brokers: [process.env.KAFKA_BROKER || 'localhost:9092'] });
const producer = kafka.producer({ idempotent: true });
const topic = process.env.KAFKA_TOPIC || 'orders.v1';

async function publish(event) {
  validateEvent(event);
  await producer.send({ topic, messages: [{ key: event.aggregateId, value: JSON.stringify(event) }] });
}

async function main() {
  await producer.connect();
  const event = { eventId: `demo-${Date.now()}`, type: 'order.created', aggregateId: 'order-42', occurredAt: new Date().toISOString(), version: 1, payload: { total: 1250 } };
  await publish(event);
  console.log('published', event);
  await producer.disconnect();
}

if (require.main === module) main().catch(error => { console.error(error); process.exit(1); });
module.exports = { publish, handleEvent };
