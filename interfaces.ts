type Product = {
    id: number;
    name: string;
    picture: string[];
    cost: number;
    discount: number;
    description: string;
    category: string;
    stock: number;
    sold: number;
    choice: string[];
    storeId: Store;
};

type Store = {
    id: number;
    name: string;
    detail: string;
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
    discount: string;
    start_date: string;
    expiry_date: string;
};

type Order = {
    orderId: number;
    items: CartDetail[];
    totalPrice: number;
    orderDate: string;
    status: string;
}
