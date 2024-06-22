
interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address: Address;
}

interface Address {
    street: string;
    houseNumber: string;
    zipCode: string;
    city: string;
}