// define component interface
interface Coffee {
    cost(): number;
    description(): string;
}

// define concrete component
class SimpleCoffee implements Coffee {
    cost(): number {
        return 2;
    }

    description(): string {
        return "Simple coffee";
    }
}

// define decorator
abstract class CoffeeDecorator implements Coffee {
    protected coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    cost(): number {
        return this.coffee.cost();
    }

    description(): string {
        return this.coffee.description();
    }
}

// define concrete decorators
class MilkDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    cost(): number {
        return this.coffee.cost() + 1;
    }

    description(): string {
        return this.coffee.description() + ", milk";
    }
}

class SugarDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    cost(): number {
        return this.coffee.cost() + 0.5;
    }

    description(): string {
        return this.coffee.description() + ", sugar";
    }
}

// usage
const coffee = new SimpleCoffee();
console.log(coffee.description() + " - $" + coffee.cost());

const milkCoffee = new MilkDecorator(coffee);
console.log(milkCoffee.description() + " - $" + milkCoffee.cost());

const sugarMilkCoffee = new SugarDecorator(milkCoffee);
console.log(sugarMilkCoffee.description() + " - $" + sugarMilkCoffee.cost());

