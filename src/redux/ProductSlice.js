// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data;
  }
);
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    category: null,
    cart: [],
    isLoader: false,
    isError: false,
  },
  reducers: {
    filterProductData: (state, action) => {
      return {
        ...state, products: action.payload, isLoader: false
      }
    },
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    // removeFromCart: (state, action) => {
    //   const removeItem = state.cart.filter(
    //     (item) => item.id !== action.payload.id
    //   );
    //   state.cart = removeItem;
    // },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item && item.quantity === 1) {
        const removeItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeItem;
      } else if (item) {
        item.quantity--;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoader = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoader = false;
        state.products = action.payload;
        state.category = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

export const { filterProductData, addToCart, removeFromCart, decrementQuantity, incrementQuantity } = productSlice.actions
export default productSlice.reducer;