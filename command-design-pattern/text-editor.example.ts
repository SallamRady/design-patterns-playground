// define command interface
interface Command {
    execute(): void;
    undo(): void;
}

//  define receiver
class TextEditor {
    private text: string = "";

    write(text: string): void {
        this.text += text;
        console.log("Writing text: " + text);
    }

    erase(count:number): void {
        this.text = this.text.slice(0, -count);
        console.log("Erasing text");
    }

    show(): void {
        console.log("Text: " + this.text);
    }
}

// define concrete commands
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

//  define invoker
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


// usage
const editor = new TextEditor();
const manager = new TextEditorInvoker();
manager.execute(new WriteCommand(editor, "Hello"));
manager.execute(new WriteCommand(editor, " "));
manager.execute(new WriteCommand(editor, "World"));
editor.show();
manager.undo();
editor.show();