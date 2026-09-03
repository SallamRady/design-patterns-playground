# Design Patterns Playground

A curated collection of **design pattern implementations in TypeScript**. Each pattern has its own directory with a **README** explaining the concept, step-by-step implementation, and a working example. This playground is perfect for learning, practicing, and referencing design patterns in real-world projects.

## Included Patterns

| Pattern | Category | Description |
|---|---|---|
| [Singleton](singleton-design-pattern) | Creational | Ensures only one instance of a class exists. |
| [Factory](factory-design-pattern) | Creational | Centralizes object creation through a factory method. |
| [Adapter](adaptor-design-pattern) | Structural | Bridges incompatible interfaces. |
| [Decorator](decorator-design-pattern) | Structural | Adds behavior dynamically by wrapping objects. |
| [Strategy](strategy-design-pattern) | Behavioral | Interchangeable algorithms selected at runtime. |
| [State](state-design-pattern) | Behavioral | Changes behavior based on internal state. |
| [Command](command-design-pattern) | Behavioral | Encapsulates requests as objects. |
| [Macro Command](macro-command-design-pattern) | Behavioral | Groups multiple commands and undo them as one unit. |
| [Do-Undo Command](do-undo-desgin-pattern) | Behavioral | Simple do/undo command with invoker history. |
| [Null Object](null-object-design-pattern) | Behavioral | Provides a default neutral object instead of `null`. |
| [Memento](memoento-design-pattern) | Behavioral | Saves and restores object state. |
| [Chain of Responsibility](chain-of-responsability) | Behavioral | Passes requests along a chain of handlers. |

## How to Run Examples

All examples are plain TypeScript files and can be executed with [`tsx`](https://github.com/privatenumber/tsx):

```bash
tsx <pattern-directory>/<example-file>.ts
```

For example:

```bash
tsx singleton-design-pattern/logger.example.ts
```

## Project Structure

```
design-patterns-playground/
├── README.md
├── LICENSE
├── singleton-design-pattern/
│   ├── logger.example.ts
│   ├── config.example.ts
│   └── ReadMe.md
├── factory-design-pattern/
│   ├── notification-factory.example.ts
│   └── ReadMe.md
├── strategy-design-pattern/
│   ├── payment.strategy.example.ts
│   └── ReadMe.md
├── ...
```

Each pattern directory contains:

- `*.example.ts` — runnable TypeScript implementation.
- `ReadMe.md` — concept, benefits, implementation structure, usage, and guidance.

## Getting Started

1. Clone the repository.
2. Install `tsx` if it is not already available:

   ```bash
   npm install -g tsx
   ```

3. Pick a pattern and run its example:

   ```bash
   tsx command-design-pattern/text-editor.example.ts
   ```

## Why These Patterns?

Design patterns are reusable solutions to common software design problems. This playground helps you understand them by writing and running small, focused examples. Each example is intentionally minimal so the pattern itself stays clear and easy to follow.

## License

See the [LICENSE](LICENSE) file for details.
