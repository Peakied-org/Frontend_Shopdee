// itemSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getItems from '@/lib/getItems';
import { Product } from '@/interfaces';

interface ItemState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ItemState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await getItems();
    return response;
});

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch items';
            });
    },
});

export default itemSlice.reducer;
