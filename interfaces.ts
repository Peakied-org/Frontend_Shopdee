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