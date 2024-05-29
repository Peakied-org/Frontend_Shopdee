import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getStores from '@/lib/getStore';


interface StoreState {
    stores: Store[];
    sloading: boolean;
    error: string | null;
}

const initialState: StoreState = {
    stores: [],
    sloading: false,
    error: null,
};

export const fetchStores = createAsyncThunk('stores/fetchStores', async () => {
    const response = await getStores();
    return response;
});

const storeSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStores.pending, (state) => {
                state.sloading = true;
                state.error = null;
            })
            .addCase(fetchStores.fulfilled, (state, action) => {
                state.stores = action.payload;
                state.sloading = false;
            })
            .addCase(fetchStores.rejected, (state, action) => {
                state.sloading = false;
                state.error = action.error.message || 'Failed to fetch stores';
            });
    },
});

export default storeSlice.reducer;
