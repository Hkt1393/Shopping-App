import {createSlice} from '@reduxjs/toolkit';
import PRODUCTS from '../Data/Data';

const initialState = {
  avilableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.userId === 'u1'),
};

export const ProductSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {},
});

export default ProductSlice.reducer;
