# Singleton Design Pattern

## What is it?

The **Singleton** pattern is a **creational** design pattern that ensures a class has **only one instance** throughout the application's lifetime, and provides a **global access point** to that instance.

## Key Characteristics

- **Single instance** — only one object of the class can ever exist.
- **Private constructor** — prevents external code from calling `new ClassName()` directly.
- **Static instance field** — holds the one and only instance inside the class itself.
- **Static `getInstance()` method** — the sole entry point to obtain the instance; creates it on first call, returns the existing one on every subsequent call (lazy initialization).

## Benefits

- **Controlled access** — full control over how and when the single instance is created.
- **Avoid duplicate state** — shared resources (config, logger, cache) are never accidentally duplicated.
- **Global access point** — any part of the application can reach the instance without passing it around.
- **Lazy initialization** — the instance is created only when first needed, saving resources if it is never used.
- **Easier resource management** — ideal for expensive objects (DB connections, file handles) that should exist only once.

## Implementation Structure

```
class Singleton {
    private static instance: Singleton;   // 1. static holder

    private constructor() {}              // 2. private constructor

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton(); // 3. lazy creation
        }
        return Singleton.instance;        // 4. always same object
    }
}
```

---

## Example 1 — Logger (`logger.example.ts`)

### Purpose
A logger should be consistent across the whole application. If two parts of the code created separate `Logger` instances, log outputs could be scattered or inconsistent.

### How the Singleton is applied

| Step | Code |
|---|---|
| Static instance holder | `private static instance: Logger` |
| Blocked direct instantiation | `private constructor() {}` |
| Controlled access | `public static getInstance(): Logger` |

### Usage
```typescript
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

console.log(logger1 === logger2); // true — same object

logger1.log("Hello World");   // Hello World
logger1.error("Error");       // Error
logger1.warn("Warning");      // Warning
logger1.info("Info");         // Info
```

`logger1` and `logger2` are **identical references** — calling methods on either one has exactly the same effect.

---

## Example 2 — Config (`config.example.ts`)

### Purpose
Application configuration (environment variables, feature flags, settings) must be read from a single source of truth. Multiple `Config` objects would risk inconsistency if settings changed at runtime.

### How the Singleton is applied

| Step | Code |
|---|---|
| Static instance holder | `private static instance: Config` |
| Blocked direct instantiation | `private constructor() {}` |
| Controlled access | `public static getInstance(): Config` |

### Usage
```typescript
const config1 = Config.getInstance();
const config2 = Config.getInstance();

console.log(config1 === config2);      // true — same object

console.log(config1.getConfig());      // config
console.log(config2.getConfig());      // config
```

Both variables point to the **same instance**, so any configuration read is always consistent regardless of where in the codebase it is accessed.

---

## When to Use Singleton

- Logging service
- Application configuration / settings
- Database connection pool
- Cache manager
- Event bus / message broker

## When NOT to Use Singleton

- When you need multiple independent instances (use regular classes or factories instead).
- When it introduces hidden global state that makes testing hard — prefer dependency injection in those cases.
