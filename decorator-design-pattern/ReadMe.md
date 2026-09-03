# Decorator Design Pattern

## What is it?

The **Decorator** pattern is a **structural** design pattern that lets you add new behaviors or responsibilities to objects **dynamically** by placing them inside special wrapper objects. It is a flexible alternative to subclassing for extending functionality.

## Key Characteristics

- **Same interface** — decorators and the original object implement the same interface.
- **Wrapper objects** — decorators wrap the component and can add behavior before or after delegating to it.
- **Composable** — decorators can be stacked or combined at runtime.
- **Open/Closed principle** — add new behavior without changing existing classes.

## Benefits

- **More flexible than inheritance** — behavior is added at runtime by wrapping objects.
- **Single Responsibility** — each decorator handles one feature.
- **Composable** — mix and match decorators to build complex objects.
- **No subclass explosion** — avoids creating a subclass for every feature combination.

## Implementation Structure

```
// Component interface
interface Component {
    operation(): string;
}

// Concrete component
class ConcreteComponent implements Component {
    operation(): string { return "ConcreteComponent"; }
}

// Base decorator
abstract class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    operation(): string {
        return this.component.operation();
    }
}

// Concrete decorator
class ConcreteDecoratorA extends Decorator {
    operation(): string {
        return `A(${super.operation()})`;
    }
}
```

---

## Example — Coffee Shop (`coffee.example.decorator.ts`)

### Purpose
A coffee shop menu needs to calculate the cost and description of different drink combinations. Instead of creating a subclass for every possible drink, decorators wrap a base coffee and add their own price and description.

### Component Interface
```typescript
interface Coffee {
    cost(): number;
    description(): string;
}
```

### Concrete Component
```typescript
class SimpleCoffee implements Coffee {
    cost(): number {
        return 2;
    }

    description(): string {
        return "Simple coffee";
    }
}
```

### Base Decorator
```typescript
abstract class CoffeeDecorator implements Coffee {
    protected coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    cost(): number {
        return this.coffee.cost();
    }

    description(): string {
        return this.coffee.description();
    }
}
```

### Concrete Decorators

| Decorator | Cost | Description |
|---|---|---|
| `MilkDecorator` | `+1` | adds `", milk"` |
| `SugarDecorator` | `+0.5` | adds `", sugar"` |

### Usage
```typescript
const coffee = new SimpleCoffee();
console.log(coffee.description() + " - $" + coffee.cost());
// Simple coffee - $2

const milkCoffee = new MilkDecorator(coffee);
console.log(milkCoffee.description() + " - $" + milkCoffee.cost());
// Simple coffee, milk - $3

const sugarMilkCoffee = new SugarDecorator(milkCoffee);
console.log(sugarMilkCoffee.description() + " - $" + sugarMilkCoffee.cost());
// Simple coffee, milk, sugar - $3.5
```

The decorators wrap the coffee object and extend its `cost()` and `description()` without touching `SimpleCoffee`. New toppings can be added by creating another `CoffeeDecorator` subclass.

---

## When to Use Decorator

- When you want to add responsibilities to objects at runtime.
- When subclassing would create too many classes for every combination.
- When behavior can be layered or combined freely.
- When you need to add features without modifying existing code.

## When NOT to Use Decorator

- When the behavior is fixed and unlikely to change.
- When the added complexity is not worth the flexibility.
- When the base object and decorators are identical and a simpler inheritance chain would suffice.
