export interface Item {
    _id: string;
    name: string;
    description: string;
    image: string;
    categoryId: string;
    price: number;
    rating: number;
}

export interface Category {
    _id:string;
    name:string;
    icon:string;
}