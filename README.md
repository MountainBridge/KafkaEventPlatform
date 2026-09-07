# Kafka Event Platform

A production-shaped Kafka lab that demonstrates **event contracts → partitioning → consumer groups → idempotent processing → failure handling → replay/observability**.

## 30-second read

**Problem:** asynchronous systems fail in ways a happy-path producer/consumer demo hides.

**Vertical slice:** versioned order events, keyed publishing, idempotent producer, consumer deduplication, explicit failure result, and reproducible Kafka infrastructure.

## Run it

### Cloud/browser path
- [GitHub Codespaces](https://codespaces.new/MountainBridge/KafkaEventPlatform) — authoritative full environment.
- [OneCompiler JavaScript](https://onecompiler.com/javascript) — use for the pure contract/consumer snippets; it does not provide a real Kafka broker.

### Full Kafka path
```bash
docker compose up -d
npm install
npm test
node src/index.js
```

## Engineering cases

| Concern | Evidence |
|---|---|
| Contract | `src/event.js` validates event shape/version |
| Ordering | Kafka message key uses `aggregateId` |
| Delivery | Producer is configured for idempotence |
| Consumer safety | duplicate event IDs are ignored |
| Failure | handler failures remain explicit instead of being acknowledged |
| Reproducibility | Docker Compose + CI |

## Failure injection to add next

- Kill/restart consumer during processing.
- Send the same event twice.
- Break a downstream handler and route to retry/DLQ.
- Replay a time window and measure lag.
- Compare partition-key choices and ordering guarantees.

This is intentionally a **systems lab**, not a Kafka API cheat sheet.
