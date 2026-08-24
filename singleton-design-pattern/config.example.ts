class Config {
    // static instance
    private static instance: Config;
    
    // private constructor to prevent external instantiation
    private constructor() {}
    
    // static method to get instance
    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
    
    // example method
    public getConfig(): string {
        return "config";
    }
}

// Usage
const config1 = Config.getInstance();
const config2 = Config.getInstance();

console.log(config1 === config2); // true

console.log(config1.getConfig()); // config
console.log(config2.getConfig()); // config
