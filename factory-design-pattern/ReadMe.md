# Factory Design Pattern

## What is it?

The **Factory** pattern is a **creational** design pattern that provides a **centralized way to create objects** without specifying the exact class of the object that will be created. It delegates object creation to a dedicated factory class or method.

## Key Characteristics

- **Encapsulated creation** — object construction logic lives in one place.
- **Decoupled client** — the client asks the factory for an object, not `new`.
- **Shared interface** — all created objects implement a common interface or base class.
- **Easy to extend** — new object types can be added without changing client code.

## Benefits

- **Removes direct `new` calls** from business logic.
- **Centralizes creation logic**, making the code easier to maintain.
- **Open/Closed principle** — add new product classes without modifying the client.
- **Improves testability** — the factory can be mocked or swapped.

## Implementation Structure

```
// Product interface
interface IProduct {
    doSomething(): void;
}

// Concrete products
class ProductA implements IProduct {
    doSomething(): void { /* A behavior */ }
}

class ProductB implements IProduct {
    doSomething(): void { /* B behavior */ }
}

// Factory
class ProductFactory {
    static createProduct(type: string): IProduct {
        switch (type) {
            case "A": return new ProductA();
            case "B": return new ProductB();
            default: throw new Error("Unknown product type");
        }
    }
}
```

---

## Example — Notification Creation (`notification-factory.example.ts`)

### Purpose
An application needs to send notifications through different channels (Email, SMS, Push). Instead of letting every consumer decide which class to instantiate, a `NotificationFactory` creates the correct `INotification` object based on a simple string key.

### Product Interface
```typescript
interface INotification {
    send(): void;
}
```

### Concrete Products

| Class | Output |
|---|---|
| `EmailNotification` | `Sending email notification` |
| `SMSNotification` | `Sending SMS notification` |
| `PushNotification` | `Sending push notification` |

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
                throw new Error("Unknown notification type");
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
```

The client code does not depend on `EmailNotification`, `SMSNotification`, or `PushNotification` directly — it only depends on `INotification`. Adding a new notification type means adding a new product class and a new case in the factory, not changing the consumers.

---

## When to Use Factory

- When the exact type of object is not known until runtime.
- When object creation logic is complex or needs to be centralized.
- When you want to hide the concrete classes from the client code.
- When many parts of the app need to create the same family of objects.

## When NOT to Use Factory

- When the object is simple and always the same type.
- When creation logic is trivial and scattered `new` calls are harmless.
- When the added abstraction would overcomplicate a small or prototype project.
