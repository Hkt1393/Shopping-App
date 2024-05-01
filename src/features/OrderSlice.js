import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    addOrder: (state, action) => {
      const {items, totalAmount} = action.payload;

      const newOrder = {
        id: new Date().toString(),
        items: items,
        totalAmount: totalAmount,
        date: new Date().toISOString(),
      };

      state.orders.push(newOrder);
    },
  },
});

export const {addOrder} = orderSlice.actions;

export default orderSlice.reducer;
