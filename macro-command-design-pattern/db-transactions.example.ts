// define command interface
interface Command {
    execute(): void;
    undo(): void;
}

// define receiver
class Database {
    private data: Record<string, any> = {};

    insert(key: string, value: any): void {
        this.data[key] = value;
        console.log(`Inserting data: ${key} = ${value}`);
    }

    update(key: string, value: any): void {
        this.data[key] = value;
        console.log(`Updating data: ${key} = ${value}`);
    }

    delete(key: string): void {
        delete this.data[key];
        console.log(`Deleting data: ${key}`);
    }

    get(key: string): any {
        return this.data[key];
    }
}

// define concrete commands
class InsertCommand implements Command {
    private database: Database;
    private key: string;
    private value: any;

    constructor(database: Database, key: string, value: any) {
        this.database = database;
        this.key = key;
        this.value = value;
    }

    execute(): void {
        this.database.insert(this.key, this.value);
    }

    undo(): void {
        this.database.delete(this.key);
    }
}

class UpdateCommand implements Command {
    private database: Database;
    private key: string;
    private value: any;

    constructor(database: Database, key: string, value: any) {
        this.database = database;
        this.key = key;
        this.value = value;
    }

    execute(): void {
        this.database.update(this.key, this.value);
    }

    undo(): void {
        // In a real scenario, you would need to store the previous value
        // For simplicity, we'll just delete the key
        this.database.delete(this.key);
    }
}

class DeleteCommand implements Command {
    private database: Database;
    private key: string;

    constructor(database: Database, key: string) {
        this.database = database;
        this.key = key;
    }

    execute(): void {
        this.database.delete(this.key);
    }

    undo(): void {
        // In a real scenario, you would need to store the deleted value
        // For simplicity, we'll just insert a default value
        this.database.insert(this.key, null);
    }
}

// define invoker
class TransactionManager {
    private commands: Command[] = [];

    addCommand(command: Command): void {
        this.commands.push(command);
    }

    executeAll(): void {
        this.commands.forEach(command => command.execute());
    }

    undoAll(): void {
        // Undo in reverse order
        for (let i = this.commands.length - 1; i >= 0; i--) {
            this.commands[i].undo();
        }
    }
}

// usage
const database = new Database();
const transactionManager = new TransactionManager();

transactionManager.addCommand(new InsertCommand(database, "user1", { name: "John", age: 30 }));
transactionManager.addCommand(new InsertCommand(database, "user2", { name: "Jane", age: 25 }));
transactionManager.addCommand(new UpdateCommand(database, "user1", { name: "John Doe", age: 31 }));
transactionManager.addCommand(new DeleteCommand(database, "user2"));

console.log("Executing transaction...");
transactionManager.executeAll();

console.log("\nCurrent database state:");
console.log(database.get("user1"));
console.log(database.get("user2"));

console.log("\nUndoing transaction...");
transactionManager.undoAll();

console.log("\nDatabase state after undo:");
console.log(database.get("user1"));
console.log(database.get("user2"));
