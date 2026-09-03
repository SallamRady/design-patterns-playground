// Step 1: Handler interface
interface Approver {
  setNext(next: Approver): Approver;
  approve(request: VacationRequest): void;
}

// Step 2: Request object
class VacationRequest {
  constructor(public days: number, public requesterRole: string) {}
}

// Step 3: Abstract handler
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

// Step 4: Concrete handlers
class TeamLeader extends AbstractApprover {
  approve(request: VacationRequest): void {
    if (request.requesterRole === "Developer" && request.days <= 3) {
      console.log("Team Leader approved Developer request for", request.days, "days");
    } else {
      super.approve(request);
    }
  }
}

class TechnicalManager extends AbstractApprover {
  approve(request: VacationRequest): void {
    if (
      (request.requesterRole === "Developer" && request.days > 3) ||
      request.requesterRole === "TeamLeader"
    ) {
      console.log("Technical Manager approved request from", request.requesterRole);
    } else {
      super.approve(request);
    }
  }
}

class CTO extends AbstractApprover {
  approve(request: VacationRequest): void {
    if (request.requesterRole === "TechnicalManager") {
      console.log("CTO approved Technical Manager request");
    } else {
      super.approve(request);
    }
  }
}

class CEO extends AbstractApprover {
  approve(request: VacationRequest): void {
    if (request.requesterRole === "CTO") {
      console.log("CEO approved CTO request");
    } else {
      super.approve(request);
    }
  }
}

// Step 5: Client builds chain
const teamLeader = new TeamLeader();
const techManager = new TechnicalManager();
const cto = new CTO();
const ceo = new CEO();

teamLeader.setNext(techManager).setNext(cto).setNext(ceo);

// Usage examples
teamLeader.approve(new VacationRequest(2, "Developer"));     // Team Leader approved Developer request for 2 days
teamLeader.approve(new VacationRequest(5, "Developer"));     // Technical Manager approved request from Developer
teamLeader.approve(new VacationRequest(2, "TeamLeader"));    // Technical Manager approved request from TeamLeader
teamLeader.approve(new VacationRequest(1, "TechnicalManager")); // CTO approved Technical Manager request
teamLeader.approve(new VacationRequest(1, "CTO"));           // CEO approved CTO request
teamLeader.approve(new VacationRequest(1, "Intern"));        // No approver available for: VacationRequest { days: 1, requesterRole: 'Intern' }
