# Null Object Design Pattern

## What is it?

The **Null Object** pattern is a **behavioral** design pattern that provides a **default object with neutral behavior** instead of `null` or `undefined`. It allows client code to call methods on an object without checking whether the object is null first.

## Key Characteristics

- **Replaces null references** with a real, valid object.
- **Implements the same interface** as the real objects.
- **No special checks needed** — clients can treat the null object like any other implementation.
- **Predictable default behavior** — does nothing, logs a message, or returns a safe default.

## Benefits

- **Eliminates null checks** — no `if (obj === null)` scattered through the code.
- **Reduces null pointer errors** — the object always exists and can be called safely.
- **Simpler client code** — treats all objects uniformly via the shared interface.
- **Safer default behavior** — missing or unsupported cases are handled gracefully.

## Implementation Structure

```
// Shared interface
interface IService {
    run(): void;
}

// Real implementation
class RealService implements IService {
    run(): void { console.log("Real service running"); }
}

// Null implementation
class NullService implements IService {
    run(): void { /* does nothing */ }
}

// Factory that always returns an IService
class ServiceFactory {
    static create(type: string): IService {
        if (type === "real") return new RealService();
        return new NullService();
    }
}
```

---

## Example — Notification with Null Fallback (`notification-null-object.example.ts`)

### Purpose
When a user requests an unknown notification type, instead of returning `null` or throwing an error, the factory returns a `NullNotification`. The caller can call `send()` on the result without worrying about null checks.

### Shared Interface
```typescript
interface INotification {
    send(): void;
}
```

### Real Implementations

| Class | Output |
|---|---|
| `EmailNotification` | `Sending email notification` |
| `SMSNotification` | `Sending SMS notification` |
| `PushNotification` | `Sending push notification` |

### Null Implementation
```typescript
class NullNotification implements INotification {
    send(): void {
        console.log("No notification to send");
    }
}
```

### The Factory
```typescript
class NotificationFactory {
    static createNotification(type: string): INotification {
        switch (type) {
            case "email":
                return new EmailNotification();
            case "sms":
                return new SMSNotification();
            case "push":
                return new PushNotification();
            default:
                return new NullNotification();
        }
    }
}
```

### Usage
```typescript
const emailNotification = NotificationFactory.createNotification("email");
emailNotification.send(); // Sending email notification

const smsNotification = NotificationFactory.createNotification("sms");
smsNotification.send();   // Sending SMS notification

const pushNotification = NotificationFactory.createNotification("push");
pushNotification.send();  // Sending push notification

const nullNotification = NotificationFactory.createNotification("unknown");
nullNotification.send();  // No notification to send
```

Because `NullNotification` implements `INotification`, the `unknown` case does not crash the program — it simply runs a safe no-op-like default behavior.

---

## When to Use Null Object

- When null/undefined checks are repeated throughout the codebase.
- When a missing or unsupported value should have safe, predictable behavior.
- When you want to avoid `null`/`undefined` runtime errors.
- When a default "do nothing" behavior is acceptable for some cases.

## When NOT to Use Null Object

- When `null` itself is meaningful and the client must react to it.
- When a missing value should genuinely fail or stop execution.
- When the null behavior is not well-defined and could hide bugs silently.
