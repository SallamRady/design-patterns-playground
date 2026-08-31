// define interface for cart state
interface ICartState {
    checkout(): void;
}

// define concrete classes
class EmptyCartState implements ICartState {
    checkout(): void {
        console.log("Cannot checkout empty cart");
    }
}

class ActiveCartState implements ICartState {
    checkout(): void {
        console.log("Checking out cart");
    }
}

class PaidCartState implements ICartState {
    checkout(): void {
        console.log("Cart is already paid");
    }
}

// define context
class ShoppingCart {
    private state: ICartState;

    constructor() {
        this.state = new EmptyCartState();
    }

    setState(state: ICartState): void {
        this.state = state;
    }

    checkout(): void {
        this.state.checkout();
    }
}

// usage
const cart = new ShoppingCart();
cart.checkout();
