export interface Address {
    street: string;
    houseNumber: string;
    zipCode: string;
    city: string;
}
export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address: Address;
    isAdmin?: boolean;
}
