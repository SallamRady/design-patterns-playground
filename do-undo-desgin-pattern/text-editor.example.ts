// define Command Interface
interface ICommand {
    execute(): void;
    undo(): void;
}

// define receiver
class SEditor {
    private content: string = "";

    write(text: string) {
        this.content += text;
    }

    erase(count: number) {
        this.content = this.content.slice(0, -count)
    }

    show() {
        console.log(`SEditor Text: ${this.content}`)
    }
}

// define command concrets
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

//  define invoker
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

// usage
const editor = new SEditor();
const invoker = new CommandInvoker();

console.log("Executing...");
invoker.execute(new WriteCommand(editor, "Hello"));
invoker.execute(new WriteCommand(editor, " World!"));
editor.show(); // SEditor Text: Hello World!

console.log("Undoing...");
invoker.undo();
editor.show(); // SEditor Text: Hello

