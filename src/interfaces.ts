// interfaces.ts
export interface Store {
    name: string;
    detail: string;
    image: string;
    banner: string;
  }
  
  export interface Product {
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
  }
