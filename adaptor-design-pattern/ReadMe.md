# Adapter Design Pattern

## What is it?

The **Adapter** pattern is a **structural** design pattern that allows objects with **incompatible interfaces** to work together. It acts as a bridge by wrapping one interface and exposing another interface that the client expects.

## Key Characteristics

- **Interface compatibility** — converts one interface into another the client expects.
- **Wrapper** — wraps the existing object (adaptee) without modifying it.
- **Reusability** — allows existing code or third-party APIs to be reused without changes.
- **Decoupling** — client code depends only on the target interface.

## Benefits

- **Enables integration** — connects systems that were not designed to work together.
- **Open/Closed principle** — you can add new adapters without changing existing source code.
- **Improves testability** — you can mock or swap adaptees behind a stable interface.
- **Hides complexity** — the client does not need to know the details of the external system's data shape.

## Implementation Structure

```
// Target interface the client expects
interface ITarget {
    method(): string;
}

// Adaptee: existing interface that does not match
class Adaptee {
    specificMethod(): string { return 'specific result'; }
}

// Adapter: wraps Adaptee and exposes ITarget
class Adapter implements ITarget {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        this.adaptee = adaptee;
    }

    method(): string {
        return this.adaptee.specificMethod();
    }
}
```

---

## Example — User Data from External Systems (`system.users.example.ts`)

### Purpose
Two external systems return user data in different shapes. Our application expects a single, unified `IUser` interface. We use adapters to convert each system's data format into our standard `IUser` format without changing the external systems.

### Target Interface
```typescript
interface IUser {
    id: number;
    name: string;
    email: string;
}
```

### System A Shape
```typescript
const systemAUser = {
    _id: 1,
    username: "john_doe",
    email: "john.doe@example.com"
};
```

### System B Shape
```typescript
const systemBUser = {
    id: 2,
    full_name: "Jane Smith",
    email_address: "jane.smith@example.com"
};
```

### How the Adapter is Applied

| Adapter | Maps from | Maps to |
|---|---|---|
| `adaptorUserFromSystemA` | `_id`, `username`, `email` | `IUser` (`id`, `name`, `email`) |
| `adaptorUserFromSystemB` | `id`, `full_name`, `email_address` | `IUser` (`id`, `name`, `email`) |

### Usage
```typescript
const adaptedUserA: IUser = adaptorUserFromSystemA(systemAUser);
const adaptedUserB: IUser = adaptorUserFromSystemB(systemBUser);

console.log(adaptedUserA);
// { id: 1, name: "john_doe", email: "john.doe@example.com" }

console.log(adaptedUserB);
// { id: 2, name: "Jane Smith", email: "jane.smith@example.com" }
```

Both `adaptedUserA` and `adaptedUserB` are valid `IUser` objects, even though the original data came from different systems with different field names.

---

## When to Use Adapter

- Integrating with external APIs or legacy systems.
- Unifying data formats from multiple sources.
- Wrapping a class or library with an interface that does not match your application.
- Migrating to a new interface while still supporting old consumers.

## When NOT to Use Adapter

- When the interfaces already match — adding an adapter is unnecessary indirection.
- When you can simply modify the adaptee's source code to match the target interface.
- When the problem is better solved by a facade, decorator, or strategy pattern.
