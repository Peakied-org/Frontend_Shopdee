type Product = {
    id: number;
    name: string;
    images: string[];
    cost: number;
    discount: number;
    detail: string;
    category: string;
    stock: number;
    sold: number;
    types: string[];
    storeId: Store;
};

type Store = {
    id: number;
    name: string;
    detail: string;
    userID: number;
    items: Product[];
    image: string;
    banner: string;
}

type SortedProductsProps = {
    sortPrice: string;
    sortChar: string;
    minPrice: string;
    maxPrice: string;
    value: string;
};

type CartDetail = {
    id: number;
    name: string;
    picture: string[];
    cost: number;
    discount: number;
    cartID: number;
    itemID: number;
    storeID: number;
    quantity: number;
};

type Coupon = {
    id: number;
    name: string;
    discount: number;
    image: string
};

type Order = {
    orderId: number;
    items: CartDetail[];
    totalPrice: number;
    orderDate: string;
    status: string;
}

type User = {
    body: {
        name: string,
        role: string,
    }
}
