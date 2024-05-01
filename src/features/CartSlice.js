import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: {},
  totalAmount: 0,
};

export const CartSlice = createSlice({
  name: 'CartSlice',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const {id, title, imageUrl, price} = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
        state.items[id].sum += price;
      } else {
        state.items[id] = {id, title, imageUrl, price, quantity: 1, sum: price};
      }
      state.totalAmount += price;
    },
    removeFromCart: (state, action) => {
      const {id, quantity, price} = action.payload;
      const selectedItems = state.items[id];
      if (selectedItems) {
        const updatedITems = {...state.items};
        if (selectedItems.quantity > 1) {
          updatedITems[id] = {
            ...selectedItems,
            quantity: selectedItems.quantity - 1,
            sum: selectedItems.sum - price,
          };
        } else {
          delete updatedITems[id];
        }
        return {
          ...state,
          items: updatedITems,
          totalAmount: state.totalAmount - price,
        };
      }
      return state;
    },
    clearOrders: (state, action) => {
      return initialState;
    },
  },
});

export const {addToCart, removeFromCart, clearOrders} = CartSlice.actions;

export default CartSlice.reducer;
