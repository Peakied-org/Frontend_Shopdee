// interfaces.ts
export interface Store {
    id: number;
    name: string;
    detail: string;
    image: string;
    banner: string;
  }
  
export interface Product {
    id: number;
    name: string;
    images: string[];
    cost: number;
    discount: number;
    description: string;
    category: string;
    stock: number;
    sold: number;
    choice: string[];
    storeId: Store;
  }
