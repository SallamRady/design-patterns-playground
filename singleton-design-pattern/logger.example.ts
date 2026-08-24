class Logger {
    // static instance
    private static instance: Logger;
    
    // private constructor
    private constructor() {}
    
    // static method to get instance
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    
    // example method
    public log(message: string): void {
        console.log(message);
    }
    
    // example method
    public error(message: string): void {
        console.error(message);
    }
    
    // example method
    public warn(message: string): void {
        console.warn(message);
    }
    
    // example method
    public info(message: string): void {
        console.info(message);
    }
}

// Usage
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

console.log(logger1 === logger2); // true

logger1.log("Hello World"); // Hello World
logger2.log("Hello World"); // Hello World

logger1.error("Error"); // Error
logger2.error("Error"); // Error

logger1.warn("Warning"); // Warning
logger2.warn("Warning"); // Warning

logger1.info("Info"); // Info
logger2.info("Info"); // Info


