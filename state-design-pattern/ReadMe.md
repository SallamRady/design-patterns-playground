# State Design Pattern

## What is it?

The **State** pattern is a **behavioral** design pattern that lets an object **alter its behavior when its internal state changes**. The object appears to change its class by delegating state-specific behavior to separate state objects.

## Key Characteristics

- **Encapsulated states** — each state is a separate class with its own behavior.
- **Shared interface** — all states implement the same interface.
- **Context delegates** to the current state when behavior is requested.
- **Runtime state changes** — the context can switch states dynamically.
- **No large conditionals** — state-specific logic is isolated in its own class.

## Benefits

- **Replaces `switch/if` state logic** with clean, focused classes.
- **Easy to extend** — add a new state without touching the context or other states.
- **State transitions are explicit** and centralized.
- **Improves readability** — state-specific behavior is organized and easy to find.

## Implementation Structure

```
// State interface
interface IState {
    handle(): void;
}

// Concrete states
class StateA implements IState {
    handle(): void { console.log("State A behavior"); }
}

class StateB implements IState {
    handle(): void { console.log("State B behavior"); }
}

// Context
class Context {
    private state: IState;

    constructor(initialState: IState) {
        this.state = initialState;
    }

    setState(state: IState): void {
        this.state = state;
    }

    request(): void {
        this.state.handle();
    }
}
```

---

## Example — Shopping Cart Checkout (`cart-checkout-state.example.ts`)

### Purpose
A shopping cart behaves differently depending on its state: an empty cart cannot checkout, an active cart can proceed to checkout, and a paid cart does not need to be checked out again. The `ShoppingCart` context delegates the `checkout()` call to the current `ICartState`.

### State Interface
```typescript
interface ICartState {
    checkout(): void;
}
```

### Concrete States

| State | Output |
|---|---|
| `EmptyCartState` | `Cannot checkout empty cart` |
| `ActiveCartState` | `Checking out cart` |
| `PaidCartState` | `Cart is already paid` |

### The Context
```typescript
class ShoppingCart {
    private state: ICartState;

    constructor() {
        this.state = new EmptyCartState();
    }

    setState(state: ICartState): void {
        this.state = state;
    }

    checkout(): void {
        this.state.checkout();
    }
}
```

### Usage
```typescript
const cart = new ShoppingCart();
cart.checkout(); // Cannot checkout empty cart

// Change the state at runtime
cart.setState(new ActiveCartState());
cart.checkout(); // Checking out cart

cart.setState(new PaidCartState());
cart.checkout(); // Cart is already paid
```

The `ShoppingCart` class stays simple because each checkout behavior lives in its own `ICartState` implementation. Adding a new state such as `CancelledCartState` only requires adding a new state class and calling `setState()`.

---

## When to Use State

- When an object should change behavior depending on its current state.
- When a class has large conditional statements based on state.
- When state-specific behavior is complex and deserves its own class.
- When states need to be extended or reused independently.

## When NOT to Use State

- When there are only one or two simple states.
- When state logic is trivial and a few `if/else` checks are sufficient.
- When the state changes rarely and do not justify the extra classes.
