# Macro Command Design Pattern

## What is it?

The **Macro Command** pattern is an extension of the **Command** pattern. It groups multiple commands into a single composite command that can be executed and undone as one unit. This is especially useful for transactions, batch operations, or multi-step workflows.

## Key Characteristics

- **Composite command** — a collection of smaller commands treated as one.
- **Atomic-like execution** — run multiple commands together in a defined order.
- **Reversible as a group** — all commands in the macro can be undone together.
- **Sequential ordering** — execution follows the list order; undo runs in reverse.

## Benefits

- **Batch operations** — perform several actions in a single call.
- **Transaction-like behavior** — group related commands and roll back the whole group.
- **Reusability** — the same set of commands can be reused as a single macro.
- **Cleaner client code** — the client only triggers one `executeAll()` or `undoAll()`.
- **Predictable undo** — reverse order undo keeps dependencies between commands safe.

## Implementation Structure

```
// Command interface
interface ICommand {
    execute(): void;
    undo(): void;
}

// Concrete commands
class CommandA implements ICommand {
    execute(): void { /* ... */ }
    undo(): void { /* ... */ }
}

class CommandB implements ICommand {
    execute(): void { /* ... */ }
    undo(): void { /* ... */ }
}

// Macro command / invoker
class MacroCommand {
    private commands: ICommand[] = [];

    add(command: ICommand): void {
        this.commands.push(command);
    }

    executeAll(): void {
        this.commands.forEach(command => command.execute());
    }

    undoAll(): void {
        for (let i = this.commands.length - 1; i >= 0; i--) {
            this.commands[i].undo();
        }
    }
}
```

---

## Example — Database Transactions (`db-transactions.example.ts`)

### Purpose
A database operation often involves multiple steps that should be treated as a single transaction. The `TransactionManager` collects `InsertCommand`, `UpdateCommand`, and `DeleteCommand` objects, then runs them all at once and rolls them back in reverse order.

### Command Interface
```typescript
interface Command {
    execute(): void;
    undo(): void;
}
```

### Receiver
```typescript
class Database {
    private data: Record<string, any> = {};

    insert(key: string, value: any): void { /* ... */ }
    update(key: string, value: any): void { /* ... */ }
    delete(key: string): void { /* ... */ }
    get(key: string): any { /* ... */ }
}
```

### Concrete Commands

| Command | `execute()` | `undo()` |
|---|---|---|
| `InsertCommand` | `database.insert(key, value)` | `database.delete(key)` |
| `UpdateCommand` | `database.update(key, value)` | `database.delete(key)` (simplified) |
| `DeleteCommand` | `database.delete(key)` | `database.insert(key, null)` (simplified) |

### The Macro Invoker
```typescript
class TransactionManager {
    private commands: Command[] = [];

    addCommand(command: Command): void {
        this.commands.push(command);
    }

    executeAll(): void {
        this.commands.forEach(command => command.execute());
    }

    undoAll(): void {
        for (let i = this.commands.length - 1; i >= 0; i--) {
            this.commands[i].undo();
        }
    }
}
```

### Usage
```typescript
const database = new Database();
const transactionManager = new TransactionManager();

transactionManager.addCommand(new InsertCommand(database, "user1", { name: "John", age: 30 }));
transactionManager.addCommand(new InsertCommand(database, "user2", { name: "Jane", age: 25 }));
transactionManager.addCommand(new UpdateCommand(database, "user1", { name: "John Doe", age: 31 }));
transactionManager.addCommand(new DeleteCommand(database, "user2"));

console.log("Executing transaction...");
transactionManager.executeAll();

// Current database state:
// user1: { name: 'John Doe', age: 31 }
// user2: undefined

console.log("\nUndoing transaction...");
transactionManager.undoAll();

// Database state after undo:
// user1: undefined
// user2: undefined
```

The `TransactionManager` treats the four separate database commands as one transaction. Executing the macro applies all commands forward; undoing it rolls back each command in the opposite order to keep state changes consistent.

---

## When to Use Macro Command

- When a group of commands should run or roll back together.
- When implementing transactions, batch jobs, or multi-step workflows.
- When you want to expose a single `execute`/`undo` for a sequence of commands.
- When preserving the order of operations and their reverse is important.

## When NOT to Use Macro Command

- When commands are unrelated and should not fail or undo together.
- When the undo logic is too complex for group rollback.
- When a single command is enough and the macro adds unnecessary complexity.
