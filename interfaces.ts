type Product = {
    name: string;
    cost: number;
    discount: number;
    picture: string[];
    sold: number;
};

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