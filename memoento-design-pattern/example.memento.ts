// define snapshot class
class Snapshot {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    getContent(): string {
        return this.content;
    }
}

// in originator class define 2 functions to create and restore snapshots
class Originator {
    private content: string;


    write(text: string) {
        this.content += text;
    }

    show(){
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

// define caretaker
class Caretaker {
    private snapshots: Snapshot[] = [];

    addSnapshot(snapshot: Snapshot) {
        this.snapshots.push(snapshot);
    }

    getSnapshot(index: number): Snapshot {
        return this.snapshots[index];
    }
}

// usage
const originator = new Originator();
const caretaker = new Caretaker();

originator.write("State 1");
caretaker.addSnapshot(originator.save());

originator.write("State 2");
caretaker.addSnapshot(originator.save());

originator.write("State 3");
caretaker.addSnapshot(originator.save());

console.log("Current state:", originator.show()); // State 3

originator.restore(caretaker.getSnapshot(1));
console.log("Restored state:", originator.show()); // State 2
