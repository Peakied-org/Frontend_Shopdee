import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  cost: number;
  discount: number;
  quantity: number;
  picture: string;
  type: string;
}

interface CartState {
  items: CartItem[];
}

// Attempt to load the cart state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined; // No saved state found
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load cart state:', err);
    return undefined;
  }
};

// Set the initial state to the loaded state or fallback to the default
const initialState: CartState = loadState() || { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Ensure new items have a quantity of 1
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
        state.items = [];
    },
  },
});


export const { addToCart, incrementQuantity, decrementQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
