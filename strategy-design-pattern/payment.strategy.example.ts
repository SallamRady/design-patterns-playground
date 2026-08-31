// define interface for payment strategy
interface IPaymentStrategy {
    pay(amount: number): void;
}

// define concrete strategies
class CreditCardPayment implements IPaymentStrategy {
    pay(amount: number): void {
        console.log(`Paying ${amount} using Credit Card`);
    }
}

class PayPalPayment implements IPaymentStrategy {
    pay(amount: number): void {
        console.log(`Paying ${amount} using PayPal`);
    }
}

class BitcoinPayment implements IPaymentStrategy {
    pay(amount: number): void {
        console.log(`Paying ${amount} using Bitcoin`);
    }
}

// define context
class PaymentProcessor {
    private paymentStrategy: IPaymentStrategy;

    constructor(paymentStrategy: IPaymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    setPaymentStrategy(paymentStrategy: IPaymentStrategy): void {
        this.paymentStrategy = paymentStrategy;
    }

    processPayment(amount: number): void {
        this.paymentStrategy.pay(amount);
    }
}

// usage
const paymentProcessor = new PaymentProcessor(new CreditCardPayment());
paymentProcessor.processPayment(100);

paymentProcessor.setPaymentStrategy(new PayPalPayment());
paymentProcessor.processPayment(200);

paymentProcessor.setPaymentStrategy(new BitcoinPayment());
paymentProcessor.processPayment(300);
