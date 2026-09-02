# Memento Design Pattern

## What is it?

The **Memento** pattern is a **behavioral** design pattern that lets you **save and restore the previous state of an object** without revealing the details of its internal structure. It is useful for implementing undo, rollback, or checkpoint functionality.

## Key Characteristics

- **Encapsulated state** — the state is stored in a separate memento object.
- **Originator** — the object whose state is being saved and restored.
- **Caretaker** — manages the history of mementos without accessing their content.
- **No state exposure** — the caretaker cannot modify or inspect the memento's data.

## Benefits

- **Undo / restore support** — revert an object to a previous state.
- **Encapsulation preserved** — the originator's internal state stays private.
- **State history** — multiple snapshots can be stored and restored selectively.
- **Clean separation of concerns** — originator creates/restores, caretaker stores.

## Implementation Structure

```
// Memento: stores a snapshot of state
class Memento {
    private state: string;

    getState(): string { return this.state; }
}

// Originator: creates and restores snapshots
class Originator {
    private state: string;

    save(): Memento { return new Memento(this.state); }
    restore(memento: Memento): void { this.state = memento.getState(); }
}

// Caretaker: keeps history of mementos
class Caretaker {
    private history: Memento[] = [];

    add(memento: Memento): void { this.history.push(memento); }
    get(index: number): Memento { return this.history[index]; }
}
```

---

## Example — Text Editor Snapshots (`example.memento.ts`)

### Purpose
A text editor needs to save its content at different stages so it can restore a previous version later. The `Originator` creates `Snapshot` objects; the `Caretaker` stores them and provides them on demand.

### Memento
```typescript
class Snapshot {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    getContent(): string {
        return this.content;
    }
}
```

### Originator
```typescript
class Originator {
    private content: string;

    write(text: string) {
        this.content += text;
    }

    show() {
        console.log('Content:', this.content);
    }

    // save current state (take snapshot)
    save(): Snapshot {
        return new Snapshot(this.content);
    }

    // restore state from snapshot
    restore(snapshot: Snapshot) {
        this.content = snapshot.getContent();
    }
}
```

### Caretaker
```typescript
class Caretaker {
    private snapshots: Snapshot[] = [];

    addSnapshot(snapshot: Snapshot) {
        this.snapshots.push(snapshot);
    }

    getSnapshot(index: number): Snapshot {
        return this.snapshots[index];
    }
}
```

### Usage
```typescript
const originator = new Originator();
const caretaker = new Caretaker();

originator.write("State 1");
caretaker.addSnapshot(originator.save());

originator.write("State 2");
caretaker.addSnapshot(originator.save());

originator.write("State 3");
caretaker.addSnapshot(originator.save());

console.log("Current state:");
originator.show(); // Content: State 1State 2State 3

originator.restore(caretaker.getSnapshot(1));
console.log("Restored state:");
originator.show(); // Content: State 1State 2
```

After writing three states, the `Caretaker` holds three snapshots. Restoring the snapshot at index 1 returns the editor to the state after `State 2` was written.

---

## When to Use Memento

- When you need to implement undo or rollback functionality.
- When an object's state must be saved and restored without breaking encapsulation.
- When you need checkpoints, drafts, or version history.
- When the caretaker should manage history but not read or modify it.

## When NOT to Use Memento

- When the state is very large and storing many snapshots is too expensive.
- When the object has no meaningful previous state to restore.
- When simpler alternatives, like direct cloning or immutable state, are sufficient.
