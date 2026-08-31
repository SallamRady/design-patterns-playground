// define interface for notification
interface INotification {
    send(): void;
}

// define concrete notifications
class EmailNotification implements INotification {
    send(): void {
        console.log("Sending email notification");
    }
}

class SMSNotification implements INotification {
    send(): void {
        console.log("Sending SMS notification");
    }
}

class PushNotification implements INotification {
    send(): void {
        console.log("Sending push notification");
    }
}

// define null object
class NullNotification implements INotification {
    send(): void {
        console.log("No notification to send");
    }
}

// define factory
class NotificationFactory {
    static createNotification(type: string): INotification {
        switch (type) {
            case "email":
                return new EmailNotification();
            case "sms":
                return new SMSNotification();
            case "push":
                return new PushNotification();
            default:
                return new NullNotification();
        }
    }
}

// usage
const emailNotification = NotificationFactory.createNotification("email");
emailNotification.send();

const smsNotification = NotificationFactory.createNotification("sms");
smsNotification.send();

const pushNotification = NotificationFactory.createNotification("push");
pushNotification.send();

const nullNotification = NotificationFactory.createNotification("unknown");
nullNotification.send();
