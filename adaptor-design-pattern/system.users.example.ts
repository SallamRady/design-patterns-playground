/**
 * Interface for user data
 */
interface IUser {
    id: number;
    name: string;
    email: string;
}

/**
 * Adaptor for System A
 */
function adaptorUserFromSystemA(data: any) {
    return {
        id: data._id,
        name: data.username,
        email: data.email
    };
}

/**
 * Adaptor for System B
 */
function adaptorUserFromSystemB(data: any) {
    return {
        id: data.id,
        name: data.full_name,
        email: data.email_address
    };
}

// Example usage:
const systemAUser = {
    _id: 1,
    username: "john_doe",
    email: "john.doe@example.com"
};

const systemBUser = {
    id: 2,
    full_name: "Jane Smith",
    email_address: "jane.smith@example.com"
};

const adaptedUserA: IUser = adaptorUserFromSystemA(systemAUser);
const adaptedUserB: IUser = adaptorUserFromSystemB(systemBUser);

console.log(adaptedUserA);
console.log(adaptedUserB);
