export interface CartAddItem {
    itemId: string;
    amount: number;
}

export interface UserCart {
    _id: string;
    userId: string;
    items: CartItem[];
}

export interface CartItem {
    itemId: string;
    name: string;
    price: number;
    amount: number;
    image: string;
  }
