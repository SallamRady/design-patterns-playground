# Strategy Design Pattern

## What is it?

The **Strategy** pattern is a **behavioral** design pattern that lets you define a family of **interchangeable algorithms**, put each one into a separate class, and make their objects interchangeable at runtime.

## Key Characteristics

- **Encapsulated algorithms** — each algorithm lives in its own class.
- **Common interface** — all strategies implement the same interface or abstract class.
- **Interchangeable** — strategies can be swapped without changing the client/context code.
- **Open for extension, closed for modification** — new algorithms can be added without touching existing code.

## Benefits

- **Avoids large conditionals** — no `if/else` or `switch` blocks for selecting behavior.
- **Easy to extend** — add a new strategy by creating a new class.
- **Promotes reuse** — each algorithm is a standalone, testable unit.
- **Runtime flexibility** — the active strategy can be changed during execution.

## Implementation Structure

```
// Common strategy interface
interface IStrategy {
    execute(): void;
}

// Concrete strategies
class StrategyA implements IStrategy {
    execute(): void { /* algorithm A */ }
}

class StrategyB implements IStrategy {
    execute(): void { /* algorithm B */ }
}

// Context that uses a strategy
class Context {
    private strategy: IStrategy;

    constructor(strategy: IStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: IStrategy): void {
        this.strategy = strategy;
    }

    runStrategy(): void {
        this.strategy.execute();
    }
}
```

---

## Example — Payment Processing (`payment.strategy.example.ts`)

### Purpose
A checkout system needs to support multiple payment methods. Instead of hardcoding payment logic inside the processor, each payment method becomes its own strategy. The `PaymentProcessor` simply delegates to whichever strategy is currently active.

### Strategy Interface
```typescript
interface IPaymentStrategy {
    pay(amount: number): void;
}
```

### Concrete Strategies

| Strategy | Output |
|---|---|
| `CreditCardPayment` | `Paying ${amount} using Credit Card` |
| `PayPalPayment` | `Paying ${amount} using PayPal` |
| `BitcoinPayment` | `Paying ${amount} using Bitcoin` |

### The Context
```typescript
class PaymentProcessor {
    private paymentStrategy: IPaymentStrategy;

    constructor(paymentStrategy: IPaymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    setPaymentStrategy(paymentStrategy: IPaymentStrategy): void {
        this.paymentStrategy = paymentStrategy;
    }

    processPayment(amount: number): void {
        this.paymentStrategy.pay(amount);
    }
}
```

### Usage
```typescript
const paymentProcessor = new PaymentProcessor(new CreditCardPayment());
paymentProcessor.processPayment(100);
// Paying 100 using Credit Card

paymentProcessor.setPaymentStrategy(new PayPalPayment());
paymentProcessor.processPayment(200);
// Paying 200 using PayPal

paymentProcessor.setPaymentStrategy(new BitcoinPayment());
paymentProcessor.processPayment(300);
// Paying 300 using Bitcoin
```

The `PaymentProcessor` never changes; only the injected strategy does. This makes adding new payment methods trivial — just create another `IPaymentStrategy` implementation.

---

## When to Use Strategy

- When you have many related classes that differ only in their behavior.
- When a class contains a massive conditional for choosing behavior.
- When you need several variants of an algorithm (sorting, validation, payment, routing).
- When the algorithm must be selected or changed at runtime.

## When NOT to Use Strategy

- When there is only one algorithm that is unlikely to change.
- When the overhead of multiple classes adds unnecessary complexity for a simple behavior.
- When the strategy rarely differs and a simple function or method is enough.
