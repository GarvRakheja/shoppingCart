// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './src/redux/ProductSlice';

export const store = configureStore({
    reducer: {
        products: productReducer, // Use 'product' instead of 'products'
    }
});
