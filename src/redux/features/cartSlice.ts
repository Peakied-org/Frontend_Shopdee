import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CartState = {
    productItems: Product[]
}

const initialState:CartState = {productItems: []}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action:PayloadAction<Product>) => {
            state.productItems.push(action.payload)
        },
        removeProduct: (state, action:PayloadAction<Product>) => {
            const remainItems = state.productItems.filter(obj => {
                return (obj.name !== action.payload.name)
            })
            state.productItems = remainItems
        }
    }
})

export const {addProduct, removeProduct} = cartSlice.actions
export default cartSlice.reducer