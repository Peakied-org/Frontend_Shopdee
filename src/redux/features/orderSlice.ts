import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface OrderDetail {
    id: number;
    name: string;
    orderID: number;
    storeID: number;
    itemID: number;
    quantity: number;
    cost: number;
    image: string;
    status: string;
    type: string;
}

interface Order {
    id: number;
    userID: number;
    orderDate: string;
    totalCost: number;
    orderDetails: OrderDetail[];
}

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (token: string) => {
    const response = await fetch("http://localhost:8080/order", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Cannot get order: ${response.statusText}`);
    }

    const data = await response.json();
    return data.body;
});

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch orders';
            });
    },
});

export default orderSlice.reducer;
