# Command Design Pattern

## What is it?

The **Command** pattern is a **behavioral** design pattern that turns a **request or action into a standalone object**. This object contains all the information needed to perform the action, allowing requests to be queued, logged, undone, or delegated.

## Key Characteristics

- **Encapsulated request** — a command object represents a single action.
- **Decoupled invoker and receiver** — the invoker does not need to know how the action is performed.
- **Reversible operations** — commands can implement `undo()` or `redo()`.
- **History and queuing** — commands can be stored, logged, scheduled, or replayed.

## Benefits

- **Undo/Redo support** — every command knows how to reverse itself.
- **Decoupling** — the invoker, receiver, and command are independent.
- **Macro operations** — multiple commands can be combined into one.
- **Delayed execution** — commands can be queued and executed later.
- **Auditability** — the history of operations can be logged or inspected.

## Implementation Structure

```
// Command interface
interface ICommand {
    execute(): void;
    undo(): void;
}

// Receiver: knows the actual business logic
class Receiver {
    action(): void { /* real action */ }
    reverseAction(): void { /* undo action */ }
}

// Concrete command
class ConcreteCommand implements ICommand {
    private receiver: Receiver;

    constructor(receiver: Receiver) {
        this.receiver = receiver;
    }

    execute(): void {
        this.receiver.action();
    }

    undo(): void {
        this.receiver.reverseAction();
    }
}

// Invoker: stores and triggers commands
class Invoker {
    private history: ICommand[] = [];

    execute(command: ICommand): void {
        command.execute();
        this.history.push(command);
    }

    undo(): void {
        this.history.pop()?.undo();
    }
}
```

---

## Example — Text Editor with Undo (`text-editor.example.ts`)

### Purpose
A text editor needs to support writing text and undoing the last write. Instead of calling editor methods directly, each write is wrapped in a `WriteCommand` that knows how to execute and undo itself. The `TextEditorInvoker` maintains a history of commands and can undo them.

### Command Interface
```typescript
interface Command {
    execute(): void;
    undo(): void;
}
```

### Receiver
```typescript
class TextEditor {
    private text: string = "";

    write(text: string): void {
        this.text += text;
        console.log("Writing text: " + text);
    }

    erase(count: number): void {
        this.text = this.text.slice(0, -count);
        console.log("Erasing text");
    }

    show(): void {
        console.log("Text: " + this.text);
    }
}
```

### Concrete Command
```typescript
class WriteCommand implements Command {
    private editor: TextEditor;
    private text: string;

    constructor(editor: TextEditor, text: string) {
        this.editor = editor;
        this.text = text;
    }

    execute(): void {
        this.editor.write(this.text);
    }

    undo(): void {
        this.editor.erase(this.text.length);
    }
}
```

### Invoker
```typescript
class TextEditorInvoker {
    private history: Command[] = [];

    execute(command: Command): void {
        command.execute();
        this.history.push(command);
    }

    undo(): void {
        this.history.pop()?.undo();
    }
}
```

### Usage
```typescript
const editor = new TextEditor();
const manager = new TextEditorInvoker();

manager.execute(new WriteCommand(editor, "Hello"));
manager.execute(new WriteCommand(editor, " "));
manager.execute(new WriteCommand(editor, "World"));

editor.show(); // Text: Hello World

manager.undo(); // Erasing text

editor.show(); // Text: Hello
```

The `TextEditorInvoker` never touches `editor.write()` or `editor.erase()` directly. It only stores and triggers `Command` objects. Undoing the last write removes the exact number of characters that were added, because each command encapsulates its own text.

---

## When to Use Command

- When you need undo/redo functionality.
- When requests should be parameterized, queued, or logged.
- When you want to decouple the object that triggers an action from the object that performs it.
- When building macro commands that combine multiple operations.

## When NOT to Use Command

- When an action is simple and never needs undo or queuing.
- When the overhead of wrapping every action in a class adds unnecessary complexity.
- When the receiver and invoker are already tightly coupled and unlikely to change.
