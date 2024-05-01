import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from '../features/ProductSlice';
import CartReducer from '../features/CartSlice';
import OrderReducer from '../features/OrderSlice';

export const store = configureStore({
  reducer: {
    Products: ProductReducer,
    Cart: CartReducer,
    Order: OrderReducer,
  },
});
