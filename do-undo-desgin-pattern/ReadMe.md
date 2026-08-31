# Do-Undo Command Design Pattern

## What is it?

The **Do-Undo** pattern is a variation of the **Command** pattern focused on actions that can be performed and then reversed. It encapsulates an operation as an object with two methods: `execute()` to do the action and `undo()` to revert it.

## Key Characteristics

- **Encapsulated action** — each command stores everything needed to perform and reverse an operation.
- **Do and undo methods** — every command knows how to apply and revert itself.
- **Invoker with history** — an invoker stores commands and can undo the last one.
- **Decoupled execution** — the client does not need to know the details of the receiver.

## Benefits

- **Simple undo mechanism** — each command handles its own reversal.
- **No scattered undo logic** — the receiver and invoker stay focused on their roles.
- **Extensible** — new reversible actions can be added by creating new command classes.
- **Predictable state rollback** — undoing the last command restores the previous state.

## Implementation Structure

```
// Command interface
interface ICommand {
    execute(): void;
    undo(): void;
}

// Receiver
class Editor {
    private content: string = "";

    write(text: string): void { /* append text */ }
    erase(count: number): void { /* remove last count chars */ }
}

// Concrete command
class WriteCommand implements ICommand {
    private editor: Editor;
    private text: string;

    execute(): void { this.editor.write(this.text); }
    undo(): void { this.editor.erase(this.text.length); }
}

// Invoker
class Invoker {
    private commands: ICommand[] = [];

    execute(command: ICommand): void {
        command.execute();
        this.commands.push(command);
    }

    undo(): void {
        const command = this.commands.pop();
        command?.undo();
    }
}
```

---

## Example — Text Editor with Undo (`text-editor.example.ts`)

### Purpose
A simple text editor needs to write text and undo the last write. The `WriteCommand` knows how to append text and how many characters to remove. The `CommandInvoker` keeps a history of executed commands so they can be undone in reverse order.

### Command Interface
```typescript
interface ICommand {
    execute(): void;
    undo(): void;
}
```

### Receiver
```typescript
class SEditor {
    private content: string = "";

    write(text: string) {
        this.content += text;
    }

    erase(count: number) {
        this.content = this.content.slice(0, -count);
    }

    show() {
        console.log(`SEditor Text: ${this.content}`);
    }
}
```

### Concrete Command
```typescript
class WriteCommand implements ICommand {
    private editor: SEditor;
    private text: string;

    constructor(editor: SEditor, text: string) {
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
class CommandInvoker {
    private commands: ICommand[] = [];

    execute(command: ICommand) {
        command.execute();
        this.commands.push(command);
    }

    undo() {
        const command = this.commands.pop();
        if (command) {
            command.undo();
        }
    }
}
```

### Usage
```typescript
const editor = new SEditor();
const invoker = new CommandInvoker();

console.log("Executing...");
invoker.execute(new WriteCommand(editor, "Hello"));
invoker.execute(new WriteCommand(editor, " World!"));
editor.show(); // SEditor Text: Hello World!

console.log("Undoing...");
invoker.undo();
editor.show(); // SEditor Text: Hello
```

The invoker runs each command forward and records it. Undoing pops the last command from history and calls `undo()`, which removes the same number of characters that were written.

---

## When to Use Do-Undo

- When an action needs to be reversible.
- When users expect undo functionality (text editors, drawing apps, forms).
- When each action can clearly define an opposite action.
- When you want to keep a history of reversible operations.

## When NOT to Use Do-Undo

- When an action has no meaningful or safe reverse operation.
- When undoing would require storing too much state or history.
- When the operation is simple and does not need a command/invoker layer.
