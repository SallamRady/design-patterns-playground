# Chain of Responsibility Design Pattern

## What is it?

The **Chain of Responsibility** pattern is a **behavioral** design pattern that passes a request along a **chain of handlers**. Each handler decides whether to process the request or pass it to the next handler in the chain. This decouples the sender of a request from the receiver.

## Key Characteristics

- **Linked handlers** — each handler knows the next handler in the chain.
- **Decentralized decision making** — every handler checks if it can process the request.
- **Fallback behavior** — if no handler can process the request, it reaches the end of the chain.
- **Dynamic chain** — the client can build or change the chain at runtime.

## Benefits

- **Decouples sender and receiver** — the sender does not know which handler will process the request.
- **Open/Closed principle** — add new handlers without changing the client or existing handlers.
- **Flexible processing order** — change the chain to alter who gets a chance to handle the request first.
- **Reduces conditional complexity** — avoids large `if/else` or `switch` statements for deciding who handles a request.

## Implementation Structure

```
// Handler interface
interface IHandler {
    setNext(handler: IHandler): IHandler;
    handle(request: Request): void;
}

// Abstract handler
abstract class AbstractHandler implements IHandler {
    private next: IHandler | null = null;

    setNext(handler: IHandler): IHandler {
        this.next = handler;
        return handler;
    }

    handle(request: Request): void {
        if (this.next) {
            this.next.handle(request);
        } else {
            console.log("No handler available");
        }
    }
}

// Concrete handler
class ConcreteHandlerA extends AbstractHandler {
    handle(request: Request): void {
        if (/* can handle */) {
            // handle it
        } else {
            super.handle(request);
        }
    }
}
```

---

## Example — Vacation Approval (`vacation-request-example.ts`)

### Purpose
A company vacation request must be approved by different managers depending on the requester role and number of days. Each approver in the chain handles the request if it falls under their responsibility; otherwise, it moves to the next level.

### Handler Interface
```typescript
interface Approver {
    setNext(next: Approver): Approver;
    approve(request: VacationRequest): void;
}
```

### Request Object
```typescript
class VacationRequest {
    constructor(public days: number, public requesterRole: string) {}
}
```

### Abstract Handler
```typescript
abstract class AbstractApprover implements Approver {
    private next: Approver | null = null;

    setNext(next: Approver): Approver {
        this.next = next;
        return next; // allows chaining
    }

    approve(request: VacationRequest): void {
        if (this.next) {
            this.next.approve(request);
        } else {
            console.log("No approver available for:", request);
        }
    }
}
```

### Concrete Handlers

| Handler | Handles |
|---|---|
| `TeamLeader` | Developer requests of 3 days or less |
| `TechnicalManager` | Developer requests over 3 days or TeamLeader requests |
| `CTO` | TechnicalManager requests |
| `CEO` | CTO requests |

### Building the Chain
```typescript
const teamLeader = new TeamLeader();
const techManager = new TechnicalManager();
const cto = new CTO();
const ceo = new CEO();

teamLeader.setNext(techManager).setNext(cto).setNext(ceo);
```

### Usage
```typescript
teamLeader.approve(new VacationRequest(2, "Developer"));
// Team Leader approved Developer request for 2 days

teamLeader.approve(new VacationRequest(5, "Developer"));
// Technical Manager approved request from Developer

teamLeader.approve(new VacationRequest(2, "TeamLeader"));
// Technical Manager approved request from TeamLeader

teamLeader.approve(new VacationRequest(1, "TechnicalManager"));
// CTO approved Technical Manager request

teamLeader.approve(new VacationRequest(1, "CTO"));
// CEO approved CTO request

teamLeader.approve(new VacationRequest(1, "Intern"));
// No approver available for: VacationRequest { days: 1, requesterRole: 'Intern' }
```

The `teamLeader` approver is the only entry point. Depending on the request, it either handles it or delegates it up the chain to the `TechnicalManager`, `CTO`, or `CEO`. If no handler matches, the chain reaches the end and prints a fallback message.

---

## When to Use Chain of Responsibility

- When multiple objects may handle a request and the handler is not known in advance.
- When you want to avoid coupling the sender to a specific receiver.
- When a request should pass through a sequence of checks or approvals.
- When you need dynamic or configurable processing pipelines.

## When NOT to Use Chain of Responsibility

- When the handler can be determined with a simple mapping or condition.
- When every request must always be handled by all handlers (use pipeline/middleware instead).
- When the order of handlers does not matter and a simple loop would be clearer.
