import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getCoupon from '@/lib/getCoupon';

interface Coupon {
    id: number;
    name: string;
    image: string;
    discount: number;
}

interface CouponState {
    coupons: Coupon[];
    loading: boolean;
    error: string | null;
}

const initialState: CouponState = {
    coupons: [],
    loading: false,
    error: null,
};

export const fetchCoupons = createAsyncThunk('coupons/fetchCoupons', async () => {
    const response = await getCoupon();
    return response;
});

const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoupons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                state.coupons = action.payload;
                state.loading = false;
            })
            .addCase(fetchCoupons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch coupons';
            });
    },
});

export default couponSlice.reducer;
