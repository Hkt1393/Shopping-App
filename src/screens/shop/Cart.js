import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {moderateScale, scale, verticalScale} from '../../utils/scaling';
import Colors from '../../Theme/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {removeFromCart, clearOrders} from '../../features/CartSlice';
import {addOrder} from '../../features/OrderSlice';
import {createSelector} from '@reduxjs/toolkit';

export default function Cart() {
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector(state => state.Cart.totalAmount);
  const cartItems = useSelector(
    createSelector(
      state => state.Cart.items,
      items => {
        const transformedItems = [];
        for (const key in items) {
          transformedItems.push({
            id: key,
            title: items[key].title,
            image: items[key].imageUrl,
            price: items[key].price,
            quantity: items[key].quantity,
            sum: items[key].sum,
          });
        }
        return transformedItems.sort((a, b) => a - b);
      },
    ),
  );
  return (
    <View style={styles.screen}>
      <View style={styles.amountCard}>
        <Text style={styles.txtmain}>
          Total :{' '}
          <Text style={styles.totalAmount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            const orderPayload = {
              items: cartItems,
              totalAmount: cartTotalAmount,
            };
            dispatch(addOrder(orderPayload));
            dispatch(clearOrders());
          }}>
          <Text style={styles.orderButton}>Order Now</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.cartItemText}>CART ITEMS : </Text>
        <FlatList
          data={cartItems}
          renderItem={({item}) => (
            <View style={styles.renderComponent}>
              <View style={styles.itemContainer}>
                <Text style={styles.renderText}>{item.quantity}</Text>
                <Text style={styles.renderText}>{item.title}</Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.renderText}>${item.sum.toFixed(2)}</Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromCart(item))}>
                  <MaterialIcons name="delete" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: scale(20),
  },
  amountCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    height: verticalScale(40),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    paddingHorizontal: scale(10),
    marginVertical: verticalScale(15),
    borderRadius: moderateScale(8),
  },
  orderButton: {
    color: Colors.accent,
    fontWeight: '800',
    fontSize: moderateScale(15),
  },
  txtmain: {
    fontWeight: '800',
    fontSize: moderateScale(15),
  },
  totalAmount: {
    color: Colors.primary,
  },
  cartItemText: {
    color: 'black',
    fontWeight: '600',
    marginVertical: verticalScale(5),
  },
  renderComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    height: verticalScale(35),
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
  },
  renderText: {
    marginHorizontal: scale(12),
    color: 'black',
    fontWeight: '800',
  },
});
